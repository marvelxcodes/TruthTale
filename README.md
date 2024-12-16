# Google Reviews Analyzer Chrome Extension

A Chrome extension that helps analyze Google Reviews to determine their authenticity using machine learning and sentiment analysis.

## Features

- Real-time review analysis
- Fake review detection
- Sentiment analysis
- Detailed reasoning for predictions
- Report suspicious reviews
- Continuous model improvement through user feedback

## Tech Stack

- **Frontend**: Chrome Extension (JavaScript)
- **Backend**: Flask (Python)
- **Machine Learning**: 
  - NLTK for sentiment analysis
  - Custom classifier for fake review detection
- **Styling**: TailwindCSS
- **Build Tool**: Webpack

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Install Node.js dependencies:
```bash
npm install
```

4. Build the extension:
```bash
npm run build
```

5. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` directory in your project folder

## Development

### Backend Setup
1. Start the Flask server:
```bash
python app.py
```

### Extension Development
1. Make changes to files in the `src` directory
2. Rebuild the extension:
```bash
npm run build
```
3. Reload the extension in Chrome

## Project Structure

```
├── extension/
│   └── src/
│       ├── externalHTML/
│       │   ├── error.js
│       │   └── feedback.js
│       └── reviews/
│           ├── background.js
│           ├── content.js
│           └── popup.js
├── ml/
│   ├── model.py
│   └── train_model.py
├── app.py
└── requirements.txt
```

## How It Works

1. The extension monitors Google Review pages
2. When a review is detected, it's sent to the Flask backend
3. The backend processes the review using:
   - NLTK sentiment analysis
   - Custom trained classifier
4. Results are displayed in the extension popup
5. Users can report suspicious reviews
6. The model is periodically retrained with user feedback

## Acknowledgments

- NLTK for sentiment analysis
- TailwindCSS for styling
- Webpack for building
