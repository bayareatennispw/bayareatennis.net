(() => {
  const primaryGrid = document.querySelector("#events-grid");
  const pastGrid = document.querySelector("#past-events-grid");
  const note = document.querySelector("#events-note");
  const status = document.querySelector("#events-status");
  if (!primaryGrid && !pastGrid) return;

  const escapeHtml = window.BAT?.escapeHtml || ((value) => String(value));

  function ctaMarkup(event, registerUrl) {
    if (event.detail_url) {
      return `<a class="text-link" href="${escapeHtml(event.detail_url)}">View event details <span aria-hidden="true">→</span></a>`;
    }
    if (event.lifecycle === "past") {
      return `<a class="text-link" href="history.html">Past results</a>`;
    }
    if (event.cta === "history") {
      return `<a class="text-link" href="history.html">Past results</a>`;
    }
    return `<a class="text-link" href="${escapeHtml(registerUrl)}" target="_blank" rel="noreferrer">Register on UTR <span aria-hidden="true">↗</span></a>`;
  }

  function renderGrid(grid, events, registerUrl) {
    if (!grid) return;
    const featuredOnly = grid.dataset.featured === "true";
    const visibleEvents = events.filter((event) => !featuredOnly || event.featured);
    grid.innerHTML = visibleEvents.map((event) => `
      <article class="event-card">
        <span class="event-status">${escapeHtml(event.status || "Event")}</span>
        <h3>${escapeHtml(event.title || "")}</h3>
        ${event.meta ? `<p class="event-meta">${escapeHtml(event.meta)}</p>` : ""}
        <p>${escapeHtml(event.description || "")}</p>
        ${ctaMarkup(event, registerUrl)}
      </article>
    `).join("");
  }

  async function loadEvents() {
    if (status) status.textContent = "Loading events…";
    try {
      const response = await fetch("resources/events/events.json");
      if (!response.ok) throw new Error("Could not load events");
      const data = await response.json();
      const registerUrl = data.register_url
        || window.BAT?.config?.register_url
        || "https://app.utrsports.net/club/3156?tab=info";
      const allEvents = data.events || [];
      const upcomingEvents = allEvents.filter((event) => event.lifecycle !== "past");
      const pastEvents = allEvents.filter((event) => event.lifecycle === "past");

      renderGrid(primaryGrid, upcomingEvents, registerUrl);
      renderGrid(pastGrid, pastEvents, registerUrl);
      if (status) status.textContent = `${upcomingEvents.length} upcoming or ongoing event${upcomingEvents.length === 1 ? "" : "s"} · ${pastEvents.length} past event${pastEvents.length === 1 ? "" : "s"}`;
      if (note && data.note) note.textContent = data.note;
    } catch (error) {
      if (status) status.textContent = "Events could not be loaded.";
      console.error(error);
    }
  }

  loadEvents();
})();
