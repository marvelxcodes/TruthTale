import sentiment from "../models/PnNanalysis";
import errorHTML from "../externalHTML/error";
import feedbackHTML from "../externalHTML/feedback";

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

function bulletpoint(bullet) {
  let div = document.createElement("div");

  div.setAttribute(
    "style",
    "display: flex; align-items: center; justify-content: end;margin-right:3px;margin-bottom :4px "
  );
  div.setAttribute("id", "bulletpoint");

  if (bullet) {
    div.innerText = "🟢";
  } else {
    div.innerText = "🔴";
  }
  return div;
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

let googlesearch = async function scrapeReviews() {
  addTag();
  let revDivCount = 0;

  let reviewDiv = document.querySelectorAll(".z6XoBf");
  let reviewDivA = document.querySelectorAll("._-is");

  while (true) {
    reviewDiv = document.querySelectorAll(".z6XoBf");
    reviewDivA = document.querySelectorAll("._-is");

    await clickButton(".sh-fp__pagination-button", "More Reviews");

    console.log(reviewDiv.length + reviewDivA.length);

    if (
      revDivCount === reviewDiv.length + reviewDivA.length ||
      reviewDiv.length + reviewDivA.length > 100
    ) {
      break;
    }

    revDivCount = reviewDiv.length + reviewDivA.length;
  }

  reviewDiv.forEach((ele) => {
    if (!ele.querySelector("#bulletpoint")) {
      const revA = ele.querySelector(".g1lvWe")?.innerText ?? "N/A";
      sentiment(revA)
        .then((result) => {
          if (result == "POSITIVE") {
            ele.prepend(bulletpoint(true));
          } else if (result == "NEGATIVE") {
            ele.prepend(bulletpoint(false));
          }
        })
        .catch((error) => {
          console.log(error);
        });

      ele.appendChild(addHTML());
      ele.appendChild(feedbackHTML());
      ele.appendChild(errorHTML());
    }
  });
  reviewDivA.forEach((ele) => {
    if (!ele.querySelector("#bulletpoint")) {
      const revA = ele.querySelector("._-i1")?.innerText ?? "N/A";
      sentiment(revA)
        .then((result) => {
          if (result == "POSITIVE") {
            ele.prepend(bulletpoint(true));
          } else if (result == "NEGATIVE") {
            ele.prepend(bulletpoint(false));
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
