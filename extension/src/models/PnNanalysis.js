import axios from "axios";

let sentiment = async (review) => {
  const API_URL =
    "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english"; // Sentiment analysis model
  const API_KEY = "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"; // Replace with your Hugging Face API key

  // Function to make API request
  async function getSentiment(text) {
    const headers = {
      Authorization: `Bearer ${API_KEY}`,
    };

    const data = {
      inputs: text,
    };

    try {
      const response = await axios.post(API_URL, data, { headers });

      // Log the entire response to see its structure
      console.log("Response Data:", response.data);

      // The response contains an array of possible labels and scores
      const sentimentData = response.data[0]; // Get the first result from the array

      // Find the label with the highest score
      const bestSentiment = sentimentData.reduce((max, current) => {
        return current.score > max.score ? current : max;
      });

      // Output the result
      console.log(
        `Sentiment: ${bestSentiment.label}, Confidence: ${bestSentiment.score}`
      );
      return bestSentiment.label;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return getSentiment(review);
};

export default sentiment;
