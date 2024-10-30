(function (html) {
    "use strict";
  
    html.className = html.className.replace(/\bno-js\b/g, "") + " js ";
  
    /* Preloader - Отключён для ускорения
     * -------------------------------------------------- */
    const ssPreloader = function () {
      const preloader = document.querySelector("#preloader");
      if (!preloader) return;
  
      window.addEventListener("load", function () {
        document.querySelector("html").classList.remove("ss-preload");
        document.querySelector("html").classList.add("ss-loaded");
  
        document.querySelectorAll(".ss-animated").forEach(function (item) {
          item.classList.remove("ss-animated");
        });
      });
    }; 
  
    /* Mobile Menu - Меню для мобильных устройств
     * ---------------------------------------------------- */
    const ssMobileMenu = function () {
      const toggleButton = document.querySelector(".mobile-menu-toggle");
      const mainNavWrap = document.querySelector(".main-nav-wrap");
      const siteBody = document.querySelector("body");
  
      if (!(toggleButton && mainNavWrap)) return;
  
      toggleButton.addEventListener("click", function (event) {
        event.preventDefault();
        toggleButton.classList.toggle("is-clicked");
        siteBody.classList.toggle("menu-is-open");
      });
  
      mainNavWrap.querySelectorAll(".main-nav a").forEach(function (link) {
        link.addEventListener("click", function (event) {
          if (window.matchMedia("(max-width: 800px)").matches) {
            toggleButton.classList.toggle("is-clicked");
            siteBody.classList.toggle("menu-is-open");
          }
        });
      });
  
      window.addEventListener("resize", function () {
        if (window.matchMedia("(min-width: 801px)").matches) {
          if (siteBody.classList.contains("menu-is-open"))
            siteBody.classList.remove("menu-is-open");
          if (toggleButton.classList.contains("is-clicked"))
            toggleButton.classList.remove("is-clicked");
        }
      });
    };
  
    /* Highlight active menu link on pagescroll
     * ------------------------------------------------------ */
    const ssScrollSpy = function () {
      const sections = document.querySelectorAll(".target-section");
  
      window.addEventListener("scroll", navHighlight);
  
      function navHighlight() {
        let scrollY = window.pageYOffset;
  
        sections.forEach(function (current) {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 50;
          const sectionId = current.getAttribute("id");
  
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document
              .querySelector(".main-nav a[href*=" + sectionId + "]")
              .parentNode.classList.add("current");
          } else {
            document
              .querySelector(".main-nav a[href*=" + sectionId + "]")
              .parentNode.classList.remove("current");
          }
        });
      }
    };
  
    /* Swiper - Слайдер изображений
     * ------------------------------------------------------ */
    const ssSwiper = function () {
      const mySwiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          401: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          801: {
            slidesPerView: 2,
            spaceBetween: 32,
          },
          1201: {
            slidesPerView: 2,
            spaceBetween: 80,
          },
        },
      });
    };
  
    /* Lightbox - Модальные окна
     * ------------------------------------------------------ */
    const ssLightbox = function () {
      const folioLinks = document.querySelectorAll(".folio-list__item-link");
      const modals = [];
  
      folioLinks.forEach(function (link) {
        let modalbox = link.getAttribute("href");
        let instance = basicLightbox.create(document.querySelector(modalbox), {
          onShow: function (instance) {
            document.addEventListener("keydown", function (event) {
              event = event || window.event;
              if (event.keyCode === 27) {
                instance.close();
              }
            });
          },
        });
        modals.push(instance);
      });
  
      folioLinks.forEach(function (link, index) {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          modals[index].show();
        });
      });
    };
  
    /* Smoothscroll
     * ------------------------------------------------------ */
    const ssMoveTo = function () {
      const triggers = document.querySelectorAll(".smoothscroll");
      const moveTo = new MoveTo({
        tolerance: 0,
        duration: 1200,
        easing: "easeInOutCubic",
        container: window,
      });
  
      triggers.forEach(function (trigger) {
        moveTo.registerTrigger(trigger);
      });
    };
  
    /* Initialize
     * ------------------------------------------------------ */
    (function ssInit() {
      ssPreloader();
      ssMobileMenu();
      ssScrollSpy();
      ssSwiper();
      ssLightbox();
      ssMoveTo();
    })();
  })(document.documentElement);
  