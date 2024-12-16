import axios from "axios";

let feedbackHTML = () => {
  const feedbackModal = document.createElement("div");
  feedbackModal.id = "feedbackPopup";
  feedbackModal.style.display = "none";
  feedbackModal.style.position = "fixed";
  feedbackModal.style.zIndex = "1";
  feedbackModal.style.left = "0";
  feedbackModal.style.top = "0";
  feedbackModal.style.width = "100%";
  feedbackModal.style.height = "100%";
  feedbackModal.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  feedbackModal.style.paddingTop = "60px";
  feedbackModal.onclick = (event) => {
    if (event.target === feedbackModal) {
      feedbackModal.style.display = "none";
    }
  };

  // Create feedback modal content
  const feedbackModalContent = document.createElement("div");
  feedbackModalContent.style.backgroundColor = "white";
  feedbackModalContent.style.margin = "5% auto";
  feedbackModalContent.style.padding = "20px";
  feedbackModalContent.style.width = "80%";
  feedbackModalContent.style.maxWidth = "600px";
  feedbackModalContent.style.borderRadius = "10px";
  feedbackModalContent.style.position = "relative";

  // Create close button
  const closeBtn = document.createElement("span");
  closeBtn.style.color = "#aaa";
  closeBtn.style.float = "right";
  closeBtn.style.fontSize = "28px";
  closeBtn.style.fontWeight = "bold";
  closeBtn.style.cursor = "pointer";
  closeBtn.textContent = "×";
  closeBtn.onclick = () => (feedbackModal.style.display = "none");

  // Append close button to modal content
  feedbackModalContent.appendChild(closeBtn);

  // Create title
  const title = document.createElement("h3");
  title.style.fontSize = "24px";
  title.style.color = "#333";
  title.style.marginBottom = "20px";
  title.textContent = "Provide Your Feedback";
  title.style.color = "black";

  // Append title to modal content
  feedbackModalContent.appendChild(title);

  // Create textarea for feedback input
  const feedbackTextarea = document.createElement("textarea");
  feedbackTextarea.id = "feedbackTextarea";
  feedbackTextarea.rows = "6";
  feedbackTextarea.cols = "50";
  feedbackTextarea.placeholder = "Please provide your feedback...";
  feedbackTextarea.style.width = "100%";
  feedbackTextarea.style.padding = "15px";
  feedbackTextarea.style.border = "2px solid #ddd";
  feedbackTextarea.style.borderRadius = "8px";
  feedbackTextarea.style.fontSize = "16px";
  feedbackTextarea.style.lineHeight = "1.5";
  feedbackTextarea.style.resize = "vertical";
  feedbackTextarea.style.transition = "border-color 0.3s, box-shadow 0.3s";
  feedbackTextarea.style.backgroundColor = "#f7f7f7";
  feedbackTextarea.style.boxSizing = "border-box";
  feedbackTextarea.style.marginTop = "10px";
  feedbackTextarea.style.color = "black";

  // Append textarea to modal content
  feedbackModalContent.appendChild(feedbackTextarea);

  // Create submit button container
  const submitContainer = document.createElement("div");
  submitContainer.style.display = "flex";
  submitContainer.style.justifyContent = "flex-end";
  submitContainer.style.marginTop = "20px";

  // Create submit button
  const submitBtn = document.createElement("button");
  submitBtn.type = "button";
  submitBtn.textContent = "Submit Feedback";
  submitBtn.style.backgroundColor = "#4CAF50";
  submitBtn.style.color = "white";
  submitBtn.style.padding = "12px 24px";
  submitBtn.style.border = "none";
  submitBtn.style.borderRadius = "5px";
  submitBtn.style.cursor = "pointer";
  submitBtn.style.fontSize = "16px";
  submitBtn.onclick = submitFeedback;

  // Append submit button to submit container
  submitContainer.appendChild(submitBtn);

  // Append submit container to modal content
  feedbackModalContent.appendChild(submitContainer);

  // Append modal content to modal
  feedbackModal.appendChild(feedbackModalContent);

  // Append modal to body
  document.body.appendChild(feedbackModal);

  // Function to handle the submission of feedback
  function submitFeedback() {
    const feedback = feedbackTextarea.value.trim();

    if (!feedback) {
      alert("Please provide your feedback before submitting.");
      return;
    }

    console.log("Feedback submitted:", feedback);
    const feedbackk = {
      googleId: 123,
      message: `${feedback}`,
    };

    async function submitFeedback(feedbackData) {
      try {
        const response = await axios.post(
          "http://localhost:5000/feedback",
          feedbackData
        );
        console.log("Feedback submitted:", response.data);
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    }

    submitFeedback(feedbackk);

    // Close the modal after submission
    feedbackModal.style.display = "none";

    // Clear the textarea after submission
    feedbackTextarea.value = "";
  }
  return feedbackModal;
};

export default feedbackHTML;
