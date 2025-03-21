// Preloader
document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    body.classList.remove("hidden");
    if (preloader) {
      preloader.classList.add("hidden");
    }
  }, 500);
});

// GSAP Animations
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();
  const breakPointDesktop = 1024;
  const breakPointTablet = 768;

  const commonScrollTriggerSettings = {
    start: "top 85%",
    end: "bottom 15%",
    toggleActions: "play reverse play reverse",
  };

  mm.add(
    {
      isDesktop: `(min-width: ${breakPointDesktop}px)`,
      isTablet: `(min-width: ${breakPointTablet}px) and (max-width: ${
        breakPointDesktop - 1
      }px)`,
      isMobile: `(max-width: ${breakPointTablet - 1}px)`,
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { isDesktop, isTablet, isMobile } = context.conditions;

      const yOffset = isDesktop ? 20 : isTablet ? 15 : 10;
      const xOffsetMainSection = isDesktop ? -25 : isTablet ? -20 : 20;

      gsap.from(".menu__list li", {
        duration: 1.4,
        opacity: 0,
        y: yOffset,
        stagger: 0.2,
      });

      gsap.from(".main-section__left h1", {
        duration: 1.4,
        opacity: 0,
        x: xOffsetMainSection,
      });

      const aboutMeAnimation = (selector, xOffset, yOffset) => {
        gsap.from(selector, {
          duration: 1,
          opacity: 0,
          x: xOffset,
          y: yOffset,
          scrollTrigger: {
            trigger: ".about-me__section",
            ...commonScrollTriggerSettings,
          },
        });
      };

      const aboutUsAnimation = (selector, xOffset, yOffset) => {
        gsap.from(selector, {
          duration: 1,
          opacity: 0,
          x: xOffset,
          y: yOffset,
          scrollTrigger: {
            trigger: ".about-us__section",
            ...commonScrollTriggerSettings,
          },
        });
      };

      aboutUsAnimation(
        ".about-us__left",
        isDesktop ? -30 : isTablet ? -20 : 0,
        isMobile ? 15 : 0
      );

      aboutUsAnimation(
        ".about-us__right",
        isDesktop ? 30 : isTablet ? 20 : 0,
        isMobile ? 15 : 0
      );

      aboutMeAnimation(
        ".about-me__left",
        isDesktop ? -30 : isTablet ? -20 : 0,
        isMobile ? 15 : 0
      );

      aboutMeAnimation(
        ".about-me__right",
        isDesktop ? 30 : isTablet ? 20 : 0,
        isMobile ? 15 : 0
      );

      const servicesCards = [
        {
          selector: ".services-section-card__seminar",
          xOffset: isDesktop ? -30 : isTablet ? -20 : -15,
        },
        {
          selector: ".services-section-card__communication",
          xOffset: isDesktop ? -30 : isTablet ? -20 : 15,
        },
        {
          selector: ".services-section-card__concentration",
          xOffset: isDesktop ? 30 : isTablet ? 20 : -15,
        },
        {
          selector: ".services-section-card__compliance",
          xOffset: isDesktop ? 30 : isTablet ? 20 : 15,
        },
      ];

      servicesCards.forEach(({ selector, xOffset }) => {
        gsap.from(selector, {
          duration: 1,
          opacity: 0,
          x: xOffset,
          scrollTrigger: {
            trigger: ".services__section",
            ...commonScrollTriggerSettings,
          },
        });
      });

      gsap.from(".swiper", {
        duration: 1.2,
        opacity: 0.5,
        y: isDesktop ? 30 : isTablet ? 20 : 15,
        scrollTrigger: {
          trigger: ".certificates__section",
          ...commonScrollTriggerSettings,
        },
      });

      gsap.to(".main-section__right img", {
        y: -10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 2,
      });

      gsap.to(".about-me-section__img img", {
        y: -10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 2,
      });

      return () => context.revert();
    }
  );
});

// Menu Animation
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".menu__list a");

  links.forEach((link) => {
    link.addEventListener("click", function () {
      this.classList.add("clicked");

      setTimeout(() => {
        this.classList.remove("clicked");
      }, 1000);
    });
  });
});

// Smooth Scroll
document.addEventListener("DOMContentLoaded", () => {
  const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1100,
    speedAsDuration: false,
    durationMax: 2000,
    durationMin: 1100,
    easing: "easeInOutQuad",
    clip: true,
    updateURL: false,
    offset: (anchor) => {
      const elementHeight = anchor.getBoundingClientRect().height;
      const viewportHeight = window.innerHeight;
      return Math.max((viewportHeight - elementHeight) / 2, 0);
    },
  });

  const footerButton = document.getElementById("scroll-to-footer");
  if (footerButton) {
    footerButton.addEventListener("click", () => {
      scroll.animateScroll(document.querySelector("#footer"));
    });
  }

  const scrollToTopButton = document.getElementById("scroll-to-top");
  let lastScrollY = window.scrollY;
  let inactivityTimeout;

  const hideButton = () => {
    scrollToTopButton.style.opacity = "0";
    setTimeout(() => {
      scrollToTopButton.style.display = "none";
    }, 300);
  };

  const showButton = () => {
    scrollToTopButton.style.display = "flex";
    scrollToTopButton.style.opacity = "1";
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimeout);
    if (scrollToTopButton.style.opacity === "1") {
      inactivityTimeout = setTimeout(hideButton, 3000);
    }
  };

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 300 && currentScrollY > lastScrollY) {
      showButton();
    } else {
      hideButton();
    }

    lastScrollY = currentScrollY;
    resetInactivityTimer();
  });

  scrollToTopButton.addEventListener("click", function () {
    this.classList.add("clicked");
    scroll.animateScroll(0);
    setTimeout(() => {
      this.classList.remove("clicked");
    }, 1000);
  });

  ["mousemove", "keydown", "touchstart"].forEach((event) => {
    window.addEventListener(event, resetInactivityTimer);
  });
});

// Form Submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact__form");
  const successMessage = document.getElementById("success__message");
  const errorMessage = document.querySelector(".error__message");
  const loader = document.getElementById("loader");

  if (form) {
    const isEmptyOrSpaces = (str) => !str || str.trim().length === 0;

    const validateInput = (input) => {
      if (isEmptyOrSpaces(input.value)) {
        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "";
        errorMessage.style.display = "none";
      }
    };

    form.addEventListener("input", (event) => {
      if (
        event.target.tagName === "INPUT" &&
        event.target.type === "text" &&
        event.target.name !== "_honey"
      ) {
        validateInput(event.target);
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const inputs = form.querySelectorAll(
        'input[type="text"]:not([name="_honey"])'
      );
      const honeypot = form.querySelector('[name="_honey"]');
      let hasError = false;

      if (!isEmptyOrSpaces(honeypot.value)) {
        console.log("Spam detected! Honeypot field should be empty.");
        errorMessage.textContent =
          "Форма не отправлена. Пожалуйста, попробуйте снова.";
        errorMessage.style.display = "block";
        return;
      }

      inputs.forEach((input) => {
        validateInput(input);
        if (isEmptyOrSpaces(input.value)) {
          hasError = true;
        }
      });

      if (hasError) {
        errorMessage.textContent =
          "Пожалуйста, заполните все обязательные поля.";
        errorMessage.style.display = "block";
        return;
      } else {
        errorMessage.style.display = "none";
      }

      if (loader) {
        loader.style.display = "block";
        form.style.display = "none";
      }

      const formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          loader.style.display = "none";
          if (response.ok) {
            form.style.display = "none";
            successMessage.style.display = "block";
          } else {
            errorMessage.textContent =
              "Ошибка при отправке формы. Пожалуйста, попробуйте снова.";
            errorMessage.style.display = "block";
          }
        })
        .catch((error) => {
          console.error("Ошибка:", error);
          loader.style.display = "none";
          errorMessage.textContent =
            "Ошибка при отправке формы. Пожалуйста, попробуйте снова.";
          errorMessage.style.display = "block";
        });
    });
  }
});

// Carousel
document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".swiper", {
    slidesPerView: 3,
    speed: 600,
    mousewheel: {
      forceToAxis: true,
      releaseOnEdges: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 18,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 18,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
});
