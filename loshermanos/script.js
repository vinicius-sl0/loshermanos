/* ==========================================================
   Los Hermanos 085 — comportamento da página
   Todo o conteúdo editável fica em config.js.
   ========================================================== */
(function () {
  "use strict";

  const cfg = window.SITE_CONFIG;
  if (!cfg) {
    console.error("config.js não foi carregado.");
    return;
  }

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const get = (path) => path.split(".").reduce((obj, key) => (obj == null ? obj : obj[key]), cfg);
  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Links centralizados ---------- */
  const whatsappUrl = (texto = cfg.links.whatsappMensagem) =>
    `https://wa.me/${cfg.links.whatsapp}?text=${encodeURIComponent(texto)}`;

  // Sem link de agendamento configurado, o agendamento é feito pelo WhatsApp.
  const agendamentoUrl = (servico) =>
    cfg.links.agendamento ||
    whatsappUrl(servico ? `Olá! Gostaria de agendar: ${servico}.` : cfg.links.whatsappMensagem);

  const LINKS = {
    whatsapp: () => whatsappUrl(),
    agendamento: (el) => agendamentoUrl(el.dataset.servico),
    instagram: () => `https://www.instagram.com/${cfg.links.instagram}/`,
    appAndroid: () => cfg.links.appAndroid || agendamentoUrl(),
    telefone: () => `tel:${cfg.contato.telefoneLink}`,
    mapa: () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cfg.contato.mapa)}`,
  };

  function applyLinks(root = document) {
    $$("[data-link]", root).forEach((el) => {
      const build = LINKS[el.dataset.link];
      if (!build) return;
      el.href = build(el);
      if (el.dataset.link !== "telefone") {
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      }
    });
  }

  /* ---------- Textos vindos da configuração ---------- */
  $$("[data-config]").forEach((el) => {
    const value = get(el.dataset.config);
    if (value != null) el.textContent = value;
  });

  /* ---------- Helpers de serviço ---------- */
  // Aceita caminho local (img/...) ou ID de foto do Unsplash
  const img = (foto, w) =>
    /[/.]/.test(foto) ? foto : `https://images.unsplash.com/photo-${foto}?auto=format&fit=crop&w=${w}&q=75`;

  const brl = (v) =>
    typeof v === "number"
      ? v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: v % 1 ? 2 : 0 })
      : v;

  const icon = (id) => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;

  /* ---------- Cards (serviços com foto) ---------- */
  $("#servicesGrid").innerHTML = cfg.servicos
    .filter((s) => s.foto)
    .map(
      (s) => `
      <article class="service reveal">
        <div class="service__media">
          ${s.destaque ? '<span class="service__tag">Mais pedido</span>' : ""}
          <img src="${img(s.foto, 640)}" alt="${escapeHtml(s.nome)}" loading="lazy">
        </div>
        <div class="service__body">
          <div class="service__head">
            <h3 class="service__name">${escapeHtml(s.nome)}</h3>
            <span class="service__time">${icon("i-clock")}${escapeHtml(s.duracao)}</span>
          </div>
          <p class="service__desc">${escapeHtml(s.descricao || "")}</p>
          <div class="service__foot">
            <div class="service__price"><small>${s.aPartirDe ? "A partir de" : "Valor"}</small><strong>${escapeHtml(brl(s.preco))}</strong></div>
            <a href="#contato" class="btn btn--primary btn--sm" data-link="agendamento" data-servico="${escapeHtml(s.nome)}">Agendar</a>
          </div>
        </div>
      </article>`
    )
    .join("");

  /* ---------- Tabela completa com abas ---------- */
  const tabs = $("#priceTabs");
  const list = $("#priceList");
  const categorias = [{ id: "todos", nome: "Todos" }, ...cfg.categorias];

  tabs.innerHTML = categorias
    .map((c, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-cat="${c.id}">${escapeHtml(c.nome)}</button>`)
    .join("");

  function renderPrices(cat) {
    list.innerHTML = cfg.servicos
      .filter((s) => cat === "todos" || s.categoria === cat)
      .map(
        (s) => `
        <li>
          <a href="#contato" data-link="agendamento" data-servico="${escapeHtml(s.nome)}" aria-label="Agendar ${escapeHtml(s.nome)}">
            <span class="pl__name">${escapeHtml(s.nome)}<small>${escapeHtml(s.duracao)}</small></span>
            <span class="pl__price">${s.aPartirDe ? "<small>a partir de</small>" : ""}${escapeHtml(brl(s.preco))}</span>
            ${icon("i-arrow").replace("<svg", '<svg class="pl__go"')}
          </a>
        </li>`
      )
      .join("");
    applyLinks(list);
  }

  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-cat]");
    if (!btn) return;
    $$("button", tabs).forEach((b) => b.setAttribute("aria-selected", String(b === btn)));
    renderPrices(btn.dataset.cat);
  });
  renderPrices("todos");
  $("#pricesNote").textContent = cfg.avisoPrecos || "";

  // Serviços no formulário, agrupados por categoria
  const serviceSelect = $("#servico");
  cfg.categorias.forEach((c) => {
    const group = document.createElement("optgroup");
    group.label = c.nome;
    cfg.servicos.filter((s) => s.categoria === c.id).forEach((s) => group.append(new Option(s.nome, s.nome)));
    if (group.children.length) serviceSelect.append(group);
  });

  /* ---------- Galeria ---------- */
  const galleryGrid = $("#galleryGrid");
  galleryGrid.innerHTML = cfg.galeria
    .map(
      (g, i) => `
      <button type="button" class="gallery__item reveal" data-index="${i}" aria-label="Ampliar: ${escapeHtml(g.legenda)}">
        <img src="${img(g.foto, 700)}" alt="${escapeHtml(g.legenda)}" loading="lazy">
        <span class="gallery__overlay"><span>${escapeHtml(g.legenda)}</span>${icon("i-expand")}</span>
      </button>`
    )
    .join("");

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCaption = $("#lbCaption");
  let current = 0;
  let lastFocus = null;

  function showImage(i) {
    current = (i + cfg.galeria.length) % cfg.galeria.length;
    const g = cfg.galeria[current];
    lbImg.src = img(g.foto, 1600);
    lbImg.alt = g.legenda;
    lbCaption.textContent = `${g.legenda} · ${current + 1}/${cfg.galeria.length}`;
  }
  function openLightbox(i) {
    lastFocus = document.activeElement;
    showImage(i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    $("#lbClose").focus();
  }
  function closeLightbox() {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  galleryGrid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery__item");
    if (item) openLightbox(Number(item.dataset.index));
  });
  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", () => showImage(current - 1));
  $("#lbNext").addEventListener("click", () => showImage(current + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(current - 1);
    if (e.key === "ArrowRight") showImage(current + 1);
  });

  // Gestos de deslizar no celular
  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showImage(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------- Horários, pagamento e mapa ---------- */
  const hoursList = $("#hoursList");
  hoursList.innerHTML = cfg.contato.horarios
    .map((h) => `<li><span>${escapeHtml(h.dias)}</span><span>${escapeHtml(h.horas)}</span></li>`)
    .join("");

  const hojeIdx = cfg.contato.horarios.findIndex((h) => (h.semana || []).includes(new Date().getDay()));
  const hoje = cfg.contato.horarios[hojeIdx];
  if (hoje) {
    hoursList.children[hojeIdx].classList.add("is-today");
    $("#heroHoje").textContent =
      hoje.horas.toLowerCase() === "fechado" ? "Hoje: fechado · agende para amanhã" : `Hoje: ${hoje.horas}`;
  }

  $("#paymentsList").innerHTML = (cfg.contato.pagamentos || []).map((p) => `<li>${escapeHtml(p)}</li>`).join("");

  $("#mapFrame").src = `https://www.google.com/maps?q=${encodeURIComponent(cfg.contato.mapa)}&z=16&output=embed`;

  applyLinks();

  /* ---------- Cabeçalho e menu ---------- */
  const header = $("#header");
  const nav = $("#nav");
  const navToggle = $("#navToggle");
  const mobileBar = $(".mobile-bar");

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 30);
    mobileBar.classList.toggle("is-visible", y > window.innerHeight * 0.6);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    header.classList.toggle("is-menu-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    $("use", navToggle).setAttribute("href", open ? "#i-close" : "#i-menu");
  }
  navToggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  // Item ativo do menu conforme a seção visível
  const navLinks = $$(".nav__list a");
  const spy = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle("is-active", a.hash === "#" + entry.target.id));
      }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  navLinks.forEach((a) => { const s = $(a.hash); if (s) spy.observe(s); });

  /* ---------- Animações de entrada ---------- */
  const reveal = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        reveal.unobserve(entry.target);
      }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    reveal.observe(el);
  });

  /* ---------- Formulário -> WhatsApp ---------- */
  const form = $("#bookingForm");
  const note = $("#formNote");
  const pad = (n) => String(n).padStart(2, "0");
  const now = new Date();
  $("#data").min = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  form.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const invalid = $$("[required]", form).filter((f) => !f.checkValidity());
    invalid.forEach((f) => f.classList.add("is-invalid"));
    if (invalid.length) {
      note.textContent = "Preencha nome, telefone, serviço e data.";
      note.classList.add("is-error");
      invalid[0].focus();
      return;
    }
    const d = new FormData(form);
    const [ano, mes, dia] = d.get("data").split("-");
    const texto = [
      "Olá! Gostaria de agendar um horário.",
      `Nome: ${d.get("nome")}`,
      `Telefone: ${d.get("telefone")}`,
      `Serviço: ${d.get("servico")}`,
      `Data: ${dia}/${mes}/${ano}`,
      d.get("mensagem") ? `Obs.: ${d.get("mensagem")}` : "",
    ].filter(Boolean).join("\n");

    window.open(whatsappUrl(texto), "_blank", "noopener");
    note.textContent = "Abrindo o WhatsApp…";
    note.classList.remove("is-error");
  });

  $("#year").textContent = now.getFullYear();
})();
