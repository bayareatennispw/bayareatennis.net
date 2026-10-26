(() => {
  const carousel = document.querySelector("[data-community-carousel]");
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll(".community-slide")];
  const caption = carousel.querySelector("[data-community-caption]");
  const previousButton = carousel.querySelector("[data-community-previous]");
  const nextButton = carousel.querySelector("[data-community-next]");
  const toggleButton = carousel.querySelector("[data-community-toggle]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (slides.length < 2 || !caption || !previousButton || !nextButton || !toggleButton) return;

  const rotationInterval = 6000;
  let currentIndex = 0;
  let intervalId = null;
  let userPaused = false;

  function updateSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    caption.textContent = slides[currentIndex].dataset.caption || "";
  }

  function stopRotation() {
    if (intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
    toggleButton.textContent = "Play";
    toggleButton.setAttribute("aria-label", "Resume automatic photo rotation");
  }

  function syncRotation() {
    const shouldRotate = !userPaused && !reducedMotion.matches && document.visibilityState === "visible";

    if (shouldRotate && intervalId === null) {
      intervalId = window.setInterval(() => updateSlide(currentIndex + 1), rotationInterval);
      toggleButton.textContent = "Pause";
      toggleButton.setAttribute("aria-label", "Pause automatic photo rotation");
    } else if (!shouldRotate) {
      stopRotation();
    }
  }

  function changeSlide(offset) {
    updateSlide(currentIndex + offset);
    syncRotation();
  }

  previousButton.addEventListener("click", () => changeSlide(-1));
  nextButton.addEventListener("click", () => changeSlide(1));
  toggleButton.addEventListener("click", () => {
    userPaused = !userPaused;
    syncRotation();
  });
  document.addEventListener("visibilitychange", syncRotation);
  reducedMotion.addEventListener("change", syncRotation);

  updateSlide(0);
  syncRotation();
})();
