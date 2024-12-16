import pickle
import numpy as np
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk

class ReviewClassifier:
    def __init__(self, review, model_path='review_classifier.pkl'):
        self.review = review
        try:
            with open(model_path, 'rb') as f:
                self.clf, self.vectorizer = pickle.load(f)
            nltk.download('vader_lexicon', quiet=True)
            self.sia = SentimentIntensityAnalyzer()
        except FileNotFoundError:
            raise Exception("Model file not found. Please ensure the model has been trained.")

    def getSendimentFeatures(self):
        scores = self.sia.polarity_scores(self.review)
        return np.array([[
            scores['neg'],
            scores['neu'],
            scores['pos'],
            scores['compound']
        ]])

    def predict(self):
        text_vector = self.vectorizer.transform([self.review])
        sentiment_features = self.getSendimentFeatures()
        combined_features = np.hstack((
            text_vector.toarray(),
            sentiment_features
        ))
        prediction = self.clf.predict(combined_features)[0]
        probabilities = self.clf.predict_proba(combined_features)[0]

        return {
            'class': 'Fake' if prediction == 1 else 'Real',
            'probability': float(max(probabilities)),
            'fake_probability': float(probabilities[1]),
            'real_probability': float(probabilities[0]),
        }

    def getPredictionReasoning(self, sentiment_scores, feature_weights, vectorizer):
        reasoning = []
        compound_score = sentiment_scores['compound']
        if abs(compound_score) > 0.1:
            sentiment_type = "positive" if compound_score > 0 else "negative"
            reasoning.append(f"The review has a {sentiment_type} sentiment (score: {compound_score:.2f})")

        feature_names = vectorizer.get_feature_names_out()
        important_words = sorted(zip(feature_names, feature_weights), 
                               key=lambda x: abs(x[1]), 
                               reverse=True)[:5]
        
        word_indicators = [f"'{word}'" for word, weight in important_words 
                         if word in self.review.lower()]
        if word_indicators:
            reasoning.append(f"Key words found: {', '.join(word_indicators)}")
        
        vague_phrases = ['great', 'highly', 'best', ]
        if any(phrase in self.review.lower() for phrase in vague_phrases):
            reasoning.append('Contains vague language.')

        if len(self.review.split()) < 5:
            reasoning.append('Review is too brief.')

        promotional_phrases = [
    # Excitement
    "amazing", "incredible", "sensational", "unbelievable", "exclusive",

    # Urgency or Scarcity
    "limited-time", "hurry", "now", "only", "last chance", "act fast",

    # Value and Savings
    "free", "bonus", "save", "discount", "affordable", "best deal",

    # Trust and Credibility
    "guaranteed", "proven", "trusted", "official", "risk-free", "certified",

    # Benefits
    "effortless", "easy", "powerful", "transformative", "convenient", "life-changing",

    # Personal
    "you", "yours", "tailored", "custom", "for you",

    # Call to Action
    "discover", "try", "shop", "download", "subscribe", "join now",

    # Emotional or Aspirational
    "dream", "luxury", "passion", "happiness", "confidence"
]

        if any(phrase in self.review.lower() for phrase in promotional_phrases):
            reasoning.append('Contains promotional language.')

        return reasoning

def predict(review: str):
    classifier = ReviewClassifier(review)
    prediction = classifier.predict()
    sentiment_scores = classifier.sia.polarity_scores(review)
    feature_weights = classifier.clf.feature_importances_
    reasoning = classifier.getPredictionReasoning(sentiment_scores, feature_weights, classifier.vectorizer)

    return {
        'class': prediction['class'],
        'probability': prediction['real_probability'],
        'reasoning' : reasoning
    }

