          AI Data Classification Project

## About the Project

This project was completed as part of my AI Internship at DecodeLabs.

The main objective of this project is to build a machine learning classification model that predicts the "Order Status" of an order using customer and order-related information.

Throughout this project, I learned how to pre-process data, train machine learning models, evaluate their performance, and compare different classification algorithms.


## Dataset

The dataset contains 1200 order records with information such as:

- Product
- Quantity
- Unit Price
- Payment Method
- Coupon Code
- Referral Source
- Items in Cart
- Total Price
- Order Status

The target variable for this project is "OrderStatus".


## What I Did

During this project, I completed the following tasks:

- Loaded the dataset using Pandas
- Explored the dataset to understand its structure
- Handled missing values
- Removed unnecessary columns
- Converted categorical data into numerical values
- Split the dataset into training and testing sets
- Trained multiple machine learning models
- Compared the performance of different models
- Evaluated the results using accuracy


## Machine Learning Models Used

I tested the following classification algorithms:

- Decision Tree
- Random Forest
- K-Nearest Neighbors (KNN)
- Logistic Regression

Among these models, the "Decision Tree" achieved the highest accuracy on the provided dataset.



## Technologies Used

- Python
- Pandas
- NumPy
- Scikit-learn
- Matplotlib
- Seaborn
- OpenPyXL


## How to Run the Project

1. Install the required libraries:

pip install -r requirements.txt


2. Run the project:

python main.py



## Results

After training and testing different machine learning models, the following accuracies were obtained:

| Model | Accuracy |
|-------|----------|
| Decision Tree | 20.83% |
| Random Forest | 20.42% |
| Logistic Regression | 17.92% |
| K-Nearest Neighbors | 17.08% |

The dataset appears to have limited predictive relationships between the input features and the target variable, which resulted in relatively low accuracy across all tested models.


## What I Learned

Working on this project helped me understand the complete machine learning workflow, including:

- Data preprocessing
- Feature selection
- Training classification models
- Model evaluation
- Comparing different algorithms
- Working with real-world datasets



## Author

EZAT HIRA

AI Intern – DecodeLabs