(function () {
  var FONT_OPTS = [
    { value: "Inter", label: "inter", family: "Inter, sans-serif" },
    { value: "Poppins", label: "poppins", family: "Poppins, sans-serif" },
    { value: "Kanit", label: "Kanit", family: "Kanit, sans-serif" },
    { value: "Krona One", label: "Krona One", family: "'Krona One', sans-serif" },
    { value: "DM Sans", label: "DM sans", family: "'DM Sans', sans-serif" },
    { value: "Host Grotesk", label: "Host Grotesk", family: "'Host Grotesk', sans-serif" }
  ];
  var STYLE_OPTS = [
    { value: "P", label: "Normal", size: "14px", weight: "400" },
    { value: "H1", label: "Header 1", size: "28px", weight: "700" },
    { value: "H2", label: "Header 2", size: "24px", weight: "700" },
    { value: "H3", label: "Header 3", size: "20px", weight: "600" },
    { value: "H4", label: "Header 4", size: "18px", weight: "600" },
    { value: "H5", label: "Header 5", size: "16px", weight: "600" },
    { value: "H6", label: "Header 6", size: "14px", weight: "600" }
  ];
  var SIZE_OPTS = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "24"];
  var LH_OPTS = ["1.0", "1.2", "1.4", "1.6", "1.8", "2.0", "2.2", "2.4", "2.6", "2.8"];

  function ensureFonts() {
    if (document.getElementById("editorMenuFonts")) return;
    var link = document.createElement("link");
    link.id = "editorMenuFonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600&family=Host+Grotesk:wght@400;600&family=Inter:wght@400;600;700&family=Kanit:wght@400;600&family=Krona+One&family=Poppins:wght@400;600&display=swap";
    document.head.appendChild(link);
  }

  function fillSelect(select, kind) {
    var current = select.value;
    select.innerHTML = "";
    var opts = [];
    if (kind === "style") opts = STYLE_OPTS.map(function (o) { return { value: o.value, label: o.label }; });
    if (kind === "font") opts = FONT_OPTS.map(function (o) { return { value: o.value, label: o.label }; });
    if (kind === "size") opts = SIZE_OPTS.map(function (v) { return { value: v, label: v }; });
    if (kind === "lh") opts = LH_OPTS.map(function (v) { return { value: v, label: v }; });
    opts.forEach(function (o) {
      var opt = document.createElement("option");
      opt.value = o.value;
      opt.textContent = o.label;
      select.appendChild(opt);
    });
    if (current) select.value = current;
    if (!select.value && opts[0]) select.value = opts[kind === "size" ? 3 : kind === "lh" ? 3 : 0].value;
  }

  function kindOf(select) {
    if (select.id === "formatBlockSelect" || select.classList.contains("type-select")) return "style";
    if (select.id === "fontNameSelect" || select.classList.contains("font-select")) return "font";
    if (select.id === "fontSizeSelect") return "size";
    if (select.id === "lineHeightSelect") return "lh";
    return "lh";
  }

  function labelOf(kind) {
    if (kind === "style") return "Style";
    if (kind === "font") return "font";
    return "line height";
  }

  function closeAll(except) {
    Array.prototype.forEach.call(document.querySelectorAll(".tool-menu.is-open"), function (menu) {
      if (menu !== except) menu.classList.remove("is-open");
    });
  }

  function buildMenu(select) {
    if (select.dataset.menuReady) return;
    var kind = kindOf(select);
    fillSelect(select, kind);
    select.dataset.menuReady = "1";
    select.classList.add("tool-select-native");

    var wrap = document.createElement("div");
    wrap.className = "tool-menu " + (select.classList.contains("small-select") ? "is-small" : "") + (select.classList.contains("font-select") ? " is-font" : "") + (select.classList.contains("type-select") ? " is-style" : "");
    wrap.dataset.kind = kind;

    var trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "tool-menu-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");

    var panel = document.createElement("div");
    panel.className = "tool-menu-panel";
    panel.innerHTML = '<div class="tool-menu-label">' + labelOf(kind) + "</div><div class=\"tool-menu-list\" role=\"listbox\"></div>";
    var list = panel.querySelector(".tool-menu-list");

    select.parentNode.insertBefore(wrap, select);
    wrap.appendChild(trigger);
    wrap.appendChild(select);
    wrap.appendChild(panel);

    function syncTrigger() {
      var opt = select.options[select.selectedIndex];
      trigger.textContent = opt ? opt.textContent : "";
      if (kind === "font") trigger.style.fontFamily = (FONT_OPTS.find(function (f) { return f.value === select.value; }) || {}).family || "inherit";
    }

    function renderList() {
      list.innerHTML = "";
      Array.prototype.forEach.call(select.options, function (opt) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "tool-menu-item" + (opt.selected ? " is-selected" : "");
        btn.setAttribute("role", "option");
        var label = document.createElement("span");
        label.className = "tool-menu-item-label";
        label.textContent = opt.textContent;
        if (kind === "style") {
          var meta = STYLE_OPTS.find(function (s) { return s.value === opt.value; });
          if (meta) {
            label.style.fontSize = meta.size;
            label.style.fontWeight = meta.weight;
          }
        }
        if (kind === "font") {
          var font = FONT_OPTS.find(function (f) { return f.value === opt.value; });
          if (font) label.style.fontFamily = font.family;
        }
        btn.appendChild(label);
        var check = document.createElement("span");
        check.className = "tool-menu-check";
        check.innerHTML = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 10.5 8.2 13.7 15 6.8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        btn.appendChild(check);
        btn.addEventListener("click", function () {
          select.value = opt.value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          syncTrigger();
          renderList();
          wrap.classList.remove("is-open");
        });
        list.appendChild(btn);
      });
    }

    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      var willOpen = !wrap.classList.contains("is-open");
      closeAll();
      if (willOpen) {
        renderList();
        wrap.classList.add("is-open");
      }
    });

    select.addEventListener("change", syncTrigger);
    syncTrigger();
  }

  function upgradeFontSizeHandlers() {
    var sizeSelect = document.getElementById("fontSizeSelect");
    if (!sizeSelect || sizeSelect.dataset.pxBound) return;
    sizeSelect.dataset.pxBound = "1";
    sizeSelect.addEventListener("change", function () {
      var editor = document.getElementById("notesEditor");
      if (!editor) return;
      document.execCommand("fontSize", false, "7");
      Array.prototype.forEach.call(editor.querySelectorAll('font[size="7"]'), function (el) {
        var span = document.createElement("span");
        span.style.fontSize = sizeSelect.value + "px";
        while (el.firstChild) span.appendChild(el.firstChild);
        el.parentNode.replaceChild(span, el);
      });
    });
  }

  function init() {
    ensureFonts();
    Array.prototype.forEach.call(document.querySelectorAll("select.tool-select"), buildMenu);
    upgradeFontSizeHandlers();
  }

  window.initEditorMenus = init;

  document.addEventListener("click", function () { closeAll(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAll();
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());
