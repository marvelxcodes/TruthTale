import axios from "axios";

let errorHTML = () => {
  // Create modal background
  const modal = document.createElement("div");
  modal.id = "reportPopup";
  modal.classList.add("modal");
  modal.style.display = "none";
  modal.style.position = "fixed";
  modal.style.zIndex = "1";
  modal.style.left = "0";
  modal.style.top = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  modal.style.paddingTop = "60px";
  modal.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Create modal content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalContent.style.backgroundColor = "white";
  modalContent.style.margin = "5% auto";
  modalContent.style.padding = "20px";
  modalContent.style.border = "1px solid #888";
  modalContent.style.width = "80%";
  modalContent.style.maxWidth = "600px";
  modalContent.style.borderRadius = "10px";
  modalContent.style.position = "relative";
  modalContent.style.zIndex = "10001";

  // Create close button
  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.style.color = "#aaa";
  closeBtn.style.float = "right";
  closeBtn.style.fontSize = "28px";
  closeBtn.style.fontWeight = "bold";
  closeBtn.style.cursor = "pointer";
  closeBtn.textContent = "×";
  closeBtn.onclick = () => (modal.style.display = "none");

  // Append close button to modal content
  modalContent.appendChild(closeBtn);

  // Create title
  const title = document.createElement("h3");
  title.style.fontSize = "24px";
  title.style.color = "#333";
  title.style.marginBottom = "20px";
  title.textContent = "Report Issue";

  // Append title to modal content
  modalContent.appendChild(title);

  // Create description paragraph
  const description = document.createElement("p");
  description.style.fontSize = "16px";
  description.style.color = "#555";
  description.textContent = "Select the type of issue you're reporting:";

  // Append description to modal content
  modalContent.appendChild(description);

  // Create form
  const form = document.createElement("form");
  form.id = "reportForm";

  // Create report options
  const reportOptions = document.createElement("div");
  reportOptions.classList.add("report-options");
  reportOptions.style.display = "flex";
  reportOptions.style.flexDirection = "column";
  reportOptions.style.marginBottom = "20px";

  // Helper function to create radio button options
  function createReportOption(value, labelText) {
    const label = document.createElement("label");
    label.style.display = "block";
    label.style.fontSize = "16px";
    label.style.margin = "10px 0";
    label.style.color = "#555";
    label.style.cursor = "pointer";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "reportType";
    input.value = value;
    input.style.marginRight = "10px";
    input.style.accentColor = "#4caf50";
    input.onclick = () => toggleOtherInput(value === "Other");

    label.appendChild(input);
    label.appendChild(document.createTextNode(labelText));
    return label;
  }

  // Create and append report options
  reportOptions.appendChild(createReportOption("Spam", "Spam"));
  reportOptions.appendChild(
    createReportOption("Abusive Content", "Abusive Content")
  );
  reportOptions.appendChild(
    createReportOption("Technical Issue", "Technical Issue")
  );
  reportOptions.appendChild(createReportOption("Other", "Other"));

  // Append report options to form
  form.appendChild(reportOptions);

  // Create textarea for "Other" input
  const otherTextarea = document.createElement("textarea");
  otherTextarea.id = "otherTextarea";
  otherTextarea.rows = "4";
  otherTextarea.cols = "50";
  otherTextarea.placeholder = "Please provide more details...";
  otherTextarea.style.width = "100%";
  otherTextarea.style.padding = "15px";
  otherTextarea.style.border = "2px solid #ddd";
  otherTextarea.style.borderRadius = "8px";
  otherTextarea.style.fontSize = "16px";
  otherTextarea.style.fontFamily =
    "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  otherTextarea.style.lineHeight = "1.5";
  otherTextarea.style.resize = "vertical";
  otherTextarea.style.transition = "border-color 0.3s, box-shadow 0.3s";
  otherTextarea.style.backgroundColor = "#f7f7f7";
  otherTextarea.style.boxSizing = "border-box";
  otherTextarea.style.marginTop = "10px";
  otherTextarea.style.display = "none";

  // Append textarea to form
  form.appendChild(otherTextarea);

  // Create submit button container
  const submitContainer = document.createElement("div");
  submitContainer.classList.add("submit-container");
  submitContainer.style.display = "flex";
  submitContainer.style.justifyContent = "flex-end";
  submitContainer.style.marginTop = "20px";

  // Create submit button
  const submitBtn = document.createElement("button");
  submitBtn.type = "button";
  submitBtn.id = "submitReportButton";
  submitBtn.style.backgroundColor = "#f44336";
  submitBtn.style.color = "white";
  submitBtn.style.padding = "12px 24px";
  submitBtn.style.border = "none";
  submitBtn.style.borderRadius = "5px";
  submitBtn.style.cursor = "pointer";
  submitBtn.style.fontSize = "16px";
  submitBtn.textContent = "Submit Report";
  submitBtn.onclick = submitReport;

  // Append submit button to submit container
  submitContainer.appendChild(submitBtn);

  // Append submit container to form
  form.appendChild(submitContainer);

  // Append form to modal content
  modalContent.appendChild(form);

  // Append modal content to modal
  modal.appendChild(modalContent);

  // Append modal to body
  document.body.appendChild(modal);

  // Function to handle the submission of a report
  function submitReport() {
    const reportType = document.querySelector(
      'input[name="reportType"]:checked'
    );
    const otherDetails = otherTextarea.value;

    if (!reportType) {
      alert("Please select a report type.");
      return;
    }

    let reportMessage = `Report Type: ${reportType.value}`;
    if (reportType.value === "Other" && otherDetails.trim() !== "") {
      reportMessage += `\nDetails: ${otherDetails}`;

      async function submitReport(reportData) {
        try {
          const response = await axios.post(
            "http://localhost:5000/report",
            reportData
          );
          console.log("Report submitted:", response.data);
        } catch (error) {
          console.error("Error submitting report:", error);
        }
      }

      const report = {
        class:classs,
        review : review ,
        message: reportMessage,
      };

      submitReport(report);
    // Create a tooltip for displaying the reason
    const tooltip = document.createElement("div");
    tooltip.id = "tooltip";
    tooltip.style.position = "absolute";
    tooltip.style.backgroundColor = "#333";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "5px 10px";
    tooltip.style.borderRadius = "5px";
    tooltip.style.display = "none";
    tooltip.style.zIndex = "10002";
    document.body.appendChild(tooltip);

    // Function to show the tooltip
    function showTooltip(event, message) {
      tooltip.textContent = message;
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.top = `${event.pageY + 10}px`;
      tooltip.style.display = "block";
    }

    // Function to hide the tooltip
    function hideTooltip() {
      tooltip.style.display = "none";
    }

    // Add event listeners to reviews for showing/hiding the tooltip
    const reviews = document.querySelectorAll(".review");
    reviews.forEach((review) => {
      review.addEventListener("mouseenter", (event) => {
      const reason = review.getAttribute("data-reason");
      showTooltip(event, reason);
      });
      review.addEventListener("mouseleave", hideTooltip);
    });

    // Function to set the background color based on fakeness level
    function setReviewColor(review, fakenessLevel) {
      if (fakenessLevel === "high") {
      review.style.backgroundColor = "red";
      } else if (fakenessLevel === "medium") {
      review.style.backgroundColor = "yellow";
      } else {
      review.style.backgroundColor = "green";
      }
    }

    // Example usage: setting colors and reasons for reviews
    reviews.forEach((review) => {
      const fakenessLevel = review.getAttribute("data-fakeness");
      setReviewColor(review, fakenessLevel);
    });
    } else {
      async function submitReport(reportData) {
        try {
          const response = await axios.post(
            "http://localhost:5000/report",
            reportData
          );
          console.log("Report submitted:", response.data);
        } catch (error) {
          console.error("Error submitting report:", error);
        }
      }

      const report = {
        class:classs,
        review : review ,
        message: reportType.value,
      };

      submitReport(report);
    }

    console.log("Report submitted:", reportMessage);

    // Close the modal after submission
    modal.style.display = "none";

    // Clear the form after submission
    form.reset();
    toggleOtherInput(false);
  }

  // Function to toggle the visibility of the "Other" textarea in the report modal
  function toggleOtherInput(show) {
    if (show) {
      otherTextarea.style.display = "block";
    } else {
      otherTextarea.style.display = "none";
    }
  }
  return modal;
};

export default errorHTML;
