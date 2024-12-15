import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
import pickle
import lime
from lime.lime_text import LimeTextExplainer
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk

# Download VADER lexicon for sentiment analysis
nltk.download('vader_lexicon')

# Function to load and prepare data
def load_data():
    # You'll need to replace this with your actual data source
    df = pd.read_csv('reviews.csv')
    return df

# Function to add sentiment features
def add_sentiment_features(texts):
    sia = SentimentIntensityAnalyzer()
    sentiments = []
    
    for text in texts:
        scores = sia.polarity_scores(text)
        sentiments.append([
            scores['neg'],
            scores['neu'],
            scores['pos'],
            scores['compound']
        ])
    
    return np.array(sentiments)

# Function to train the model
def train_model(X_train, y_train):
    # Convert text to TF-IDF features
    vectorizer = TfidfVectorizer(max_features=5000, stop_words='english')
    X_train_vec = vectorizer.fit_transform(X_train)
    
    # Add sentiment features
    sentiment_features = add_sentiment_features(X_train)
    
    # Combine TF-IDF and sentiment features
    X_train_combined = np.hstack((
        X_train_vec.toarray(),
        sentiment_features
    ))
    
    # Train Random Forest classifier
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train_combined, y_train)
    
    return clf, vectorizer

# Function to explain predictions
def explain_prediction(text, clf, vectorizer):
    explainer = LimeTextExplainer(class_names=['Real', 'Fake'])
    
    def predict_proba(texts):
        # Include sentiment features in prediction
        text_vec = vectorizer.transform(texts)
        sentiment_vec = add_sentiment_features(texts)
        combined_features = np.hstack((
            text_vec.toarray(),
            sentiment_vec
        ))
        return clf.predict_proba(combined_features)
    
    exp = explainer.explain_instance(text, predict_proba)
    return exp.as_list()

def main():
    # Load data
    try:
        df = load_data()
    except FileNotFoundError:
        print("Please ensure your dataset file exists and update the path in load_data()")
        return

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        df['review'], 
        df['class'], 
        test_size=0.2, 
        random_state=42
    )

    # Train model
    clf, vectorizer = train_model(X_train, y_train)

    # Save model and vectorizer
    with open('review_classifier.pkl', 'wb') as f:
        pickle.dump((clf, vectorizer), f)

if __name__ == "__main__":
    main()

def retrain():
    main()