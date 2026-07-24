import streamlit as st
import pandas as pd
from recommendation import recommend

# Load Dataset
df = pd.read_csv("data/e-commerce.csv")

st.set_page_config(
    page_title="AI Product Recommendation System",
    page_icon="🛒",
    layout="wide"
)

# ================= Sidebar =================
st.sidebar.title("🤖 AI Recommendation")
st.sidebar.write("### Developer")
st.sidebar.success("Ezat Hira")

st.sidebar.write("---")
st.sidebar.metric("📦 Products", df["Product"].nunique())
st.sidebar.metric("🛍 Orders", len(df))
st.sidebar.metric("💰 Avg Price", f"${df['TotalPrice'].mean():.2f}")

# ================= Main Title =================
st.title("🛒 AI Product Recommendation System")
st.write("Get smart product recommendations using Machine Learning.")

st.divider()

# ================= Dashboard =================
col1, col2, col3 = st.columns(3)

with col1:
    st.metric("📦 Products", df["Product"].nunique())

with col2:
    st.metric("🛍 Orders", len(df))

with col3:
    st.metric("💰 Average Price", f"${df['TotalPrice'].mean():.2f}")

st.divider()

# ================= Product Selection =================
product = st.selectbox(
    "Select Product",
    sorted(df["Product"].unique())
)

# ================= Product Details =================
product_data = df[df["Product"] == product]

st.subheader("📋 Product Details")

col1, col2, col3 = st.columns(3)

with col1:
    st.info(f"**Product**\n\n{product}")

with col2:
    st.info(f"**Average Price**\n\n${product_data['TotalPrice'].mean():.2f}")

with col3:
    st.info(f"**Orders**\n\n{len(product_data)}")

# ================= Recommendation =================
if st.button("🚀 Get Recommendations"):

    st.subheader("⭐ Recommended Products")

    recommendations = recommend(product)

    for item in recommendations:

        item_data = df[df["Product"] == item]

        price = item_data["TotalPrice"].mean()

        st.success(f"🛍 {item}   |   Average Price: ${price:.2f}")

st.divider()

# ================= Charts =================
st.subheader("📊 Dataset Analytics")

chart1, chart2 = st.columns(2)

with chart1:
    st.write("### Top Selling Products")
    st.bar_chart(df["Product"].value_counts())

with chart2:
    st.write("### Payment Methods")
    st.bar_chart(df["PaymentMethod"].value_counts())

st.divider()

st.subheader("📈 Order Status")

st.bar_chart(df["OrderStatus"].value_counts())

st.divider()

# ================= Footer =================
st.markdown("---")
st.markdown(
    """
### 🤖 About this Project

This AI Product Recommendation System uses:

- ✅ Python
- ✅ Pandas
- ✅ Scikit-Learn
- ✅ CountVectorizer
- ✅ Cosine Similarity
- ✅ Streamlit

Developed as part of the Decode Labs AI Internship Project.
"""
)