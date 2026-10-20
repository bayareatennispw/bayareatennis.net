(() => {
  const grid = document.querySelector("#products-grid");
  const status = document.querySelector("#products-status");
  if (!grid) return;

  const { escapeHtml } = window.BAT || {
    escapeHtml: (value) => String(value)
  };

  const VIEW_ORDER = ["front", "back", "side"];
  const VIEW_LABELS = { front: "Front", back: "Back", side: "Side" };

  function imagePath(relativePath) {
    if (!relativePath) return null;
    return `resources/products/${relativePath}`;
  }

  function colorKey(variant) {
    const color = String(variant.artwork_color || "").toLowerCase();
    if (color.includes("black")) return "Black";
    if (color.includes("white") || color.includes("off-white")) return "White";
    // For designs like towel graphics, prefer the design name over ink color.
    return variant.design || variant.artwork_color || "Default";
  }

  function buildGallery(product) {
    const variants = product.variants || [];
    const groups = [];

    if (variants.length) {
      variants.forEach((variant) => {
        const images = variant.images || {};
        const views = VIEW_ORDER
          .filter((view) => images[view])
          .map((view) => ({
            view,
            label: VIEW_LABELS[view],
            src: imagePath(images[view])
          }));
        if (!views.length) return;
        groups.push({
          key: variant.design_code || `${product.id}-${colorKey(variant)}`,
          label: colorKey(variant),
          detail: variant.design || "",
          views
        });
      });
    }

    if (!groups.length && product.images?.length) {
      groups.push({
        key: `${product.id}-default`,
        label: "Views",
        detail: "",
        views: product.images.map((src, index) => ({
          view: `view-${index + 1}`,
          label: `View ${index + 1}`,
          src: imagePath(src)
        }))
      });
    }

    return groups;
  }

  function mediaMarkup(product) {
    const groups = buildGallery(product);
    if (!groups.length) {
      return `<div class="product-media"><div class="product-media-fallback">Image coming soon</div></div>`;
    }

    const firstGroup = groups[0];
    const firstView = firstGroup.views[0];
    const colorControls = groups.length > 1
      ? `<div class="image-switcher" role="group" aria-label="Color">
          ${groups.map((group, index) => `
            <button type="button" class="image-chip" data-group-index="${index}" aria-pressed="${index === 0}">
              ${escapeHtml(group.label)}
            </button>
          `).join("")}
        </div>`
      : "";

    const viewControls = `
      <div class="image-switcher image-views" role="group" aria-label="Product views">
        ${firstGroup.views.map((view, index) => `
          <button type="button" class="image-chip" data-view-index="${index}" aria-pressed="${index === 0}">
            ${escapeHtml(view.label)}
          </button>
        `).join("")}
      </div>
    `;

    return `
      <div class="product-gallery" data-gallery="${encodeURIComponent(JSON.stringify(groups))}">
        <div class="product-media">
          <img
            class="product-main-image"
            src="${escapeHtml(firstView.src)}"
            alt="${escapeHtml(product.title || "Product")} — ${escapeHtml(firstView.label)}"
            loading="lazy"
            onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'product-media-fallback',textContent:'Image coming soon'}))"
          >
        </div>
        ${colorControls}
        ${viewControls}
      </div>
    `;
  }

  function variantMarkup(product) {
    const variants = product.variants || [];
    if (!variants.length) return "";
    return `
      <ul class="variant-list">
        ${variants.map((variant) => `
          <li>
            <span><strong>${escapeHtml(variant.design || variant.design_code || "Design")}</strong>
            ${variant.artwork_color ? ` · ${escapeHtml(variant.artwork_color)}` : ""}</span>
            <span>${escapeHtml(variant.availability || product.status || "Draft")}</span>
          </li>
        `).join("")}
      </ul>
    `;
  }

  function updateGallery(gallery, groupIndex, viewIndex) {
    let groups;
    try {
      groups = JSON.parse(decodeURIComponent(gallery.dataset.gallery || "%5B%5D"));
    } catch {
      return;
    }
    const group = groups[groupIndex];
    if (!group) return;
    const view = group.views[viewIndex] || group.views[0];
    if (!view) return;

    gallery.dataset.groupIndex = String(groupIndex);
    gallery.dataset.viewIndex = String(viewIndex);

    const img = gallery.querySelector(".product-main-image");
    if (img) {
      img.src = view.src;
      const title = gallery.closest(".product-card")?.querySelector("h3")?.textContent || "Product";
      img.alt = `${title} — ${group.label} ${view.label}`;
    }

    gallery.querySelectorAll("[data-group-index]").forEach((button) => {
      button.setAttribute("aria-pressed", String(Number(button.dataset.groupIndex) === groupIndex));
    });

    const viewRow = gallery.querySelector(".image-views");
    if (viewRow) {
      viewRow.innerHTML = group.views.map((item, index) => `
        <button type="button" class="image-chip" data-view-index="${index}" aria-pressed="${index === viewIndex}">
          ${escapeHtml(item.label)}
        </button>
      `).join("");
    }
  }

  async function loadProducts() {
    if (status) status.textContent = "Loading products…";
    try {
      const response = await fetch("resources/products/products.json");
      if (!response.ok) throw new Error("Could not load products");
      const data = await response.json();
      const products = data.products || [];

      if (status) {
        status.textContent = `${products.length} products · catalog draft`;
      }

      grid.innerHTML = products.map((product) => {
        const designs = (product.design_options || []).join(" · ");
        return `
          <article class="product-card" data-product-id="${escapeHtml(product.id || "")}">
            ${mediaMarkup(product)}
            <div class="product-body">
              <div class="product-top">
                <span class="product-category">${escapeHtml(product.category || "Product")}</span>
                <span class="product-status">${escapeHtml(product.status || "Draft")}</span>
              </div>
              <h3>${escapeHtml(product.title || "")}</h3>
              <p>${escapeHtml(product.description || "")}</p>
              ${designs ? `<p class="product-designs">${escapeHtml(designs)}</p>` : ""}
              <div class="product-detail">
                <button class="button button-secondary on-light" type="button" data-toggle-product>View designs</button>
                <div class="product-panel">
                  ${variantMarkup(product)}
                  ${product.to_confirm ? `<p class="product-note">${escapeHtml(product.to_confirm)}</p>` : ""}
                </div>
              </div>
            </div>
          </article>
        `;
      }).join("");
    } catch (error) {
      if (status) status.textContent = "Products could not be loaded.";
      console.error(error);
    }
  }

  grid.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-toggle-product]");
    if (toggle) {
      const card = toggle.closest(".product-card");
      if (!card) return;
      const open = card.classList.toggle("is-open");
      toggle.textContent = open ? "Hide designs" : "View designs";
      return;
    }

    const chip = event.target.closest(".image-chip");
    if (!chip) return;
    const gallery = chip.closest(".product-gallery");
    if (!gallery) return;

    const currentGroup = Number(gallery.dataset.groupIndex || 0);
    const currentView = Number(gallery.dataset.viewIndex || 0);

    if (chip.hasAttribute("data-group-index")) {
      updateGallery(gallery, Number(chip.dataset.groupIndex), 0);
      return;
    }

    if (chip.hasAttribute("data-view-index")) {
      updateGallery(gallery, currentGroup, Number(chip.dataset.viewIndex));
    }
  });

  loadProducts();
})();
