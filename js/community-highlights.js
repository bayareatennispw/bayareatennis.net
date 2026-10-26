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
    ["A couple smiles together at a tennis community event.", "Together on and off the court."],
    ["Three tennis community members pose together outdoors.", "The people who make the community."],
    ["A tennis player poses with his racket at a tournament.", "Ready for the next point."],
    ["A woman checks in players at a tennis event.", "Every event starts with a warm welcome."],
    ["Two event volunteers review information together at a table.", "A team effort, on and off court."],
    ["A woman tennis player reaches for a shot on court.", "Moving into the shot."],
    ["A tennis player in a red shirt hits a forehand.", "Focus on every rally."],
    ["A tennis player in red stretches for a ball.", "Chasing down every ball."],
    ["A player in red reaches for a shot near the net.", "One point at a time."],
    ["A tennis player in red serves during a match.", "Watching the ball closely."],
    ["A player reaches for a tennis shot in a black-and-white photo.", "Up for the challenge."],
    ["A tennis player in white hits a forehand.", "Starting the point."],
    ["A tennis player holds his racket in front of a tournament backdrop.", "Finding the perfect angle."],
    ["A woman tennis player swings her racket on court.", "A moment worth celebrating."],
    ["A smiling tennis player in pink poses courtside.", "Rallying together."],
    ["A woman tennis player runs to return a shot.", "A clean hit and a clear view."],
    ["A woman in a blue tennis top watches from courtside.", "Every match has its supporters."],
    ["A tennis player in blue reaches for a shot.", "The joy of being on court."],
    ["Players gather at a tournament welcome table.", "A warm welcome for every player."],
    ["A tennis player reaches for a shot on a clay court.", "Eyes on the next shot."],
    ["A woman tennis player in a Stanford shirt reaches for the ball.", "In the middle of the action."],
    ["A woman tennis player waits in a ready position.", "Reading the play."],
    ["A smiling woman tennis player holds her racket.", "Ready at the baseline."],
    ["A woman tennis player poses in a cap and towel.", "Proud of the work put in."],
    ["A tennis player in blue prepares a forehand.", "A day well spent on court."],
    ["A tennis player in gray holds his racket between points.", "Quick feet, ready hands."],
    ["Two men greet each other at a tennis event.", "Every player has a story."],
    ["A tennis community group poses together on court.", "Good competition, great community."],
    ["A woman welcomes visitors at a tennis event tent.", "A friendly face at the courts."],
    ["Three tennis players pose with a tournament sign.", "Friends made through tennis."],
    ["Four tennis players pose together by the net.", "One community, many teammates."],
    ["A group of women tennis players pose together on court.", "Sharing the win."],
    ["Four friends pose together after playing tennis.", "More than a match."],
    ["Tennis players greet each other during a match.", "Good sportsmanship in every match."],
    ["A tennis team poses together after a tournament.", "A team photo to remember."],
    ["Tournament winners pose with their awards.", "Celebrating together."],
    ["A tennis couple poses with their tournament prize.", "A shared love for tennis."],
    ["Two tennis partners pose together on court.", "Better together."],
    ["A tennis player looks toward the court before a point.", "A quiet moment before the serve."],
    ["A family poses together with tennis rackets on court.", "Tennis brings generations together."]
  ];
  const slides = photos.map(([alt, captionText], index) => {
    const slide = document.createElement("figure");
    slide.className = "community-slide";
    slide.dataset.caption = captionText;
    slide.dataset.src = `resources/images/community/match-${String(index + 1).padStart(2, "0")}.jpg`;
    slide.dataset.alt = alt;
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
