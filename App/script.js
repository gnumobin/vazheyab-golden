

// Variales
const $ = document;

function My_JavaScript() {
  // Get desktop menu buttons
  const desktopHomeBtn = $.querySelector(".desktop-header #homeButton");
  const desktopSearchBtn = $.querySelector(".desktop-header #searchButton");
  const desktopAboutBtn = $.querySelector(".desktop-header #aboutButton");
  const desktopContactBtn = $.querySelector(".desktop-header #contactButton");
  const themeEditBtn = $.querySelector(".desktop-header #themeEditor");
  // Get System Button in mobile menu
  const openMenuBtn = $.querySelector("#openMenu");
  const closeMenuBtn = $.querySelector("#closeMenu");
  const menuSelf = $.querySelector(".mobile-menu ul");
  // Get mobile menu buttons
  const mobileHomeBtn = $.querySelector(".mobile-header #homeButton");
  const mobileSearchBtn = $.querySelector(".mobile-header #searchButton");
  const mobileAboutBtn = $.querySelector(".mobile-header #aboutButton");
  const mobileContactBtn = $.querySelector(".mobile-header #contactButton");
  const mobileThemeEditBtn = $.querySelector(".mobile-header #themeEditor");
  // Get normal button in this page
  const startSearchBtn = $.querySelector("#startSearch");
  const moreInfoBtn = $.querySelector("#moreInfo");
  const shareBtn = $.querySelector("#shareWeb");
  const scrollToUpBtn = $.querySelector("#moveToTop");
  // Get the search box home form
  const searchHome = $.querySelector("#searchBoxHome");
  // Get Contact Forms
  const sendEmailForm = $.querySelector("#sendEmailForm");
  // Gets Share Btns
  const shareSection = $.querySelector("section.share-website");

  eventListeners();

  function eventListeners() {
    //! after clicked in menu and header button

    // * Desktop
    // after click the home button
    if (desktopHomeBtn) desktopHomeBtn.addEventListener("click", afterHome);
    // After Click the search button
    if (desktopSearchBtn) desktopSearchBtn.addEventListener("click", afterSearch);
    // after click the about button
    if (desktopAboutBtn) desktopAboutBtn.addEventListener("click", afterAbout);
    // After Click the contact button
    if (desktopContactBtn) desktopContactBtn.addEventListener("click", afterContact);
    // * End Desktop

    // ? Mobile
    // after click the home button
    if (mobileHomeBtn) mobileHomeBtn.addEventListener("click", afterHome);
    // After Click the search button
    if (mobileSearchBtn) mobileSearchBtn.addEventListener("click", afterSearch);
    // after click the about button
    if (mobileAboutBtn) mobileAboutBtn.addEventListener("click", afterAbout);
    // After Click the contact button
    if (mobileContactBtn) mobileContactBtn.addEventListener("click", afterContact);
    // ? End Mobile


    // ! end codes for menu and header button

    //* Menu Events
    // Open The mobile menu #CALL
    if (openMenuBtn) openMenuBtn.addEventListener("click", afterOpenMenu);
    // Close the mobile menu #CALL
    if (closeMenuBtn) closeMenuBtn.addEventListener("click", afterCloseMenu);
    //* End Menu Events

    // *
    // Open The search page
    if (startSearchBtn) {
      startSearchBtn.addEventListener("click", afterSearch);
    }
    // Open The about page
    if (moreInfoBtn) {
      moreInfoBtn.addEventListener("click", afterAbout);
    }
    // Scroll to top this page
    if (scrollToUpBtn) {
      scrollToUpBtn.addEventListener("click", afterScroll);
    }
    // Edit Website Theme
    if (themeEditBtn) themeEditBtn.addEventListener("click", afterEditTheme);
    if (mobileThemeEditBtn) {
      mobileThemeEditBtn.addEventListener("click", afterEditTheme);
    }
    // Share Bank Link
    if (shareBtn) {
      shareBtn.addEventListener("click", afterShare);
    }
    // *

    // After user searchd in home
    if (searchHome) {
      searchHome.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get user query
        const query = $.querySelector(".search-box input").value;

        transmitter.transfer("search").then(() => {
          // Get the spinner
          const spinner = $.querySelector("#loadingSpinner");
          if (query === "") {
            modal("sendInformationModal", "ای بابا", "لطفا ی چیزی جستجو کن");
          } else {
            const container = $.querySelector(".output .grid");
            container.innerHTML = "";
            if (spinner) {
              spinner.style.display = "block";
            }
            api.create(query, spinner);

            initForm();
          }
        });

        searchHome.reset();
      });
    }

    // Validate Send Email Form
    if (sendEmailForm) {
      sendEmailForm.addEventListener("submit", afterSendFeedbak);
    }

    // Share Buttons events
    shareSection.addEventListener("click", afterShareSection);
  }

  // Functions

  // ! All menu Reactions
  // After Click home button in all menu
  function afterHome(e) {
    transmitter.transfer("../index");
  }
  // After Click search button in all menu
  function afterSearch(e) {
    transmitter.transfer("search").then(() => {
      initForm();
    });
  }
  // init search form when search page initialized
  let counter = 0;
  function initForm() {
    document.querySelector(".search-box").addEventListener("submit", (e) => {
      e.preventDefault();

      counter++;

      // Get the spinner
      const spinner = $.querySelector("#loadingSpinner");

      // Get Query
      const query = $.querySelector(".search-box input").value;

      if (query === "") {
        modal("sendInformationModal", "ای بابا", "لطفا ی چیزی جستجو کن");
      } else {
        const container = $.querySelector(".output .grid");
        container.innerHTML = "";
        spinner.style.display = "block";
        api.create(query, spinner);
      }

      if (counter > 3) {
        modal(
          "sendInformationModal",
          "سلام خوشگله",
          "میبینم که داری با سایت حال میکنی ، نمیخوای حمایت کنی؟"
        );

        counter = 0;
      }

      $.querySelector(".search-box").reset();
    });
  }

  // After Click home button in all menu
  function afterAbout(e) {
    document.querySelector("#switchSpinner").style.display = "flex"
    transmitter.transfer("about");
  }
  // After Click search button in all menu
  function afterContact(e) {
    transmitter.transfer("contact");
  }
  // ! End Codes for all menu button reaction

  //* Mobile Menu Funcs
  // Open Mobile Menu
  function afterOpenMenu() {
    $.querySelector(".mobile-menu ul").style.width = "70vw";
  }
  // Close mobile menu
  function afterCloseMenu() {
    $.querySelector(".mobile-menu ul").style.width = "0px";
  }
  // * end mobile funcs

  // ? Normal Button this page funcs

  // Soft Scroll to 0,0 this page
  function afterScroll() {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  // After Clicked Edit Website theme (default == go to the dark theme)
  let themeCount = 0;
  function afterEditTheme() {
    // Increase ThemeCount
    themeCount++
    // Theme 
    const body = document.querySelector("body");
    // Switch Theme (Light , Dark) With LocalStorage

    if (themeCount % 2 === 0) {
      localStorage.setItem("theme", "light")
      body.classList.remove("dark")
    } else {
      localStorage.setItem("theme", "dark")
      body.classList.add("dark")
    }
  }
  // after clicked in share btn for share link
  function afterShare() {
    // Get close this sec button
    const closeThis = $.querySelector("#closeSec");
    closeThis.addEventListener("click", () => {
      shareSection.style.opacity = "0";
      shareSection.style.zIndex = "-100";
    });
    shareSection.style.opacity = "10";
    shareSection.style.zIndex = "10";
  }
}

// After send email in me or send feedbak in me | my email
function afterSendFeedbak(e) {
  // My Email
  const myEmail = "mobinghaemi@yahoo.com";
  // Reset Default Reactions
  e.preventDefault();
  // Get Contents
  const userName = e.target.querySelector("input#userName").value;
  const userTitle = e.target.querySelector("input#userTitle").value;
  const userText = e.target.querySelector("#userText").value;

  location.assign(
    `mailto:${myEmail}?subject=${userTitle}&body=${userName},${userText}`
  );
}

// Share Btns after click
function afterShareSection(e) {
  const myLink = "whatsapp://send?text=http://www.example.com";
  // Create Social Media link
  const whatsApp = `https://wa.me/?text=${myLink}`;
  const telegram = `tg://msg?text=${myLink}`;

  if (e.target.className === "fa fa-clipboard") {
    modal("sendInformationModal", "بسیار عالی", "لینک درگاه پرداخت کپی شد");
    clipboard.copy("https://idpay.ir/protect-word");
  }
  if (e.target.className === "fab fa-telegram") {
    modal(
      "sendInformationModal",
      "هشدار",
      "برای اشتراک گذاری از طریق تلگرام فیلترشکن خود را روشن کنید"
    );

    location.assign(telegram);
  }
  if (e.target.className === "fab fa-whatsapp") {
    location.assign(whatsApp);
  }
}

// After Load Page
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme")) {
    $.querySelector("body").classList.add(localStorage.getItem("theme"))
  }
})