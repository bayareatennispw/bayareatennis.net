(() => {
  const historyList = document.querySelector("#history-list");
  const historyStatus = document.querySelector("#history-status");
  const langButtons = document.querySelectorAll(".lang-toggle button");
  if (!historyList || !historyStatus) return;

  const { escapeHtml, formatDate } = window.BAT || {
    escapeHtml: (value) => String(value),
    formatDate: (iso) => iso
  };

  let currentLang = "English";
  let historyDates = [];

  function renderParagraphs(body) {
    return body
      .split(/\n{2,}/)
      .map((block) => `<p>${escapeHtml(block).replaceAll("\n", "<br>")}</p>`)
      .join("");
  }

  async function loadIndex() {
    const response = await fetch("resources/history/index.json");
    if (!response.ok) throw new Error("Could not load history index");
    const data = await response.json();
    historyDates = data.dates || [];
  }

  async function loadHistory(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === "Chinese" ? "zh" : "en";
    historyStatus.textContent = lang === "Chinese" ? "正在加载…" : "Loading stories…";
    historyList.replaceChildren();

    try {
      if (!historyDates.length) await loadIndex();

      const posts = await Promise.all(historyDates.map(async (date) => {
        const response = await fetch(`resources/history/${date}_${lang}.json`);
        if (!response.ok) throw new Error(`Could not load ${date}`);
        const data = await response.json();
        return { date, ...data };
      }));

      historyStatus.textContent = lang === "Chinese"
        ? `${posts.length} 篇社区纪实`
        : `${posts.length} community stories`;

      historyList.innerHTML = posts.map((post) => {
        const sourceLabel = lang === "Chinese" ? "阅读原文" : "Read original";
        const source = post.original_link
          ? `<p class="history-source"><a href="${escapeHtml(post.original_link)}" target="_blank" rel="noreferrer">${sourceLabel} <span aria-hidden="true">↗</span></a></p>`
          : "";
        return `
          <article class="history-article">
            <time datetime="${escapeHtml(post.time || post.date)}">${escapeHtml(formatDate(post.time || post.date, lang))}</time>
            <h2>${escapeHtml(post.title || "")}</h2>
            <div class="history-body">${renderParagraphs(post.content || "")}</div>
            ${source}
          </article>
        `;
      }).join("");
    } catch (error) {
      historyStatus.textContent = lang === "Chinese"
        ? "暂时无法加载历史内容。"
        : "Stories could not be loaded.";
      console.error(error);
    }
  }

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.dataset.lang;
      langButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      loadHistory(lang);
    });
  });

  loadHistory(currentLang);
})();
