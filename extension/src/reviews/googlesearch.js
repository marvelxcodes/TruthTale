import errorHTML from "../externalHTML/error";
import feedbackHTML from "../externalHTML/feedback";
import axios from "axios";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function clickButton(selector, description) {
  const button = document.querySelector(selector);
  if (button) {
    console.log(`Clicking '${description}' button...`);
    // button.scrollIntoView();
    button.click();
    await wait(1500);
  } else {
    console.log(`'${description}' button not found.`);
  }
}

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
  
  if(probability>=0 && probability<=0.40){
    i.style.color = "red"; 
  }else if(probability>0.40 && probability<=0.60){
    i.style.color = "yellow";
  }else{
    i.style.color = "green";
  }

  i.setAttribute("id", "bulletpoint");
  
  return i;

}

function addTag() {
  let head = document.querySelector("head");
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
      margin: 10px;
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


let googlesearch = async function scrapeReviews() {
  hoverEffectStyle();
  addTag();
  // let revDivCount = 0;

  let reviewDiv = document.querySelectorAll(".z6XoBf");
  let reviewDivA = document.querySelectorAll("._-is");

  // while (true) {
  //   reviewDiv = document.querySelectorAll(".z6XoBf");
  //   reviewDivA = document.querySelectorAll("._-is");

  //   await clickButton(".sh-fp__pagination-button", "More Reviews");

  //   console.log(reviewDiv.length + reviewDivA.length);

  //   if (
  //     revDivCount === reviewDiv.length + reviewDivA.length ||
  //     reviewDiv.length + reviewDivA.length > 100
  //   ) {
  //     break;
  //   }

  //   revDivCount = reviewDiv.length + reviewDivA.length;
  // }

  reviewDiv.forEach(async (ele) => {
    if (ele.style.padding !== "1rem") {
      let reviewData = {
        review : ele.querySelector(".g1lvWe")?.innerText ?? "N/A"
      }

      let response;
      try {
        response = await axios.post(
          "http://localhost:5000/analyze",
          reviewData
        );
        console.log("review submitted:");
      } catch (error) {
        console.error("Error analyzing review:",error);
      }

      // ele.prepend(bulletpoint(response.data.probability));
      ele.appendChild(hoverEffect(ele, response.data.reason));   
      // ele.parentElement.style.background = "#f003";
      ele.style.padding = "1rem";
      ele.style.borderRadius = "1rem";
      if (response.data.probability >= 0 && response.data.probability <= 0.4) {
        ele.style.background = "#f003";
      }
      else if (response.data.probability > 0.4 && response.data.probability <= 0.6) {
        ele.style.background = "#ff03";
      }
      else if (response.data.probability > 0.6) {
        ele.style.background = "#0f03";
      }
      // const revA = ele.querySelector(".g1lvWe")?.innerText ?? "N/A";
      // sentiment(revA)
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
      ele.appendChild(errorHTML({
        review: reviewData.review,
        Class: response.data.probability >= 0.5 ? "Real" : "Fake",
      }));
    }
  });
  reviewDivA.forEach(async (ele) => {
    if (ele.style.padding !== "1rem") {
      let reviewData = {
        review : ele.querySelector("._-i1")?.innerText ?? "N/A"
      }

      let response;
      try {
        response = await axios.post(
          "http://localhost:5000/analyze",
          reviewData
        );
        console.log("review submitted:");
      } catch (error) {
        console.error("Error analyzing review:");
      }

      // ele.prepend(bulletpoint(response.data.probability));
      ele.appendChild(hoverEffect(ele, response.data.reason));   
      // ele.parentElement.style.background = "#f003";
      ele.style.padding = "1rem";
      ele.style.borderRadius = "1rem";
      if (response.data.probability >= 0 && response.data.probability <= 0.4) {
        ele.style.background = "#f003";
      }
      else if (response.data.probability > 0.4 && response.data.probability <= 0.6) {
        ele.style.background = "#ff03";
      }
      else if (response.data.probability > 0.6) {
        ele.style.background = "#0f03";
      }
      // const revA = ele.querySelector("._-i1")?.innerText ?? "N/A";
      // sentiment(revA)
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

  const allReviews = document.querySelector(".sh-rol__reviews-cont");

  const modal = document.querySelector("#popup");
  allReviews.addEventListener("click", (event) => {
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

export default googlesearch;
