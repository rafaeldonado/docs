(() => {
  "use strict";

  const DOCUMENTS = Object.freeze({
    "estructura-funcional": {
      file: "estructura-funcional.md",
      title: "Estructura Funcional del Sistema de Liquidación de Incentivos",
      description: "Estructura funcional, módulos, procesos y responsabilidades principales del sistema.",
      type: "DOCUMENTO FUNCIONAL"
    },
    "summary-capacidades": {
      file: "summary-capacidades.md",
      title: "Summary Ejecutivo — Capacidades",
      description: "Resumen de las capacidades funcionales disponibles en la solución.",
      type: "SUMMARY EJECUTIVO"
    },
    "summary-general": {
      file: "summary-general.md",
      title: "Summary Ejecutivo — Manejo General de los Procesos",
      description: "Visión ejecutiva del ciclo general de operación y manejo de los procesos.",
      type: "SUMMARY EJECUTIVO"
    },
    "summary-procesos": {
      file: "summary-procesos.md",
      title: "Summary Ejecutivo — Procesos de Incentivos",
      description: "Resumen ejecutivo de los procesos de incentivos y su flujo operativo.",
      type: "SUMMARY EJECUTIVO"
    }
  });

  const page = document.body.dataset.page;

  if (page === "index") {
    renderIndex();
  }

  if (page === "viewer") {
    renderViewer();
  }

  function renderIndex() {
    const grid = document.getElementById("documents-grid");
    if (!grid) return;

    Object.entries(DOCUMENTS).forEach(([slug, documentInfo]) => {
      const link = document.createElement("a");
      link.className = "document-card";
      link.href = `viewer.html?doc=${encodeURIComponent(slug)}`;

      const type = document.createElement("span");
      type.className = "document-card__type";
      type.textContent = documentInfo.type;

      const title = document.createElement("h3");
      title.textContent = documentInfo.title;

      const description = document.createElement("p");
      description.textContent = documentInfo.description;

      const open = document.createElement("span");
      open.className = "document-card__open";
      open.textContent = "Abrir documento →";

      link.append(type, title, description, open);
      grid.appendChild(link);
    });
  }

  async function renderViewer() {
    const status = document.getElementById("document-status");
    const content = document.getElementById("document-content");
    const title = document.getElementById("viewer-title");
    const toc = document.getElementById("document-toc");
    const tocToggle = document.getElementById("toc-toggle");

    if (!status || !content || !title) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get("doc");
    const documentInfo = slug ? DOCUMENTS[slug] : null;

    if (!documentInfo) {
      showError(
        status,
        "Documento no válido. Vuelva al índice y seleccione uno de los documentos disponibles."
      );
      return;
    }

    if (!window.marked || typeof window.marked.parse !== "function") {
      showError(
        status,
        "No se pudo cargar el motor Markdown local (js/marked.min.js)."
      );
      return;
    }

    if (!window.DOMPurify || typeof window.DOMPurify.sanitize !== "function") {
      showError(
        status,
        "No se pudo cargar el sanitizador local (js/purify.min.js)."
      );
      return;
    }

    title.textContent = documentInfo.title;
    document.title = `${documentInfo.title} | B. Braun Incentivos`;

    try {
      const response = await fetch(`docs/${documentInfo.file}`, {
        cache: "no-store",
        credentials: "same-origin"
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const markdown = (await response.text()).replace(
        /^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,
        ""
      );

      window.marked.setOptions({
        gfm: true,
        breaks: false
      });

      const renderedHtml = window.marked.parse(markdown);
      content.innerHTML = window.DOMPurify.sanitize(renderedHtml, {
        USE_PROFILES: { html: true }
      });
      hardenRenderedContent(content);
      buildTableOfContents(content);

      status.hidden = true;
      content.hidden = false;
    } catch (error) {
      console.error(error);
      showError(
        status,
        `No se pudo cargar el archivo docs/${documentInfo.file}. Verifique que exista y que IIS permita servir archivos .md.`
      );
    }

    if (tocToggle && toc) {
      tocToggle.addEventListener("click", () => {
        const open = toc.classList.toggle("is-open");
        tocToggle.setAttribute("aria-expanded", String(open));
      });

      toc.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
          toc.classList.remove("is-open");
          tocToggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  function hardenRenderedContent(container) {
    /*
      Los Markdown se cargan exclusivamente desde el mapa DOCUMENTS.
      Esta limpieza es defensa adicional para documentación mantenida por el proyecto.
    */
    container
      .querySelectorAll("script, style, iframe, object, embed, link, meta, form, input, textarea, select, option, button")
      .forEach((element) => element.remove());

    container.querySelectorAll("*").forEach((element) => {
      [...element.attributes].forEach((attribute) => {
        const name = attribute.name.toLowerCase();
        if (name.startsWith("on") || name === "srcdoc") {
          element.removeAttribute(attribute.name);
        }
      });
    });

    container.querySelectorAll("a[href]").forEach((anchor) => {
      const href = anchor.getAttribute("href")?.trim() ?? "";

      if (/^(javascript|vbscript|data):/i.test(href)) {
        anchor.removeAttribute("href");
        return;
      }

      if (/^https?:\/\//i.test(href)) {
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
      }
    });

    container.querySelectorAll("img[src]").forEach((image) => {
      const src = image.getAttribute("src")?.trim() ?? "";
      if (/^(javascript|vbscript):/i.test(src)) {
        image.remove();
      }
    });
  }

  function buildTableOfContents(container) {
    const tocList = document.getElementById("toc-list");
    const toc = document.getElementById("document-toc");
    if (!tocList || !toc) return;

    const headings = [...container.querySelectorAll("h2, h3")];

    if (headings.length === 0) {
      toc.hidden = true;
      return;
    }

    const usedIds = new Set();
    const list = document.createElement("ul");

    headings.forEach((heading, index) => {
      const baseId = slugify(heading.textContent) || `seccion-${index + 1}`;
      let id = baseId;
      let suffix = 2;

      while (usedIds.has(id) || document.getElementById(id)) {
        id = `${baseId}-${suffix++}`;
      }

      usedIds.add(id);
      heading.id = id;

      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${id}`;
      link.textContent = heading.textContent;
      link.className = heading.tagName === "H3" ? "toc-level-3" : "toc-level-2";

      item.appendChild(link);
      list.appendChild(item);
    });

    tocList.replaceChildren(list);
  }

  function slugify(value) {
    return String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function showError(statusElement, message) {
    statusElement.textContent = message;
    statusElement.classList.add("document-status--error");
    statusElement.hidden = false;
  }
})();
