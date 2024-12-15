import sentiment from "../models/PnNanalysis";
import errorHTML from "../externalHTML/error";
import feedbackHTML from "../externalHTML/feedback";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function clickButton(allReviews, selector, description) {
  const button = allReviews.querySelector(selector);
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
    "display: flex; align-items: center; justify-content: end;position :relative ;top:-2px;right:-1px"
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

let googleshopping = async function () {
  addTag();
  let revDivCount = 0;

  let allReviews = document.querySelector(".x38CKc");
  let reviewDiv = document.querySelectorAll(".wKtRYe");

  while (true) {
    reviewDiv = document.querySelectorAll(".wKtRYe");

    await clickButton(allReviews, ".ZWyJzc", "More Reviews");

    console.log(reviewDiv.length);

    if (revDivCount === reviewDiv.length || reviewDiv.length > 100) {
      break;
    }

    revDivCount = reviewDiv.length;
  }

  reviewDiv.forEach((ele) => {
    if (!ele.querySelector("#bulletpoint")) {
      const rev = ele.querySelector(".v168Le")?.innerText ?? "N/A";
      sentiment(rev)
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

export default googleshopping;
