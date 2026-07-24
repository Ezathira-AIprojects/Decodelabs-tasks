import pandas as pd

# Load Dataset
df = pd.read_csv("data/e-commerce.csv")

# Basic Information
print("Dataset Shape:", df.shape)

print("\nColumn Names:")
print(df.columns)

print("\nMissing Values:")
print(df.isnull().sum())

print("\nData Types:")
print(df.dtypes)

print("\nUnique Products:")
print(df["Product"].unique())