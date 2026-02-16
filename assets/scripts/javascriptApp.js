(function () {
  const $ = (id) => document.getElementById(id);

  const setText = (id, text) => { if ($(id)) $(id).textContent = text; };

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  }

  function renderList(listEl, items, renderer) {
    listEl.innerHTML = "";
    items.forEach((item) => listEl.appendChild(renderer(item)));
  }

  function li(text) {
    const el = document.createElement("li");
    el.textContent = text;
    return el;
  }

  function createRefItem({ title, href, note }) {
    const el = document.createElement("li");
    const a = document.createElement("a");
    a.href = href || "#";
    a.target = href && href !== "#" ? "_blank" : "_self";
    a.rel = "noopener noreferrer";
    a.textContent = title;

    const small = document.createElement("div");
    small.className = "muted";
    small.style.marginTop = "6px";
    small.textContent = note || "";

    el.appendChild(a);
    if (note) el.appendChild(small);
    return el;
  }

  function createBiblioItem({ cite, href }) {
    const el = document.createElement("li");
    if (href && href !== "#") {
      const a = document.createElement("a");
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = cite;
      el.appendChild(a);
    } else {
      el.textContent = cite;
    }
    return el;
  }

  function createRiskItem({ title, severity, note }) {
    const el = document.createElement("div");
    el.className = "risk";

    const top = document.createElement("div");
    top.className = "risk-title";

    const t = document.createElement("span");
    t.textContent = title;

    const b = document.createElement("span");
    b.className = "badge";
    b.textContent = severity;

    const p = document.createElement("p");
    p.className = "muted";
    p.style.margin = "8px 0 0";
    p.textContent = note;

    top.append(t, b);
    el.append(top, p);
    return el;
  }

  function createFindingCard(f) {
    const wrap = document.createElement("article");
    wrap.className = "card";

    const h = document.createElement("h3");
    h.className = "h3";
    h.textContent = `${f.category}: ${f.title}`;

    const claim = document.createElement("p");
    claim.innerHTML = `<strong>Finding:</strong> <span class="muted">${escapeHtml(f.claim)}</span>`;

    const meaning = document.createElement("p");
    meaning.innerHTML = `<strong>What it means:</strong> <span class="muted">${escapeHtml(f.meaning)}</span>`;

    const tags = document.createElement("div");
    tags.className = "tag-list";
    (f.tags || []).forEach((t) => {
      const chip = document.createElement("span");
      chip.className = "tag";
      chip.textContent = t;
      tags.appendChild(chip);
    });

    wrap.append(h, claim, meaning, tags);
    return wrap;
  }

  function createSafeguardCard(s) {
    const wrap = document.createElement("article");
    wrap.className = "card";

    const h = document.createElement("h3");
    h.className = "h3";
    h.textContent = s.title;

    const ul = document.createElement("ul");
    ul.className = "list";
    (s.items || []).forEach((x) => ul.appendChild(li(x)));

    const tags = document.createElement("div");
    tags.className = "tag-list";
    (s.tags || []).forEach((t) => {
      const chip = document.createElement("span");
      chip.className = "tag";
      chip.textContent = t;
      tags.appendChild(chip);
    });

    wrap.append(h, ul, tags);
    return wrap;
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("hubTheme", theme);
  }

  function initThemeToggle() {
    const btn = $("toggleTheme");
    if (!btn) return;

    const saved = localStorage.getItem("hubTheme");
    if (saved) applyTheme(saved);

    btn.addEventListener("click", () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      applyTheme(isLight ? "dark" : "light");
    });
  }

  function renderAll(query = "") {
    const d = HUB_DATA;
    const q = query.trim().toLowerCase();

    setText("footerUpdated", formatDate(d.lastUpdatedISO));
    setText("lastUpdated", formatDate(d.lastUpdatedISO));

    setText("coreClaim", d.coreClaim);
    setText("researchQuestion", d.researchQuestion);

    renderList($("deliverables"), d.deliverables, li);
    renderList($("definitions"), d.definitions, li);
    renderList($("topRecommendations"), d.topRecommendations, li);
    renderList($("scope"), d.scope, li);

    // Findings (filterable)
    const findings = d.findings.filter((f) => {
      const blob = [f.category, f.title, f.claim, f.meaning, ...(f.tags || [])].join(" ").toLowerCase();
      return blob.includes(q);
    });
    const fc = $("findingCards");
    fc.innerHTML = "";
    findings.forEach((f) => fc.appendChild(createFindingCard(f)));

    // Risks (not filtered; keep stable snapshot)
    const rg = $("riskGrid");
    rg.innerHTML = "";
    d.risks.forEach((x) => rg.appendChild(createRiskItem(x)));

    // Safeguards (filterable)
    const safeguards = d.safeguards.filter((s) => {
      const blob = [s.title, ...(s.items || []), ...(s.tags || [])].join(" ").toLowerCase();
      return blob.includes(q);
    });
    const sc = $("safeguardCards");
    sc.innerHTML = "";
    safeguards.forEach((s) => sc.appendChild(createSafeguardCard(s)));

    // Playbook
    const play = $("playbook");
    play.innerHTML = "";
    d.playbook.forEach((step) => {
      const item = document.createElement("li");
      item.textContent = step;
      play.appendChild(item);
    });

    renderList($("limitationsList"), d.limitations, li);
    renderList($("futureWork"), d.futureWork, li);

    // Sources (filterable)
    const coreSources = d.coreSources.filter((r) => {
      const blob = (r.title + " " + (r.note || "")).toLowerCase();
      return blob.includes(q);
    });

    const biblio = d.bibliography.filter((b) => {
      const blob = (b.cite + " " + (b.href || "")).toLowerCase();
      return blob.includes(q);
    });

    renderList($("readingList"), coreSources, createRefItem);
    renderList($("biblioList"), biblio, createBiblioItem);

    setText("readingCount", String(coreSources.length));
    setText("biblioCount", String(biblio.length));
  }

  function initSearch() {
    const input = $("searchInput");
    if (!input) return;
    input.addEventListener("input", () => renderAll(input.value));
  }

  initThemeToggle();
  renderAll("");
  initSearch();
})();
