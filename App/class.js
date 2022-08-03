// This Class for switch tab in my codes
class Transmitter {
  constructor(container) {
    this.container = document.querySelector("#switcherContainer");
  }
  async transfer(pageAddress) {
    document.querySelector("#switchSpinner").style.display = "flex"
    const response = await fetch(`../Page/${pageAddress}.html`);
    const response_1 = await response.text();
    this.container.innerHTML = response_1;
    document.querySelector("#switchSpinner").style.display = "none"
    My_JavaScript();
  }
}

// Call Api from server
class API {
  create(query, spinner) {
    // My Token
    const token = "259616:624de36222e8d8.34731341";
    const url = `https://one-api.ir/dictionary/?token=${token}&action=dehkhoda&q=${query}`;

    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        this.addContent(response, spinner);
      });
  }
  addContent(response, spinner) {
    // Status Key
    const statusCode = response.status;
    // For Append
    const container = $.querySelector(".output .grid");
    // Get Search Query Length
    const queryLength = $.querySelector("span.number");
    // Result
    let result = "";

    // Clear
    // spinner.style.display = "block"
    queryLength.innerHTML = "?";
    // container.innerHTML = "";

    switch (statusCode) {
      case 200:
        response.result.map((word) => {
          result += `
            <div class="words">
            <h2 id="word">${word.word}</h2>
            <details>
                <summary id="showMeaning">مشاهده معنا</summary>
                <p id="detail">${word.detail}</p>
            </details>
            </div>
          `;
        });
        queryLength.innerHTML = response.result.length;
        break;
      case 404:
        result = `
        <div class="not-words">
          <img id="resultImage" src="../Image/img/intro.png" />
          <h1>چیزی پیدا نشد</h1>
        </div>
        `;
        break;
      default:
        result = `
        <div class="not-words">
          <h1>خطای ناشناخته</h1>
          <p>لطفا از صفحه ارتباط مشکل را گزارش دهید</p>
        </div>
        `;
        break;
    }

    if (spinner) {
      spinner.style.display = "none";
    }
    container.innerHTML = result;
  }
}

// Create Custom Alert Dialog
const overlay = document.querySelector(".overlay");
function modal(
  targetModal = "sendInformationModal",
  title = "tit",
  text = "txt"
) {
  // Edit Contents
  $.querySelector("#sendInformationModal h1").innerHTML = title;
  $.querySelector("#sendInformationModal #textBody").innerHTML = text;

  const allModals = document.querySelectorAll(".modal");
  for (let i = 0; i < allModals.length; i++) {
    allModals[i].classList.remove("active");
  }

  const target = document.getElementById(targetModal);
  overlay.classList.add("active");
  target.classList.add("active");

  // close btn
  const closeModalBtn = target.querySelectorAll(".close-modal-btn");
  if (closeModalBtn.length) {
    closeModalBtn.forEach((item) => {
      item.addEventListener("click", closeModal, { once: true });
    });
  }
  overlay.addEventListener("click", closeModal, { once: true });

  // Escape Kay
  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    { once: true }
  );

  // toggle modal options
  function closeModal() {
    overlay.classList.remove("active");
    target.classList.remove("active");
  }
}

// return a promise
class Clipboard {
  copy(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard api method'
      return navigator.clipboard.writeText(textToCopy);
    } else {
      // text area method
      let textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      // make the textarea out of viewport
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        // here the magic happens
        document.execCommand("copy") ? res() : rej();
        textArea.remove();
      });
    }
  }
}