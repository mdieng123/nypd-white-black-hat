# prepare_data.py
# Cleans the ProPublica NYPD complaints data and makes the small file both charts load.
#
# Input:  data/raw/allegations_202007271729.csv  (from ProPublica, see README)
# Output: data/allegations_summary.csv
#
# Run from the main project folder:  python scripts/prepare_data.py

import pandas as pd

df = pd.read_csv("data/raw/allegations_202007271729.csv")
print("Allegations:", len(df))
print("Complaints:", df["complaint_id"].nunique())
print("Officers:", df["unique_mos_id"].nunique())


# ---- Outcome ----
# board_disposition has many kinds of "Substantiated (...)" (Charges, Command Discipline, etc.)
# We put all of those into one group, so there are 3 outcomes.
def get_outcome(disposition):
    if disposition.startswith("Substantiated"):
        return "Substantiated"
    return disposition  # "Exonerated" or "Unsubstantiated"


# ---- Rank ----
# Rank at the time of the incident. The top ranks have very few allegations,
# so we group Captain and everything above it together.
def get_rank(rank):
    if rank in ["Police Officer", "Sergeant", "Detective", "Lieutenant"]:
        return rank
    return "Captain and above"


df["outcome"] = df["board_disposition"].apply(get_outcome)
df["rank"] = df["rank_incident"].apply(get_rank)
df = df.rename(columns={"fado_type": "allegation_type"})

# Count allegations for every combination of type, rank and outcome
summary = df.groupby(["allegation_type", "rank", "outcome"]).size().reset_index(name="count")
summary.to_csv("data/allegations_summary.csv", index=False)

# ---- Check the results ----
print("Rows in summary file:", len(summary))
print("Total in summary file:", summary["count"].sum())
print(df["outcome"].value_counts())
print(df["rank"].value_counts())
print(pd.crosstab(df["allegation_type"], df["outcome"], normalize="index").round(3))
print(pd.crosstab(df["rank"], df["outcome"], normalize="index").round(3))
