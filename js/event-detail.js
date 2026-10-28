(() => {
  const title = document.querySelector("[data-event-title]");
  const summary = document.querySelector("[data-event-summary]");
  const stages = document.querySelector("[data-event-stages]");
  const divisions = document.querySelector("[data-event-divisions]");
  const rules = document.querySelector("[data-event-rules]");
  const newbiesContent = document.querySelector("[data-newbies-content]");
  const formLinks = document.querySelectorAll("[data-team-registration]");
  if (!title || !stages || !divisions || !rules) return;

  const escapeHtml = window.BAT?.escapeHtml || ((value) => String(value));

  function renderStage(stage) {
    return `<article class="stage-card">
      <span class="stage-number">${escapeHtml(stage.number)}</span>
      <h3>${escapeHtml(stage.name)}</h3>
      <p class="event-meta">${escapeHtml(stage.timing)}</p>
      <p>${escapeHtml(stage.description)}</p>
    </article>`;
  }

  async function loadEvent() {
    try {
      const response = await fetch("../resources/events/events.json");
      if (!response.ok) throw new Error("Could not load event data");
      const data = await response.json();
      const event = (data.events || []).find((item) => item.id === "bat-doubles-2026-27");
      if (!event) throw new Error("Event data is missing");

      title.textContent = event.title;
      if (summary) summary.textContent = event.description;
      formLinks.forEach((link) => link.setAttribute("href", event.registration.team_pre_registration_url));
      stages.innerHTML = event.stages.map(renderStage).join("");
      divisions.innerHTML = event.divisions.map((division) => `
        <article class="division-card">
          <h3>${escapeHtml(division.name)}</h3>
          <p>${escapeHtml(division.eligibility)}</p>
        </article>
      `).join("");
      rules.innerHTML = event.rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("");
      if (newbiesContent && event.newbies) {
        newbiesContent.querySelector("[data-newbies-intro]").textContent = event.newbies.intro;
        ["eligibility", "format", "scheduling", "perks"].forEach((key) => {
          newbiesContent.querySelector(`[data-newbies-${key}]`).innerHTML = event.newbies[key]
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join("");
        });
        newbiesContent.querySelector("[data-newbies-summary]").textContent = event.newbies.short_version;
      }
    } catch (error) {
      console.error(error);
      stages.innerHTML = "<p>Event details could not be loaded.</p>";
    }
  }

  loadEvent();
})();
