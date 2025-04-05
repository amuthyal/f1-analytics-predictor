import pandas as pd
import lightgbm as lgb
import joblib

# Load the cleaned dataset
df = pd.read_csv("../../ml/data/f1_cleaned_2000_2024.csv")

# Clean and convert q1 time to seconds
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

# Drop rows with missing critical data
df = df.dropna(subset=["grid", "positionOrder", "constructorId", "q1_seconds"])

# Define feature set and target
features = ["grid", "constructorId", "q1_seconds"]
X = df[features]
y = df["positionOrder"]

# Group by race for ranking
group = df.groupby("raceId").size().tolist()

# Train LightGBM Ranker
model = lgb.LGBMRanker()
model.fit(X, y, group=group)

# Save the model
joblib.dump(model, "../../server/ml_models/top3_rank_predictor.pkl")

print("✅ Model trained and saved as '../../server/ml_models/top3_rank_predictor.pkl'")
