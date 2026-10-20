(() => {
  const grid = document.querySelector("#events-grid");
  const note = document.querySelector("#events-note");
  const status = document.querySelector("#events-status");
  const loadMoreButton = document.querySelector("#events-load-more");
  if (!grid) return;

  const { escapeHtml } = window.BAT || {
    escapeHtml: (value) => String(value)
  };
  const pageSize = 8;
  let visibleCount = pageSize;

  function ctaMarkup(event, registerUrl) {
    if (event.cta === "history") {
      return `<a class="text-link" href="history.html">Past results</a>`;
    }
    return `<a class="text-link" href="${escapeHtml(registerUrl)}" target="_blank" rel="noreferrer">Register on UTR <span aria-hidden="true">↗</span></a>`;
  }

  function renderEvents(events, registerUrl) {
    const visibleEvents = events.slice(0, visibleCount);
    grid.innerHTML = visibleEvents.map((event) => `
      <article class="event-card">
        <span class="event-status">${escapeHtml(event.status || "Event")}</span>
        <h3>${escapeHtml(event.title || "")}</h3>
        ${event.meta ? `<p class="event-meta">${escapeHtml(event.meta)}</p>` : ""}
        <p>${escapeHtml(event.description || "")}</p>
        ${ctaMarkup(event, registerUrl)}
      </article>
    `).join("");

    if (loadMoreButton) {
      loadMoreButton.hidden = visibleCount >= events.length;
    }
  }

  loadMoreButton?.addEventListener("click", () => {
    visibleCount += pageSize;
    loadMoreButton.disabled = true;
    loadMoreButton.textContent = "Loading…";
    loadEvents();
  });

  async function loadEvents() {
    if (status) status.textContent = "Loading events…";
    try {
      const response = await fetch("resources/events/events.json");
      if (!response.ok) throw new Error("Could not load events");
      const data = await response.json();
      const registerUrl = data.register_url
        || window.BAT?.config?.register_url
        || "https://app.utrsports.net/club/3156?tab=info";
      const featuredOnly = grid.dataset.featured === "true";
      const events = (data.events || []).filter((event) => !featuredOnly || event.featured);

      if (status) {
        status.textContent = `${events.length} event${events.length === 1 ? "" : "s"}`;
      }

      renderEvents(events, registerUrl);
      if (loadMoreButton) {
        loadMoreButton.disabled = false;
        loadMoreButton.textContent = "Show more events";
      }

      if (note && data.note) note.textContent = data.note;
    } catch (error) {
      if (loadMoreButton) {
        loadMoreButton.disabled = false;
        loadMoreButton.textContent = "Show more events";
      }
      if (status) status.textContent = "Events could not be loaded.";
      console.error(error);
    }
  }

  loadEvents();
})();
