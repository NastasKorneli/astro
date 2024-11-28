/* ===================================================================
 * Luther 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function (html) {
  "use strict";

  html.className = html.className.replace(/\bno-js\b/g, "") + " js ";

  /* Preloader
   * -------------------------------------------------- */
  const ssPreloader = function () {
    const preloader = document.querySelector("#preloader");
    if (!preloader) return;

    window.addEventListener("load", function () {
      document.querySelector("html").classList.remove("ss-preload");
      document.querySelector("html").classList.add("ss-loaded");

      preloader.style.display = "none";
    });
  }; // end ssPreloader

  /* Mobile Menu
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
  }; // end ssMobileMenu

  /* Initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssMobileMenu();
  })();
})(document.documentElement);

document.addEventListener("DOMContentLoaded", function () {
  const currentPath =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".main-nav a").forEach((link) => {
    const href = link.getAttribute("href");

    if (href === currentPath) {
      link.classList.add("current");
      link.style.backgroundColor = "#d65369";
    } else {
      link.classList.remove("current");
      link.style.backgroundColor = "";
    }
  });
});

function toggleAnswer(questionElement) {
  const answer = questionElement.nextElementSibling;
  answer.classList.toggle("active");
  const icon = questionElement.querySelector("i");
  icon.classList.toggle("rotate");
}

function addHover(element) {
  if (!element.classList.contains("active")) {
    element.style.backgroundColor = "#d65369";
  }
}

function removeHover(element) {
  if (!element.classList.contains("active")) {
    element.style.backgroundColor = "";
  }
}

function toggleActive(element) {
  if (element.classList.contains("active")) {
    element.classList.remove("active");
    element.style.backgroundColor = "";
  } else {
    document.querySelectorAll(".tag.btn.btn--small").forEach((btn) => {
      btn.classList.remove("active");
      btn.style.backgroundColor = "";
    });
    element.classList.add("active");
    element.style.backgroundColor = "#d65369";
  }
}



<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  
        function addSpans() {
            const wall = document.getElementById("wall");
            const words = wall.textContent.split(" "); // Split the text into words
    
            // Create spans for each letter in each word
            const spanWords = words.map((word, wordIndex) => {
                return [...word].map(letter => {
                    const spanClass = wordIndex % 2 === 0 ? "oddWord" : "evenWord";
                    return `<span class="${spanClass}">${letter}</span>`;
                }).join(""); // Join the letters back as a word
            });
    
            wall.innerHTML = spanWords.join(" "); // Replace wall content with spans
        }

        function animateWall() {
            // GSAP Animation for spans
            gsap.fromTo(
                "span",
                {
                    opacity: 0, // Start invisible
                    scale: 0, // Start collapsed
                },
                {
                    opacity: 1, // Fully visible
                    scale: 1, // Full size
                    stagger: {
                        each: 0.05, // Delay for sequential animation
                        from: "random" // Animate in random order
                    },
                    duration: 1.5,
                    ease: "power2.out" // Smooth easing for the animation
                }
            );
        }

        document.addEventListener("DOMContentLoaded", () => {
            addSpans();

            const wallContainer = document.getElementById("wall-container");

            // Intersection Observer to trigger animation when in view
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateWall(); // Start animation
                        observer.unobserve(entry.target); // Stop observing after animation starts
                    }
                });
            }, {
                threshold: 0.1 // Trigger when 10% of the element is visible
            });

            // Observe the wall container
            observer.observe(wallContainer);
        });