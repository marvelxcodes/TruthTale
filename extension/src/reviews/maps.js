import errorHTML from "../externalHTML/error";
import feedbackHTML from "../externalHTML/feedback";
import axios from "axios";

function addHTML() {
  let div = document.createElement("div");

  div.setAttribute(
    "style",
    "display: flex; align-items: center; justify-content: end;margin-top: 5px;margin-bottom: 5px; "
  );

  let i1 = document.createElement("i");
  let i2 = document.createElement("i");

  i1.setAttribute("class", "fa-solid fa-triangle-exclamation");
  i2.setAttribute("class", "fa-regular fa-message icon");

  i1.setAttribute("id", "reportIcon");
  i2.setAttribute("id", "icon");

  i2.setAttribute(
    "style",
    "font-size: 20px;cursor: pointer;margin-right: 10px"
  );
  i1.setAttribute(
    "style",
    "color: rgb(209, 66, 66); font-size: 21px;margin-right: 10px;cursor: pointer"
  );

  div.appendChild(i1);
  div.appendChild(i2);

  return div;
}

function bulletpoint(probability) {
  let i = document.createElement("i");

  i.setAttribute("class", "fa-solid fa-circle");
  i.setAttribute(
    "style",
    "display: flex; align-items: center; justify-content: end;position :relative ;top:-2px;right:-1px"
  );

  if (probability >= 0 && probability <= 0.4) {
    i.style.color = "red";
  } else if (probability > 0.4 && probability <= 0.6) {
    i.style.color = "yellow";
  } else {
    i.style.color = "green";
  }

  i.setAttribute("id", "bulletpoint");

  return i;
}

function addTag() {
  let head = document.head;
  let link = document.createElement("link");

  link.setAttribute(
    "href",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  );
  link.setAttribute("rel", "stylesheet");
  head.appendChild(link);
}

function hoverEffect(reviewDiv ,reason) {
  const reviewReason = document.createElement("div");
  reviewReason.classList.add("review-reason");
  reviewReason.textContent = `Reason: "${reason}"`;

  reviewDiv.appendChild(reviewReason);

  reviewDiv.addEventListener("mouseenter", () => {
    reviewReason.style.display = "block";
  });

  reviewDiv.addEventListener("mouseleave", () => {
    reviewReason.style.display = "none";
  });
  return reviewReason ;
}

function hoverEffectStyle() {
  const style = document.createElement("style");
  style.innerHTML = `
    .review-reason {
      display: none;
      // position: absolute;
      top: 0;
      margin: 10px 0;
      left: 30px;
      width: 90%;
      padding: 10px;
      background-color: #fff;
      border: 1px solid #ccc;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      z-index: 10000;
    }
  `;
  document.head.appendChild(style);
}

let googleMaps = async function () {
  hoverEffectStyle();
  addTag();

  let allReviews = document.querySelectorAll(".m6QErb");
  let reviewDiv = document.querySelectorAll(".jftiEf");

  reviewDiv.forEach(async (ele) => {
    if (!ele.querySelector("#bulletpoint")) {
      let reviewData = {
        review: ele.querySelector(".wiI7pd")?.innerText ?? "N/A",
      };

      let response;
      try {
        response = await axios.post(
          "http://localhost:5000/analyze",
          reviewData
        );
      } catch (error) {
        console.error("Error analyzing review:");
      }

      console.log(response.data.probability);
      ele.prepend(bulletpoint(response.data.probability));
      ele.appendChild(hoverEffect(ele, response.data.reason));   
      // ele.parentElement.style.background = "#f003";

      if (response.data.probability >= 0 && response.data.probability <= 0.4) {
        ele.style.background = "#f003";
      }
      else if (response.data.probability > 0.4 && response.data.probability <= 0.6) {
        ele.style.background = "#ff03";
      }
      else if (response.data.probability > 0.6) {
        ele.style.background = "#0f03";
      }
      // const rev = ele.querySelector(".wiI7pd")?.innerText ?? "N/A";
      // sentiment(rev)
      //   .then((result) => {
      //     if (result == "POSITIVE") {
      //       ele.prepend(bulletpoint(true));
      //     } else if (result == "NEGATIVE") {
      //       ele.prepend(bulletpoint(false));
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      ele.appendChild(addHTML());
      ele.appendChild(feedbackHTML());
      ele.appendChild(errorHTML());
    }
  });

  const modal = document.querySelector("#popup");
  allReviews[allReviews.length - 1].addEventListener("click", (event) => {
    if (event.target.matches("#icon")) {
      let x = event.target.parentElement.parentElement;
      x.querySelector("#feedbackPopup").style.display = "block";
    }
    if (event.target.matches("#reportIcon")) {
      let x = event.target.parentElement.parentElement;
      x.querySelector("#reportPopup").style.display = "block";
    }
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      console.log("clicked model");
      modal.style.display = "none";
    }
  });
};

export default googleMaps;
