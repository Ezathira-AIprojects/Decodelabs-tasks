# =====================================================
# DecodeLabs AI Internship
# Project 2 - Data Classification Using AI
# Author: Ezat Hira
# =====================================================

import pandas as pd

# ------------------------------------
# Load Dataset
# ------------------------------------
df = pd.read_excel("data/Dataset for Data Analytics.xlsx")

print("Original Shape")
print(df.shape)

# ------------------------------------
# Missing Values
# ------------------------------------
print("\nMissing Values Before Cleaning")
print(df.isnull().sum())

# ------------------------------------
# Fill Missing Coupon Codes
# ------------------------------------
df["CouponCode"] = df["CouponCode"].fillna("NoCoupon")

# ------------------------------------
# Check Again
# ------------------------------------
print("\nMissing Values After Cleaning")
print(df.isnull().sum())

# ------------------------------------
# Remove Duplicate Rows
# ------------------------------------
duplicates = df.duplicated().sum()

print("\nDuplicate Rows:", duplicates)

df = df.drop_duplicates()

print("\nShape After Removing Duplicates")
print(df.shape)

# ------------------------------------
# Display First 5 Rows
# ------------------------------------
print("\nDataset Preview")
print(df.head())

# ------------------------------------
# Import LabelEncoder
# ------------------------------------
from sklearn.preprocessing import LabelEncoder

# ------------------------------------
# Remove Unnecessary Columns
# ------------------------------------
df.drop(columns=["OrderID", "CustomerID", "TrackingNumber","ShippingAddress"], inplace=True)

print("\nColumns after removing unnecessary columns:")
print(df.columns)

# ------------------------------------
# Convert Date Column
# ------------------------------------
df["Date"] = pd.to_datetime(df["Date"])

df["Year"] = df["Date"].dt.year
df["Month"] = df["Date"].dt.month
df["Day"] = df["Date"].dt.day

# Remove original Date column
df.drop(columns=["Date"], inplace=True)

# ------------------------------------
# Encode Categorical Columns
# ------------------------------------
encoder = LabelEncoder()

categorical_columns = [
    "Product",
    "PaymentMethod",
    "CouponCode",
    "ReferralSource",
    "OrderStatus"
]

for column in categorical_columns:
    df[column] = encoder.fit_transform(df[column])

print("\nDataset After Preprocessing")
print(df.head())

# ------------------------------------
# Separate Features (X) and Target (y)
# ------------------------------------

X = df.drop("OrderStatus", axis=1)

y = df["OrderStatus"]

print("\nFeatures (X)")
print(X.head())

print("\nTarget (y)")
print(y.head())

# ------------------------------------
# Split Dataset into Training and Testing
# ------------------------------------

from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42
)

print("\nTraining Data Shape")
print(X_train.shape)

print("\nTesting Data Shape")
print(X_test.shape)

# ------------------------------------
# Train Decision Tree Model
# Train Random Forest Model
# Train K Neighbors Model
# Train Logistic Regression Model
# ------------------------------------

from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression

from sklearn.metrics import accuracy_score

models = {
    "Decision Tree": DecisionTreeClassifier(random_state=42),
    "Random Forest": RandomForestClassifier(random_state=42),
    "KNN": KNeighborsClassifier(),
    "Logistic Regression": LogisticRegression(max_iter=1000)
}

print("\n========== Model Comparison ==========\n")

for name, model in models.items():

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)

    print(f"{name}: {accuracy*100:.2f}%")

# ------------------------------------
# Make Predictions
# ------------------------------------

predictions = model.predict(X_test)

print("\nFirst 10 Predictions")
print(predictions[:10])

print("\nFirst 10 Actual Values")
print(y_test.iloc[:10].values)

# ------------------------------------
# Calculate Accuracy
# ------------------------------------

from sklearn.metrics import accuracy_score

accuracy = accuracy_score(y_test, predictions)

print("\nModel Accuracy")
print(f"{accuracy * 100:.2f}%")


print("\nOrder Status Distribution")
print(df["OrderStatus"].value_counts())