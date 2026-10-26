(() => {
  const carousel = document.querySelector("[data-community-carousel]");
  if (!carousel) return;

  const slidesContainer = carousel.querySelector(".community-carousel-slides");
  const caption = carousel.querySelector("[data-community-caption]");
  const previousButton = carousel.querySelector("[data-community-previous]");
  const nextButton = carousel.querySelector("[data-community-next]");
  const toggleButton = carousel.querySelector("[data-community-toggle]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!slidesContainer || !caption || !previousButton || !nextButton || !toggleButton) return;

  const photos = [
    ["A tennis player in black tracks the ball across the court.", "Focused through every rally."],
    ["A tennis player in red reaches for a shot.", "Eyes on the next shot."],
    ["Four tennis players pose together by the net.", "Good competition, great company."],
    ["A tennis player in red prepares to return the ball.", "Rallying for every point."],
    ["Tennis players celebrate together courtside.", "Every match brings players together."],
    ["A player in blue lunges to return a shot.", "Quick feet, ready hands."],
    ["Players greet one another beside the net.", "Tennis brings people together."],
    ["A player in pink prepares to hit a forehand.", "Focused on the next return."],
    ["Players greet one another across the net.", "Good sportsmanship at the net."],
    ["A tennis player in pink smiles courtside.", "Celebrating every day on court.", "50% 0%"],
    ["Tennis friends pose together after a match.", "Friends made through tennis."],
    ["A player in blue pauses courtside.", "Every match has its supporters."],
    ["Players and family members meet on court during an event.", "A team effort, on and off court."],
    ["A player in blue and white focuses on a shot.", "Ready for the next rally."],
    ["Tennis players share a courtside moment.", "A courtside moment worth remembering."],
    ["Two community members talk beside a tournament table.", "Community comes together behind every event."],
    ["Tennis community members pose together after an event.", "Celebrating a day of competition."],
    ["A tennis player in black moves into position on court.", "Moving into the shot."],
    ["Four tennis community members pose together on court.", "One community, many teammates."],
    ["A player in gray prepares to return a shot.", "Finding the right moment to strike."],
    ["A tennis team celebrates together on court.", "More than a match."],
    ["A tennis player in black tracks the incoming ball.", "A clear view of the ball."],
    ["Two players greet each other after a match.", "Respect and friendship after the final point."],
    ["A tennis player smiles between points.", "A smile that says it all."],
    ["A volunteer welcomes visitors at a tournament table.", "A friendly face at the courts."],
    ["A player in blue reaches for a shot.", "Proud of the work put in."],
    ["A large group of tennis players poses together.", "Good competition, great community."],
    ["A player in gray waits with his racket between points.", "Aiming for the corner."],
    ["Two tennis players pose with their tournament award.", "A team photo to remember."],
    ["A tennis player in white tracks the next shot.", "Between points, focus remains."]
  ];
  const slides = photos.map(([alt, captionText, objectPosition], index) => {
    const slide = document.createElement("figure");
    slide.className = "community-slide";
    slide.dataset.caption = captionText;
    slide.dataset.src = `resources/images/community/match-${String(index + 1).padStart(2, "0")}.jpg`;
    slide.dataset.alt = alt;
    if (objectPosition) slide.dataset.objectPosition = objectPosition;
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `Photo ${index + 1} of ${photos.length}`);
    slide.setAttribute("aria-hidden", "true");
    return slide;
  });
  slidesContainer.replaceChildren(...slides);

  const rotationInterval = 6000;
  let currentIndex = 0;
  let intervalId = null;
  let userPaused = false;
  let cleanupTimeoutId = null;

  function loadSlide(index) {
    const slide = slides[index];
    if (slide.querySelector("img")) return;

    const image = document.createElement("img");
    image.src = slide.dataset.src;
    image.alt = slide.dataset.alt;
    image.width = 1600;
    image.height = 1067;
    image.decoding = "async";
    if (slide.dataset.objectPosition) image.style.objectPosition = slide.dataset.objectPosition;
    image.addEventListener("error", () => {
      console.error(`Community photo failed to load: ${slide.dataset.src}`);
    }, { once: true });
    slide.append(image);
  }

  function updateSlide(index) {
    const previousIndex = currentIndex;
    currentIndex = (index + slides.length) % slides.length;
    const nextIndex = (currentIndex + 1) % slides.length;
    loadSlide(currentIndex);
    loadSlide(nextIndex);

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    caption.textContent = slides[currentIndex].dataset.caption || "";

    if (cleanupTimeoutId !== null) window.clearTimeout(cleanupTimeoutId);
    cleanupTimeoutId = window.setTimeout(() => {
      slides.forEach((slide, slideIndex) => {
        if (slideIndex !== currentIndex && slideIndex !== nextIndex) {
          slide.replaceChildren();
        }
      });
      cleanupTimeoutId = null;
    }, previousIndex === currentIndex ? 0 : 700);
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
