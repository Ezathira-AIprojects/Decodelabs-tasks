import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset
df = pd.read_csv("data/e-commerce.csv")

# Fill missing values
df["CouponCode"] = df["CouponCode"].fillna("NoCoupon")

# Create combined features
df["Features"] = (
    df["Product"].astype(str) + " " +
    df["PaymentMethod"].astype(str) + " " +
    df["ReferralSource"].astype(str) + " " +
    df["OrderStatus"].astype(str) + " " +
    df["CouponCode"].astype(str)
)

# Remove duplicate products
products = df[["Product", "Features"]].drop_duplicates(subset="Product").reset_index(drop=True)

# Vectorize
cv = CountVectorizer()
vectors = cv.fit_transform(products["Features"])

# Similarity matrix
similarity = cosine_similarity(vectors)

def recommend(product_name):
    if product_name not in products["Product"].values:
        return []

    idx = products[products["Product"] == product_name].index[0]

    distances = list(enumerate(similarity[idx]))
    distances = sorted(distances, key=lambda x: x[1], reverse=True)

    recommendations = []

    for i in distances[1:6]:
        recommendations.append(products.iloc[i[0]]["Product"])

    return recommendations


# print(recommend("Laptop"))
