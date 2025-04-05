
import pandas as pd
import lightgbm as lgb
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error
from scipy.stats import kendalltau
import numpy as np

# Load dataset
df = pd.read_csv("../../ml/data/f1_cleaned_2000_2024.csv")

# Convert q1 time to seconds
def convert_q1_time(q):
    try:
        if pd.isna(q) or q == "\\N":
            return None
        if ":" in q:
            return sum(float(t) * 60**i for i, t in enumerate(reversed(q.split(":"))))
        return float(q)
    except:
        return None

df["q1_seconds"] = df["q1"].apply(convert_q1_time)

# Drop missing values
df = df.dropna(subset=["grid", "positionOrder", "constructorId", "q1_seconds"])

# Features and target
features = ["grid", "constructorId", "q1_seconds"]
X = df[features]
y = df["positionOrder"]

# Add raceId to split by group (so all drivers from one race go to same split)
df["raceId"] = df["raceId"].astype(int)
race_ids = df["raceId"].unique()
train_race_ids, test_race_ids = train_test_split(race_ids, test_size=0.2, random_state=42)

train_df = df[df["raceId"].isin(train_race_ids)]
test_df = df[df["raceId"].isin(test_race_ids)]

# Prepare training data
X_train = train_df[features]
y_train = train_df["positionOrder"]
group_train = train_df.groupby("raceId").size().tolist()

# Train model
model = lgb.LGBMRanker()
model.fit(X_train, y_train, group=group_train)

# Save model
joblib.dump(model, "../../server/ml_models/top3_rank_predictor.pkl")

# Evaluate on test data
X_test = test_df[features]
y_test = test_df["positionOrder"]
y_pred = model.predict(X_test)

# Evaluation metrics
mae = mean_absolute_error(y_test, y_pred)
rmse = mean_squared_error(y_test, y_pred) ** 0.5
corr, _ = kendalltau(y_test, y_pred)

print(f"✅ Model saved as top3_rank_predictor.pkl")
print(f"📊 MAE: {mae:.2f}")
print(f"📉 RMSE: {rmse:.2f}")
print(f"🔗 Kendall's Tau correlation: {corr:.2f}")

# Optional: top-3 accuracy
def top3_accuracy(df_true, df_pred, group_col='raceId'):
    correct = 0
    total = 0

    for race_id in df_true[group_col].unique():
        actual = df_true[df_true[group_col] == race_id]
        pred = df_pred[df_pred[group_col] == race_id]

        top3_actual = actual.sort_values("positionOrder").head(3)["driverId"].tolist()
        top3_pred = pred.sort_values("predicted").head(3)["driverId"].tolist()

        matches = set(top3_actual) & set(top3_pred)
        correct += len(matches)
        total += 3

    return correct / total if total else 0

# Add prediction to test_df and compute top-3 accuracy
test_df = test_df.copy()
test_df["predicted"] = y_pred
top3_acc = top3_accuracy(test_df, test_df)
print(f"🥉 Top-3 accuracy: {top3_acc * 100:.2f}%")
