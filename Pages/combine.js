/* Shared icon sprite — design SVG set */
(function () {
  if (document.getElementById("app-icons-sprite")) return;

  var host = document.createElement("div");
  host.id = "app-icons-sprite";
  host.setAttribute("hidden", "");
  host.innerHTML = [
    '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">',
    '<symbol id="icon-pen" viewBox="0 0 24 24" fill="none"><path d="M16.9459 3.17305C17.5332 2.58578 17.8268 2.29215 18.1521 2.15173C18.6208 1.94942 19.1521 1.94942 19.6208 2.15173C19.946 2.29215 20.2397 2.58578 20.8269 3.17305C21.4142 3.76032 21.7079 4.05395 21.8483 4.37925C22.0506 4.8479 22.0506 5.37924 21.8483 5.84789C21.7079 6.17319 21.4142 6.46682 20.8269 7.05409L15.8054 12.0757C14.5682 13.3129 13.9496 13.9315 13.1748 14.298C12.4 14.6645 11.5294 14.7504 9.78823 14.9222L9 15L9.07778 14.2118C9.24958 12.4706 9.33549 11.6 9.70201 10.8252C10.0685 10.0504 10.6871 9.43183 11.9243 8.19464L16.9459 3.17305Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M6 15H3.75C2.7835 15 2 15.7835 2 16.75C2 17.7165 2.7835 18.5 3.75 18.5H13.25C14.2165 18.5 15 19.2835 15 20.25C15 21.2165 14.2165 22 13.25 22H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>',
    '<symbol id="icon-trash" viewBox="0 0 24 24" fill="none"><path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 11.7349H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M10.5 15.6543H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>',
    '<symbol id="icon-add-field" viewBox="0 0 20 20" fill="none"><path d="M10 1.66699C14.6023 1.66699 18.3333 5.39795 18.3333 10.0003C18.3333 14.6027 14.6023 18.3336 10 18.3336C5.39762 18.3336 1.66667 14.6027 1.66667 10.0003M7.42417 2.07272C6.58333 2.34573 5.80112 2.74879 5.10127 3.25817M3.25786 5.10158C2.74838 5.80156 2.34527 6.58393 2.07225 7.42493" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 6.66699V13.3336M13.3333 10.0003H6.66667" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></symbol>',
    '<symbol id="icon-calendar-alt" viewBox="0 0 24 24" fill="none"><path d="M16 2V6M8 2V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 10H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 14H16M8 14H8.00898M13 18H8M16 18H15.991" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>',
    '<symbol id="icon-undo" viewBox="0 0 20 20" fill="none"><path d="M2.5 6.66663H12.5C15.2614 6.66663 17.5 8.90521 17.5 11.6666C17.5 14.428 15.2614 16.6666 12.5 16.6666H9.16667" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.8335 3.33337L4.872 4.06381C3.29075 5.26505 2.50016 5.86567 2.50016 6.66671C2.50016 7.46775 3.29075 8.06837 4.872 9.26962L5.8335 10" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></symbol>',
    '<symbol id="icon-redo" viewBox="0 0 20 20" fill="none"><path d="M17.5 6.66663H7.5C4.73857 6.66663 2.5 8.90521 2.5 11.6666C2.5 14.428 4.73857 16.6666 7.5 16.6666H10.8333" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.1665 3.33337L15.128 4.06381C16.7093 5.26505 17.4998 5.86567 17.4998 6.66671C17.4998 7.46775 16.7093 8.06837 15.128 9.26962L14.1665 10" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></symbol>',
    '<symbol id="icon-bold" viewBox="0 0 20 20" fill="none"><path d="M10.8333 3.33337H8.33333C6.76198 3.33337 5.97631 3.33337 5.48816 3.82153C5 4.30968 5 5.09536 5 6.66671V10H10.8333C12.6742 10 14.1667 8.50762 14.1667 6.66671C14.1667 4.82576 12.6742 3.33337 10.8333 3.33337Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.6667 10H5V13.3333C5 14.9047 5 15.6903 5.48816 16.1785C5.97631 16.6667 6.76198 16.6667 8.33333 16.6667H11.6667C13.5076 16.6667 15 15.1742 15 13.3333C15 11.4924 13.5076 10 11.6667 10Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></symbol>',
    '<symbol id="icon-italic" viewBox="0 0 20 20" fill="none"><path d="M10 3.33337H15.8333" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><path d="M6.6665 16.6667L13.3332 3.33337" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><path d="M4.1665 16.6666H9.99984" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></symbol>',
    '<symbol id="icon-underline" viewBox="0 0 20 20" fill="none"><path d="M4.5835 2.5V9.58333C4.5835 12.5749 7.00862 15 10.0002 15C12.9917 15 15.4168 12.5749 15.4168 9.58333V2.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.5 17.5H17.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></symbol>',
    '<symbol id="icon-strikethrough" viewBox="0 0 20 20" fill="none"><path d="M3.3335 10H16.6668" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.5833 6.38889C14.5833 4.24112 12.5313 2.5 10 2.5C7.46869 2.5 5.41667 4.24112 5.41667 6.38889C5.41667 6.79399 5.46113 7.16486 5.55567 7.5M5 13.6111C5 15.7589 7.23857 17.5 10 17.5C12.7614 17.5 15 16.3889 15 13.6111C15 11.617 14.1411 10.4818 12.4232 10" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></symbol>',
    '<symbol id="icon-text-color" viewBox="0 0 20 20" fill="none"><path d="M2.5 17.5H17.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><path d="M15.8332 15L13.0204 7.63206C11.7143 4.21068 11.0613 2.5 9.99984 2.5C8.93842 2.5 8.28535 4.21068 6.97923 7.63206L4.1665 15" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><path d="M6.6665 9.16663H13.3332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></symbol>',
    '<symbol id="icon-fill-drip" viewBox="0 0 20 20" fill="none"><path d="M10.9015 3.35473L4.16683 10.1077L9.21783 15.1723C10.7037 16.6623 11.4467 17.4073 12.3586 17.4896C12.5093 17.5033 12.661 17.5033 12.8117 17.4896C13.7235 17.4073 14.4665 16.6623 15.9524 15.1723L17.6361 13.4841C18.566 12.5517 18.566 11.04 17.6361 10.1077M4.16683 10.1077H17.6361M17.6361 10.1077L10.9015 3.35473M10.9015 3.35473L12.5851 1.6665" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.66667 16.6665C1.66667 17.587 2.41283 18.3332 3.33333 18.3332C4.25383 18.3332 5 17.587 5 16.6665C5 15.746 3.33333 14.1665 3.33333 14.1665C3.33333 14.1665 1.66667 15.746 1.66667 16.6665Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></symbol>',
    '<symbol id="icon-list-bullet" viewBox="0 0 20 20" fill="none"><path d="M6.6665 4.5835H16.6665" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><path d="M6.6665 10.4165H16.6665" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><path d="M6.6665 16.25H16.6665" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><path d="M3.646 4.58333H3.54183M3.75016 4.58333C3.75016 4.69839 3.65689 4.79167 3.54183 4.79167C3.42677 4.79167 3.3335 4.69839 3.3335 4.58333C3.3335 4.46827 3.42677 4.375 3.54183 4.375C3.65689 4.375 3.75016 4.46827 3.75016 4.58333Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.646 10.4168H3.54183M3.75016 10.4168C3.75016 10.5319 3.65689 10.6252 3.54183 10.6252C3.42677 10.6252 3.3335 10.5319 3.3335 10.4168C3.3335 10.3017 3.42677 10.2085 3.54183 10.2085C3.65689 10.2085 3.75016 10.3017 3.75016 10.4168Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.646 16.2498H3.54183M3.75016 16.2498C3.75016 16.3649 3.65689 16.4582 3.54183 16.4582C3.42677 16.4582 3.3335 16.3649 3.3335 16.2498C3.3335 16.1348 3.42677 16.0415 3.54183 16.0415C3.65689 16.0415 3.75016 16.1348 3.75016 16.2498Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></symbol>',
    '<symbol id="icon-align-left-lines" viewBox="0 0 20 20" fill="none"><path d="M2.5 2.5H17.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.5 7.5H9.16667" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.5 12.5H17.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.5 17.5H9.16667" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></symbol>',
    '<symbol id="icon-link" viewBox="0 0 20 20" fill="none"><path d="M7.9165 12.0833L12.0832 7.91663" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><path d="M14.0386 12.1746L16.2132 10C17.9289 8.28427 17.9289 5.50252 16.2132 3.78679C14.4975 2.07107 11.7157 2.07107 10 3.78679L7.82537 5.96142M12.1746 14.0386L10 16.2132C8.28427 17.929 5.50253 17.929 3.7868 16.2132C2.07107 14.4975 2.07107 11.7157 3.7868 10L5.96142 7.82538" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></symbol>',
    '<symbol id="icon-image" viewBox="0 0 24 24" fill="none"><path d="M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21ZM5 21L16 10L21 15M10 8.5C10 9.32843 9.32843 10 8.5 10C7.67157 10 7 9.32843 7 8.5C7 7.67157 7.67157 7 8.5 7C9.32843 7 10 7.67157 10 8.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>',
    '<symbol id="icon-save" viewBox="0 0 20 20" fill="none"><path d="M10 18.3336C6.46447 18.3336 4.6967 18.3336 3.59835 17.1133C2.5 15.8929 2.5 13.9287 2.5 10.0003C2.5 6.07195 2.5 4.10777 3.59835 2.88738C4.6967 1.66699 6.46447 1.66699 10 1.66699C13.5355 1.66699 15.3033 1.66699 16.4017 2.88738C17.5 4.10777 17.5 6.07195 17.5 10.0003C17.5 13.9287 17.5 15.8929 16.4017 17.1133C15.3033 18.3336 13.5355 18.3336 10 18.3336Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.66663 2.0835V8.18867C6.66663 9.22791 6.66663 9.74758 6.98864 9.93358C7.61223 10.2937 8.78196 9.09208 9.33746 8.73025C9.65963 8.52041 9.82071 8.4155 9.99996 8.4155C10.1792 8.4155 10.3403 8.52041 10.6625 8.73025C11.218 9.09208 12.3877 10.2937 13.0113 9.93358C13.3333 9.74758 13.3333 9.22791 13.3333 8.18867V2.0835" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></symbol>',
    '<symbol id="icon-send" viewBox="0 0 20 20" fill="none"><path d="M17.0833 2.91675L8.75 11.2501" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.0833 2.91675L11.4583 17.0834L8.75 11.2501L2.91663 8.54175L17.0833 2.91675Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></symbol>',
    "</svg>"
  ].join("");

  function mount() {
    if (!document.body) return;
    document.body.insertBefore(host, document.body.firstChild);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();

  window.uiIcon = function (id) {
    return '<svg aria-hidden="true"><use href="#' + id + '"></use></svg>';
  };
}());


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


/* ===== Templates Store ===== */
window.TemplatesStore = (function () {
  var KEY = "stitch_gb_templates";

  var productsA = [
    { name: "Product 1", price: 20, qty: 1, tax: 0 },
    { name: "Product 1", price: 20, qty: 1, tax: 0 },
    { name: "Product 1", price: 20, qty: 1, tax: 0 }
  ];
  var productsB = [
    { name: "Consulting", price: 150, qty: 2, tax: 0 },
    { name: "Retainer", price: 200, qty: 1, tax: 5 }
  ];
  var productsC = [
    { name: "Design Package", price: 450, qty: 1, tax: 0 },
    { name: "Revisions", price: 75, qty: 2, tax: 0 }
  ];

  function amountOf(products) {
    return products.reduce(function (sum, row) {
      var sub = Number(row.price || 0) * Number(row.qty || 0);
      return sum + sub + sub * Number(row.tax || 0) / 100;
    }, 0);
  }

  function buildSeed() {
    var base = {
      companyName: "ABC 3",
      companyEmail: "riley.bennett@corporate.net",
      companyPhone: "+13141236547",
      companyAddress: "Oxford Street United Kingdom",
      customer: "John's Company",
      issueDate: "2026-08-04",
      dueDate: "2026-08-18",
      notes: ""
    };
    var invoiceSeeds = [
      { name: "Standard Invoice", products: productsA },
      { name: "Monthly Retainer", products: productsB },
      { name: "Brand Package", products: productsC },
      { name: "Support Plan", products: productsA },
      { name: "Website Launch", products: productsC },
      { name: "Q2 Billing", products: productsB },
      { name: "Consulting Hourly", products: productsB }
    ];
    var estimateSeeds = [
      { name: "Project Estimate", products: productsA },
      { name: "Discovery Quote", products: productsB },
      { name: "Website Redesign", products: productsC },
      { name: "Retainer Proposal", products: productsB },
      { name: "Support Estimate", products: productsA }
    ];
    var list = [];
    var id = 1;
    invoiceSeeds.forEach(function (seed, i) {
      list.push(Object.assign({}, base, {
        id: id++,
        type: "invoice",
        name: seed.name,
        invoiceNum: String(10 + i),
        amount: Number(amountOf(seed.products).toFixed(2)),
        products: seed.products.map(function (p) { return Object.assign({}, p); }),
        createdAt: Date.now() - (invoiceSeeds.length - i) * 86400000
      }));
    });
    estimateSeeds.forEach(function (seed, i) {
      list.push(Object.assign({}, base, {
        id: id++,
        type: "estimate",
        name: seed.name,
        invoiceNum: String(20 + i),
        amount: Number(amountOf(seed.products).toFixed(2)),
        products: seed.products.map(function (p) { return Object.assign({}, p); }),
        createdAt: Date.now() - (estimateSeeds.length - i) * 86400000
      }));
    });
    return list;
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch (e) {}
    var list = buildSeed();
    save(list);
    return list;
  }

  function save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function getAll() { return load(); }

  function getById(id) {
    id = Number(id);
    return load().find(function (item) { return item.id === id; }) || null;
  }

  function getByType(type) {
    return load().filter(function (item) { return item.type === type; });
  }

  function upsert(item) {
    var list = load();
    var idx = list.findIndex(function (entry) { return entry.id === item.id; });
    if (idx >= 0) list[idx] = item;
    else list.unshift(item);
    save(list);
    return item;
  }

  function remove(id) {
    id = Number(id);
    save(load().filter(function (item) { return item.id !== id; }));
  }

  function nextId() {
    var max = 0;
    load().forEach(function (item) { if (item.id > max) max = item.id; });
    return max + 1;
  }

  function createBlank(type) {
    var products = [
      { name: "Product 1", price: 20, qty: 1, tax: 0 },
      { name: "Product 1", price: 20, qty: 1, tax: 0 },
      { name: "Product 1", price: 20, qty: 1, tax: 0 }
    ];
    return upsert({
      id: nextId(),
      type: type || "invoice",
      name: type === "estimate" ? "New Estimate Template" : "New Invoice Template",
      companyName: "ABC 3",
      companyEmail: "riley.bennett@corporate.net",
      companyPhone: "+13141236547",
      companyAddress: "Oxford Street United Kingdom",
      customer: "John's Company",
      invoiceNum: String(nextId()),
      issueDate: "2026-08-04",
      dueDate: "2026-08-18",
      amount: amountOf(products),
      products: products,
      notes: "",
      createdAt: Date.now()
    });
  }

  return {
    getAll: getAll,
    getById: getById,
    getByType: getByType,
    upsert: upsert,
    remove: remove,
    nextId: nextId,
    createBlank: createBlank,
    save: save,
    amountOf: amountOf
  };
}());


/* ===== Templates List Page ===== */
(function () {
  var tableBody = document.getElementById("templatesTableBody");
  if (!tableBody) return;

  var templates = window.TemplatesStore.getAll();
  var pendingDeleteId = null;
  var state = {
    type: "invoice",
    search: "",
    page: 1,
    pageSize: Number(document.getElementById("pageSizeSelect").value)
  };

  var panelTitle = document.getElementById("panelTitle");
  var searchInput = document.getElementById("searchInput");
  var pageSizeSelect = document.getElementById("pageSizeSelect");
  var emptyState = document.getElementById("emptyState");
  var resultsMeta = document.getElementById("resultsMeta");
  var pagination = document.getElementById("pagination");
  var tableHeadRow = document.getElementById("tableHeadRow");
  var deleteOverlay = document.getElementById("deleteModalOverlay");
  var deleteTitle = document.getElementById("deleteModalTitle");

  function formatMoney(value) {
    return "$" + Number(value || 0).toFixed(2);
  }

  function setModal(overlay, open) {
    if (!overlay) return;
    overlay.hidden = !open;
    document.body.classList.toggle("modal-open", !!open);
  }

  function getFiltered() {
    var needle = state.search.trim().toLowerCase();
    return templates.filter(function (item) {
      if (item.type !== state.type) return false;
      if (!needle) return true;
      return String(item.name || "").toLowerCase().indexOf(needle) !== -1;
    });
  }

  function getActionButton(action, label, svg) {
    return [
      '<button type="button" class="estimate-action-btn" data-action="', action, '" aria-label="', label, '" title="', label, '">',
      svg,
      "</button>"
    ].join("");
  }

  function updateHead() {
    if (state.type === "invoice") {
      tableHeadRow.innerHTML = "<th>Template Name</th><th>Amount</th><th>Action</th>";
      panelTitle.textContent = "Invoices";
    } else {
      tableHeadRow.innerHTML = "<th>Template Name</th><th>Action</th>";
      panelTitle.textContent = "Estimates";
    }
  }

  function renderPagination(totalPages) {
    var buttons = [];
    buttons.push('<button type="button" class="estimate-page-btn" data-page="1">First</button>');
    buttons.push('<button type="button" class="estimate-page-btn estimate-icon-page" data-page="' + Math.max(1, state.page - 1) + '" aria-label="Previous page"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"></path></svg></button>');
    var maxShown = Math.min(5, totalPages);
    for (var page = 1; page <= maxShown; page += 1) {
      buttons.push('<button type="button" class="estimate-page-btn' + (page === state.page ? " is-current" : "") + '" data-page="' + page + '">' + page + "</button>");
    }
    buttons.push('<button type="button" class="estimate-page-btn estimate-icon-page" data-page="' + Math.min(totalPages, state.page + 1) + '" aria-label="Next page"><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"></path></svg></button>');
    buttons.push('<button type="button" class="estimate-page-btn" data-page="' + totalPages + '">Last</button>');
    pagination.innerHTML = buttons.join("");
  }

  function renderTable() {
    updateHead();
    var filtered = getFiltered();
    var totalRows = filtered.length;
    var totalPages = Math.max(1, Math.ceil(totalRows / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;
    var start = (state.page - 1) * state.pageSize;
    var items = filtered.slice(start, start + state.pageSize);

    tableBody.innerHTML = items.map(function (item) {
      var amountCell = state.type === "invoice" ? "<td>" + formatMoney(item.amount) + "</td>" : "";
      return [
        '<tr data-id="', item.id, '">',
        '<td><a href="#" class="estimate-link" data-open-id="', item.id, '">', item.name, "</a></td>",
        amountCell,
        '<td><div class="estimate-actions">',
        getActionButton("edit", "Edit", window.uiIcon ? window.uiIcon("icon-pen") : ""),
        getActionButton("view", "Send / View", '<svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z"></path><circle cx="12" cy="12" r="2.8"></circle></svg>'),
        getActionButton("duplicate", "Duplicate", '<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 0 0-15.36-6.36"></path><path d="M3 4.5v5h5"></path><path d="M3 12a9 9 0 0 0 15.36 6.36"></path><path d="M21 19.5v-5h-5"></path></svg>'),
        getActionButton("delete", "Delete", window.uiIcon ? window.uiIcon("icon-trash") : ""),
        "</div></td>",
        "</tr>"
      ].join("");
    }).join("");

    emptyState.hidden = totalRows !== 0;
    resultsMeta.textContent = "rows out of " + totalRows;
    renderPagination(totalPages);
  }

  function openDeleteModal(item) {
    pendingDeleteId = item.id;
    deleteTitle.textContent = "Delete Template - " + item.name;
    setModal(deleteOverlay, true);
  }

  function closeDeleteModal() {
    pendingDeleteId = null;
    setModal(deleteOverlay, false);
  }

  var viewList = document.getElementById("viewList");
  var viewEditor = document.getElementById("viewEditor");

  function showList() {
    if (viewEditor) {
      viewEditor.hidden = true;
      viewEditor.innerHTML = "";
    }
    if (viewList) viewList.hidden = false;
    templates = window.TemplatesStore.getAll();
    renderTable();
  }

  function openTemplateInEditor(item) {
    if (!item || !viewEditor) return;
    var tplId = item.type === "estimate" ? "estimateEditorTpl" : "invoiceEditorTpl";
    var tpl = document.getElementById(tplId);
    if (!tpl) return;
    if (viewList) viewList.hidden = true;
    viewEditor.innerHTML = "";
    viewEditor.appendChild(tpl.content.cloneNode(true));
    viewEditor.hidden = false;
    var opts = {
      template: item,
      type: item.type,
      onBack: showList
    };
    if (item.type === "estimate") {
      if (window.initEstimateTemplateEditor) window.initEstimateTemplateEditor(opts);
    } else if (window.initInvoiceTemplateEditor) {
      window.initInvoiceTemplateEditor(opts);
    }
    if (window.initEditorMenus) window.initEditorMenus();
  }

  document.querySelectorAll("#typeTabs .estimate-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      document.querySelectorAll("#typeTabs .estimate-tab").forEach(function (btn) {
        btn.classList.remove("is-active");
      });
      this.classList.add("is-active");
      state.type = this.getAttribute("data-type");
      state.page = 1;
      renderTable();
    });
  });

  searchInput.addEventListener("input", function () {
    state.search = this.value;
    state.page = 1;
    renderTable();
  });

  pageSizeSelect.addEventListener("change", function () {
    state.pageSize = Number(this.value);
    state.page = 1;
    renderTable();
  });

  pagination.addEventListener("click", function (event) {
    var button = event.target.closest("[data-page]");
    if (!button) return;
    state.page = Number(button.getAttribute("data-page"));
    renderTable();
  });

  document.getElementById("createTemplateBtn").addEventListener("click", function (event) {
    event.preventDefault();
    var item = window.TemplatesStore.createBlank(state.type);
    templates = window.TemplatesStore.getAll();
    openTemplateInEditor(item, "edit");
  });

  tableBody.addEventListener("click", function (event) {
    var link = event.target.closest("a.estimate-link");
    if (link) {
      event.preventDefault();
      openTemplateInEditor(window.TemplatesStore.getById(link.getAttribute("data-open-id")), "edit");
      return;
    }

    var actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;
    var row = actionButton.closest("tr");
    var item = window.TemplatesStore.getById(row.getAttribute("data-id"));
    var action = actionButton.getAttribute("data-action");
    if (!item) return;

    if (action === "edit" || action === "view") {
      openTemplateInEditor(item, action);
      return;
    }

    if (action === "duplicate") {
      var clone = Object.assign({}, item, {
        id: window.TemplatesStore.nextId(),
        name: item.name + " Copy",
        products: (item.products || []).map(function (p) { return Object.assign({}, p); }),
        createdAt: Date.now()
      });
      window.TemplatesStore.upsert(clone);
      templates = window.TemplatesStore.getAll();
      renderTable();
      return;
    }

    if (action === "delete") openDeleteModal(item);
  });

  document.getElementById("deleteModalClose").addEventListener("click", closeDeleteModal);
  document.getElementById("deleteModalCancel").addEventListener("click", closeDeleteModal);
  deleteOverlay.addEventListener("click", function (event) {
    if (event.target === deleteOverlay) closeDeleteModal();
  });
  document.getElementById("deleteModalConfirm").addEventListener("click", function () {
    if (pendingDeleteId == null) return;
    window.TemplatesStore.remove(pendingDeleteId);
    templates = window.TemplatesStore.getAll();
    closeDeleteModal();
    renderTable();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && deleteOverlay && !deleteOverlay.hidden) closeDeleteModal();
  });

  renderTable();
}());


/* invoices.js — create_invoice page only */
(function () {
  if (!document.body.classList.contains('ep-create-invoice')) return;
/* ===== Invoices Store ===== */
window.InvoicesStore = (function () {
  var KEY = "stitch_gb_invoices";

  var seed = [
    { name: "New Invoice", customer: "Olivia Rhye", handle: "@olivia", value: 20, status: "draft", paymentMode: "card" },
    { name: "Website Invoice", customer: "Phoenix Baker", handle: "@phoenix", value: 450, status: "due", paymentMode: "bank" },
    { name: "Retainers", customer: "Lana Steiner", handle: "@lana", value: 1200, status: "overdue", paymentMode: "card" },
    { name: "Support Plan", customer: "Candice Wu", handle: "@candice", value: 880, status: "paid", paymentMode: "cash" },
    { name: "Brand Package", customer: "Natali Craig", handle: "@natali", value: 650, status: "due", paymentMode: "cheque" },
    { name: "Q2 Billing", customer: "Drew Cano", handle: "@drew", value: 320, status: "draft", paymentMode: "card" },
    { name: "Annual Package", customer: "Orlando Diggs", handle: "@orlando", value: 1500, status: "paid", paymentMode: "bank" },
    { name: "Consulting", customer: "Alec Whitten", handle: "@alec", value: 410, status: "overdue", paymentMode: "card" },
    { name: "Design Sprint", customer: "John's Company", handle: "@john", value: 980, status: "due", paymentMode: "card" },
    { name: "SEO Audit", customer: "Acme LLC", handle: "@acme", value: 275, status: "draft", paymentMode: "cash" }
  ];

  function buildSeed() {
    var list = [];
    for (var i = 0; i < 48; i += 1) {
      var base = seed[i % seed.length];
      var d = new Date("2026-01-06T00:00:00");
      d.setDate(d.getDate() + i * 2);
      var due = new Date(d);
      due.setDate(due.getDate() + 14);
      if (base.status === "overdue") {
        due = new Date("2026-07-01T00:00:00");
        due.setDate(due.getDate() - (i % 10));
      } else if (base.status === "due") {
        due = new Date("2026-08-09T00:00:00");
        due.setDate(due.getDate() + 3 + (i % 12));
      }
      list.push({
        id: i + 1,
        name: i < 5 ? base.name : base.name + " " + (i + 1),
        number: "INV-" + String(4 + i).padStart(6, "0"),
        invoiceNum: String(4 + i).padStart(6, "0"),
        customer: base.customer,
        handle: base.handle,
        issueDate: d.toISOString().slice(0, 10),
        dueDate: due.toISOString().slice(0, 10),
        value: base.value + (i % 6) * 15,
        status: base.status,
        paymentMode: base.paymentMode,
        companyName: "ABC 3",
        companyEmail: "riley.bennett@corporate.net",
        companyPhone: "+13141236547",
        companyAddress: "Oxford Street United Kingdom",
        products: [
          { name: "Product 1", price: 20, qty: 2, tax: 0 },
          { name: "Product 1", price: 20, qty: 2, tax: 0 },
          { name: "Product 1", price: 20, qty: 2, tax: 0 }
        ],
        notes: "",
        lateFees: false,
        tipping: false,
        tipValue: 0
      });
    }
    return list;
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch (e) {}
    var list = buildSeed();
    save(list);
    return list;
  }

  function save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function getAll() { return load(); }

  function getById(id) {
    id = Number(id);
    return load().find(function (item) { return item.id === id; }) || null;
  }

  function upsert(item) {
    var list = load();
    var idx = list.findIndex(function (entry) { return entry.id === item.id; });
    if (idx >= 0) list[idx] = item;
    else list.unshift(item);
    save(list);
    return item;
  }

  function remove(id) {
    id = Number(id);
    save(load().filter(function (item) { return item.id !== id; }));
  }

  function setStatus(id, status) {
    var item = getById(id);
    if (!item) return null;
    item.status = status;
    return upsert(item);
  }

  function nextId() {
    var max = 0;
    load().forEach(function (item) { if (item.id > max) max = item.id; });
    return max + 1;
  }

  return { getAll: getAll, getById: getById, upsert: upsert, remove: remove, setStatus: setStatus, nextId: nextId, save: save };
}());


/* ===== View Router ===== */
(function () {
  var viewList = document.getElementById("viewList");
  var viewEditor = document.getElementById("viewEditor");
  var viewPreview = document.getElementById("viewPreview");

  function showView(name) {
    viewList.hidden = name !== "list";
    viewEditor.hidden = name !== "editor";
    if (viewPreview) viewPreview.hidden = name !== "preview";
    document.body.classList.toggle("estimate-preview-page", name === "preview");
    document.body.classList.remove("modal-open");
    window.scrollTo(0, 0);
  }

  function setModal(overlay, open) {
    if (!overlay) return;
    overlay.hidden = !open;
    document.body.classList.toggle("modal-open", !!open);
  }

  window.InvoicesApp = {
    showList: function () { showView("list"); if (window.refreshInvoicesList) window.refreshInvoicesList(); },
    showEditor: function () { showView("editor"); },
    showPreview: function () { showView("preview"); },
    setModal: setModal
  };
  showView("list");
}());


/* ===== Invoices List ===== */
(function () {
  var invoices = window.InvoicesStore.getAll();
  var summaryOrder = ["draft", "due", "overdue", "paid"];
  var pendingDeleteId = null;

  var state = {
    status: "all",
    paymentMode: "all",
    search: "",
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    page: 1,
    pageSize: Number(document.getElementById("pageSizeSelect").value)
  };

  var summaryCards = document.getElementById("summaryCards");
  var searchInput = document.getElementById("searchInput");
  var startDateInput = document.getElementById("startDate");
  var endDateInput = document.getElementById("endDate");
  var pageSizeSelect = document.getElementById("pageSizeSelect");
  var tableBody = document.getElementById("invoiceTableBody");
  var emptyState = document.getElementById("emptyState");
  var resultsMeta = document.getElementById("resultsMeta");
  var pagination = document.getElementById("pagination");
  var filterOverlay = document.getElementById("filterModalOverlay");
  var filterStatus = document.getElementById("filterStatus");
  var filterPaymentMode = document.getElementById("filterPaymentMode");
  var deleteOverlay = document.getElementById("deleteModalOverlay");
  var deleteTitle = document.getElementById("deleteModalTitle");

  function persist() { window.InvoicesStore.save(invoices); }

  function formatMoney(value) {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2
    }).format(value);
  }

  function formatShortDate(value) {
    var parts = String(value || "").split("-");
    if (parts.length !== 3) return value || "-";
    return [parts[2], parts[1], parts[0]].join("-");
  }

  function getInitials(name) {
    return String(name || "?").split(" ").slice(0, 2).map(function (part) { return part.charAt(0); }).join("").toUpperCase();
  }

  function getAvatarTone(name) {
    var tones = ["tone-gold", "tone-lilac", "tone-peach", "tone-sage", "tone-sky"];
    return tones[(name || "").length % tones.length];
  }

  function daysUntilDue(dueDate) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var due = new Date(dueDate + "T00:00:00");
    return Math.max(0, Math.round((due - today) / 86400000));
  }

  function getStatusBadge(item) {
    if (item.status === "due") {
      return '<span class="estimate-badge badge-sent badge-due">Due in ' + daysUntilDue(item.dueDate) + " days</span>";
    }
    var label = item.status.charAt(0).toUpperCase() + item.status.slice(1);
    return '<span class="estimate-badge badge-' + item.status + '">' + label + "</span>";
  }

  function getSummaryData() {
    return summaryOrder.map(function (status) {
      var items = invoices.filter(function (item) { return item.status === status; });
      return {
        status: status,
        count: items.length,
        total: items.reduce(function (sum, item) { return sum + Number(item.value || 0); }, 0)
      };
    });
  }

  function renderSummary() {
    var labels = { draft: "Draft", due: "Due", overdue: "Overdue", paid: "Paid" };
    summaryCards.innerHTML = getSummaryData().map(function (item) {
      return [
        '<article class="summary-card">',
        '<div class="summary-label">', item.count, " ", labels[item.status], "</div>",
        '<div class="summary-value">', formatMoney(item.total), "</div>",
        "</article>"
      ].join("");
    }).join("");
  }

  function matchesFilters(item) {
    var statusMatch = state.status === "all" || item.status === state.status;
    var modeMatch = state.paymentMode === "all" || item.paymentMode === state.paymentMode;
    var startMatch = !state.startDate || item.issueDate >= state.startDate;
    var endMatch = !state.endDate || item.issueDate <= state.endDate;
    var needle = state.search.trim().toLowerCase();
    var searchMatch = !needle || [
      item.name, item.number, item.customer, item.handle, item.status, item.paymentMode
    ].join(" ").toLowerCase().indexOf(needle) !== -1;
    return statusMatch && modeMatch && startMatch && endMatch && searchMatch;
  }

  function getFiltered() { return invoices.filter(matchesFilters); }

  function getActionButton(action, label, svg, extraClass) {
    return [
      '<button type="button" class="estimate-action-btn', extraClass ? " " + extraClass : "", '" data-action="', action, '" aria-label="', label, '" title="', label, '">',
      svg,
      "</button>"
    ].join("");
  }

  var ICONS = {
    edit: window.uiIcon ? window.uiIcon("icon-pen") : "",
    view: '<svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z"></path><circle cx="12" cy="12" r="2.8"></circle></svg>',
    download: '<svg viewBox="0 0 24 24"><path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path></svg>',
    copy: '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="10" height="10" rx="2"></rect><path d="M15 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path></svg>',
    percent: '<svg viewBox="0 0 24 24"><path d="M19 5 5 19"></path><circle cx="7.5" cy="7.5" r="2.5"></circle><circle cx="16.5" cy="16.5" r="2.5"></circle></svg>',
    save: window.uiIcon ? window.uiIcon("icon-save") : "",
    delete: window.uiIcon ? window.uiIcon("icon-trash") : ""
  };

  function getRowActions(item) {
    if (item.status === "draft") {
      return [
        getActionButton("edit", "Edit", ICONS.edit),
        getActionButton("copy", "Duplicate", ICONS.copy),
        getActionButton("save", "Save", ICONS.save),
        getActionButton("delete", "Delete", ICONS.delete)
      ].join("");
    }
    return [
      getActionButton("edit", "Edit", ICONS.edit),
      getActionButton("view", "View", ICONS.view),
      getActionButton("download", "Download", ICONS.download),
      getActionButton("copy", "Duplicate", ICONS.copy),
      getActionButton("percent", "Adjust", ICONS.percent),
      getActionButton("save", "Save", ICONS.save),
      getActionButton("delete", "Delete", ICONS.delete)
    ].join("");
  }

  function renderTable() {
    var filtered = getFiltered();
    var totalRows = filtered.length;
    var totalPages = Math.max(1, Math.ceil(totalRows / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;
    var start = (state.page - 1) * state.pageSize;
    var items = filtered.slice(start, start + state.pageSize);

    tableBody.innerHTML = items.map(function (item) {
      return [
        '<tr data-id="', item.id, '">',
        '<td><div class="estimate-customer-cell"><span class="estimate-avatar ', getAvatarTone(item.customer), '">', getInitials(item.customer), '</span><div><div class="estimate-customer-name">', item.customer, '</div><div class="estimate-customer-handle">', item.handle || "", "</div></div></div></td>",
        '<td><a href="#" class="estimate-link" data-open-id="', item.id, '">', item.name, "</a></td>",
        "<td>", item.number, "</td>",
        "<td>", formatShortDate(item.issueDate), "</td>",
        "<td>", formatMoney(item.value), "</td>",
        "<td>", getStatusBadge(item), "</td>",
        '<td><div class="estimate-actions">', getRowActions(item), "</div></td>",
        "</tr>"
      ].join("");
    }).join("");

    emptyState.hidden = totalRows !== 0;
    resultsMeta.textContent = "rows out of " + totalRows;
    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    var buttons = [];
    buttons.push('<button type="button" class="estimate-page-btn" data-page="1">First</button>');
    buttons.push('<button type="button" class="estimate-page-btn estimate-icon-page" data-page="' + Math.max(1, state.page - 1) + '" aria-label="Previous page"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"></path></svg></button>');
    for (var page = 1; page <= totalPages; page += 1) {
      buttons.push('<button type="button" class="estimate-page-btn' + (page === state.page ? " is-current" : "") + '" data-page="' + page + '">' + page + "</button>");
    }
    buttons.push('<button type="button" class="estimate-page-btn estimate-icon-page" data-page="' + Math.min(totalPages, state.page + 1) + '" aria-label="Next page"><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"></path></svg></button>');
    buttons.push('<button type="button" class="estimate-page-btn" data-page="' + totalPages + '">Last</button>');
    pagination.innerHTML = buttons.join("");
  }

  function openDeleteModal(item) {
    pendingDeleteId = item.id;
    deleteTitle.textContent = "Delete Invoice - " + item.number;
    window.InvoicesApp.setModal(deleteOverlay, true);
  }

  function closeDeleteModal() {
    pendingDeleteId = null;
    window.InvoicesApp.setModal(deleteOverlay, false);
  }

  function openFilterModal() {
    filterStatus.value = state.status;
    filterPaymentMode.value = state.paymentMode;
    window.InvoicesApp.setModal(filterOverlay, true);
  }

  function closeFilterModal() {
    window.InvoicesApp.setModal(filterOverlay, false);
  }

  function render() {
    renderSummary();
    renderTable();
  }

  function bindEvents() {
    searchInput.addEventListener("input", function () {
      state.search = this.value;
      state.page = 1;
      renderTable();
    });

    startDateInput.addEventListener("change", function () {
      state.startDate = this.value;
      state.page = 1;
      renderTable();
    });

    endDateInput.addEventListener("change", function () {
      state.endDate = this.value;
      state.page = 1;
      renderTable();
    });

    pageSizeSelect.addEventListener("change", function () {
      state.pageSize = Number(this.value);
      state.page = 1;
      renderTable();
    });

    pagination.addEventListener("click", function (event) {
      var button = event.target.closest("[data-page]");
      if (!button) return;
      state.page = Number(button.getAttribute("data-page"));
      renderTable();
    });

    document.getElementById("openFilterBtn").addEventListener("click", openFilterModal);
    document.getElementById("filterModalClose").addEventListener("click", closeFilterModal);
    filterOverlay.addEventListener("click", function (event) {
      if (event.target === filterOverlay) closeFilterModal();
    });
    document.getElementById("filterClearAll").addEventListener("click", function () {
      filterStatus.value = "all";
      filterPaymentMode.value = "all";
    });
    document.getElementById("filterApply").addEventListener("click", function () {
      state.status = filterStatus.value;
      state.paymentMode = filterPaymentMode.value;
      state.page = 1;
      closeFilterModal();
      renderTable();
    });

    document.getElementById("exportBtn").addEventListener("click", function () {
      this.setAttribute("title", "Exported");
      setTimeout(function () { document.getElementById("exportBtn").setAttribute("title", "Export"); }, 1200);
    });

    var closeListGateway = document.getElementById("closeListGateway");
    if (closeListGateway) {
      closeListGateway.addEventListener("click", function () {
        document.getElementById("listGatewayCard").hidden = true;
      });
    }

    tableBody.addEventListener("click", function (event) {
      var link = event.target.closest("a.estimate-link");
      if (link) {
        event.preventDefault();
        window.openInvoiceEditor(Number(link.getAttribute("data-open-id")), "edit");
        return;
      }

      var actionButton = event.target.closest("[data-action]");
      if (!actionButton) return;
      var row = actionButton.closest("tr");
      var itemId = Number(row.getAttribute("data-id"));
      var item = invoices.find(function (entry) { return entry.id === itemId; });
      var action = actionButton.getAttribute("data-action");
      if (!item) return;

      if (action === "edit" || action === "view") {
        window.openInvoiceEditor(item.id, action);
        return;
      }

      if (action === "download") {
        window.openInvoiceEditor(item.id, "view");
        return;
      }

      if (action === "copy") {
        var clone = Object.assign({}, item, {
          id: window.InvoicesStore.nextId(),
          number: "INV-" + String(Math.floor(Math.random() * 900000) + 100000),
          status: "draft"
        });
        clone.invoiceNum = clone.number.replace(/^INV-/, "");
        clone.products = (item.products || []).map(function (p) { return Object.assign({}, p); });
        invoices.unshift(clone);
        persist();
        render();
        return;
      }

      if (action === "percent") {
        var cycle = { draft: "due", due: "overdue", overdue: "paid", paid: "draft" };
        item.status = cycle[item.status] || "draft";
        persist();
        render();
        return;
      }

      if (action === "save") {
        actionButton.classList.add("is-flash");
        setTimeout(function () { actionButton.classList.remove("is-flash"); }, 800);
        return;
      }

      if (action === "delete") {
        openDeleteModal(item);
      }
    });

    document.getElementById("deleteModalClose").addEventListener("click", closeDeleteModal);
    document.getElementById("deleteModalCancel").addEventListener("click", closeDeleteModal);
    deleteOverlay.addEventListener("click", function (event) {
      if (event.target === deleteOverlay) closeDeleteModal();
    });
    document.getElementById("deleteModalConfirm").addEventListener("click", function () {
      if (pendingDeleteId == null) return;
      invoices = invoices.filter(function (entry) { return entry.id !== pendingDeleteId; });
      window.InvoicesStore.remove(pendingDeleteId);
      closeDeleteModal();
      render();
    });

    document.getElementById("createInvoiceBtn").addEventListener("click", function (event) {
      event.preventDefault();
      window.openInvoiceEditor(null, "create");
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (filterOverlay && !filterOverlay.hidden) closeFilterModal();
      if (deleteOverlay && !deleteOverlay.hidden) closeDeleteModal();
    });
  }

  window.refreshInvoicesList = function () {
    invoices = window.InvoicesStore.getAll();
    render();
  };

  bindEvents();
  render();
}());


/* ===== Invoice Editor ===== */
(function () {
  var productRows = document.getElementById("productRows");
  var previewRows = document.getElementById("previewRows");
  var companyName = document.getElementById("companyName");
  var companyEmail = document.getElementById("companyEmail");
  var companyPhone = document.getElementById("companyPhone");
  var companyAddress = document.getElementById("companyAddress");
  var invoiceNumber = document.getElementById("invoiceNumber");
  var customerName = document.getElementById("customerName");
  var discountValue = document.getElementById("discountValue");
  var taxValue = document.getElementById("taxValue");
  var issueDateInput = document.getElementById("issueDateInput");
  var dueDateInput = document.getElementById("dueDateInput");
  var discountPrefix = document.getElementById("discountPrefix");
  var saveButton = document.getElementById("saveButton");
  var sendButton = document.getElementById("sendButton");
  var backLink = document.getElementById("editorBackLink");
  var topbarMenu = document.getElementById("topbarMenu");
  var topbarMenuTrigger = document.getElementById("topbarMenuTrigger");
  var topbarMenuDropdown = document.getElementById("topbarMenuDropdown");
  var sendModalOverlay = document.getElementById("sendModalOverlay");
  var sendModalClose = document.getElementById("sendModalClose");
  var sendModalCancel = document.getElementById("sendModalCancel");
  var sendModalSubmit = document.getElementById("sendModalSubmit");
  var sendInvoiceName = document.getElementById("sendInvoiceName");
  var sendAsRadios = document.querySelectorAll('input[name="sendAs"]');
  var sendEmailField = document.getElementById("sendEmailField");
  var sendCcField = document.getElementById("sendCcField");
  var sendBccField = document.getElementById("sendBccField");
  var sendPhoneField = document.getElementById("sendPhoneField");
  var toggleCcButton = document.getElementById("toggleCcButton");
  var toggleBccButton = document.getElementById("toggleBccButton");
  var termsCheck = document.getElementById("termsCheck");
  var notesEditor = document.getElementById("notesEditor");
  var attachmentCheck = document.getElementById("attachmentCheck");
  var uploadPanel = document.getElementById("uploadPanel");
  var attachmentInput = document.getElementById("attachmentInput");
  var uploadFiles = document.getElementById("uploadFiles");
  var uploadPreviewGrid = document.getElementById("uploadPreviewGrid");
  var editorImageInput = document.getElementById("editorImageInput");
  var imageInsertButton = document.getElementById("imageInsertButton");
  var fontNameSelect = document.getElementById("fontNameSelect");
  var formatBlockSelect = document.getElementById("formatBlockSelect");
  var fontSizeSelect = document.getElementById("fontSizeSelect");
  var lineHeightSelect = document.getElementById("lineHeightSelect");
  var businessEditToggle = document.getElementById("businessEditToggle");
  var businessEditGrid = document.querySelector("#viewEditor .edit-grid");
  var templateName = document.getElementById("templateName");
  var templateEditButton = document.getElementById("templateEditButton");
  var paymentScheduleButton = document.getElementById("paymentScheduleButton");
  var lateFeesCheck = document.getElementById("lateFeesCheck");
  var lateFeesPanel = document.getElementById("lateFeesPanel");
  var tippingCheck = document.getElementById("tippingCheck");
  var tippingRow = document.getElementById("tippingRow");
  var tippingValue = document.getElementById("tippingValue");
  var closeGateway = document.getElementById("closeGateway");
  var dateTriggers = document.querySelectorAll("#viewEditor .date-trigger");
  var currentInvoiceId = null;
  var currentInvoiceStatus = "draft";
  var activeInvoice = null;
  var savedRange = null;
  var editingTemplateId = null;
  var creatingAsTemplate = false;

  if (backLink) {
    backLink.addEventListener("click", function (event) {
      event.preventDefault();
      var params = new URLSearchParams(window.location.search);
      if (params.get("asTemplate") === "1" || params.get("templateId") || editingTemplateId || creatingAsTemplate) {
        window.location.href = "templates.html";
        return;
      }
      window.InvoicesApp.showList();
    });
  }

  function money(value) {
    return "$" + Number(value || 0).toFixed(2);
  }

  function formatDate(value) {
    if (!value) return "";
    return new Date(value + "T00:00:00").toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric"
    });
  }

  function addRow(defaults) {
    var template = document.getElementById("productRowTemplate");
    var row = template.content.firstElementChild.cloneNode(true);
    row.querySelector(".item-name").value = defaults.name;
    row.querySelector(".item-price").value = defaults.price;
    row.querySelector(".item-qty").value = defaults.qty;
    row.querySelector(".item-tax").value = defaults.tax;

    row.querySelector(".add-row").addEventListener("click", function () {
      addRow({ name: "", price: 0, qty: 0, tax: 0 });
      updateInvoice();
    });
    row.querySelector(".remove-row").addEventListener("click", function () {
      if (productRows.children.length > 1) {
        row.remove();
        updateInvoice();
      }
    });
    row.querySelector(".qty-up").addEventListener("click", function () {
      var qtyInput = row.querySelector(".item-qty");
      qtyInput.value = Number(qtyInput.value || 0) + 1;
      updateInvoice();
    });
    row.querySelector(".qty-down").addEventListener("click", function () {
      var qtyInput = row.querySelector(".item-qty");
      qtyInput.value = Math.max(0, Number(qtyInput.value || 0) - 1);
      updateInvoice();
    });
    row.querySelectorAll("input").forEach(function (input) {
      input.addEventListener("input", updateInvoice);
    });
    productRows.appendChild(row);
  }

  function getRows() {
    return Array.prototype.slice.call(productRows.querySelectorAll(".product-row")).map(function (row) {
      var name = row.querySelector(".item-name").value || "Product";
      var price = Number(row.querySelector(".item-price").value || 0);
      var qty = Number(row.querySelector(".item-qty").value || 0);
      var tax = Number(row.querySelector(".item-tax").value || 0);
      return { name: name, price: price, qty: qty, tax: tax, subtotal: price * qty };
    });
  }

  function updateBusinessPreview() {
    document.getElementById("companyPreview").textContent = companyName.value || "ABC 3";
    document.getElementById("emailPreview").textContent = companyEmail.value || "-";
    document.getElementById("phonePreview").textContent = companyPhone.value || "-";
    document.getElementById("addressPreview").textContent = companyAddress.value || "-";
    document.getElementById("previewCompanyMeta").innerHTML = [
      companyName.value || "ABC 3",
      companyPhone.value || "-",
      "Oxford Street",
      "United Kingdom"
    ].join("<br>");
    document.getElementById("previewBilledTo").innerHTML = [
      customerName.value === "Select customer" ? "John's Company" : customerName.value,
      "John Doe 1234 Main Street Austin, Texas 54321 US"
    ].join("<br>");
    document.getElementById("previewInvoiceNumber").textContent = "INV-" + String(invoiceNumber.value || "2");
  }

  function updateInvoice() {
    var rows = getRows();
    var subtotal = 0;
    var itemTaxTotal = 0;
    var discountMode = document.querySelector('input[name="discountMode"]:checked').value;
    var extraTaxPercent = Number(taxValue.value || 0);
    previewRows.innerHTML = "";

    rows.forEach(function (row) {
      subtotal += row.subtotal;
      itemTaxTotal += row.subtotal * row.tax / 100;
      var tr = document.createElement("tr");
      tr.innerHTML = [
        "<td>" + row.name + "</td>",
        "<td>" + money(row.price) + "</td>",
        "<td>" + row.qty + "</td>",
        "<td>" + row.tax + "%</td>",
        "<td class='text-right'>" + money(row.subtotal) + "</td>"
      ].join("");
      previewRows.appendChild(tr);
    });

    var extraTaxAmount = subtotal * extraTaxPercent / 100;
    var totalTax = itemTaxTotal + extraTaxAmount;
    var discountAmount = discountMode === "percent"
      ? subtotal * Number(discountValue.value || 0) / 100
      : Number(discountValue.value || 0);
    var tip = tippingCheck && tippingCheck.checked ? Number(tippingValue.value || 0) : 0;
    var amountDue = Math.max(0, subtotal + totalTax - discountAmount + tip);

    document.getElementById("subtotalOutput").textContent = money(subtotal);
    document.getElementById("amountDueOutput").textContent = money(amountDue);
    document.getElementById("previewSubtotal").textContent = money(subtotal);
    document.getElementById("previewTax").textContent = money(totalTax);
    document.getElementById("previewAmountDue").textContent = money(amountDue);
    document.getElementById("previewIssueDate").textContent = formatDate(issueDateInput.value) || "August 4, 2026";
    document.getElementById("previewDueDate").textContent = formatDate(dueDateInput.value) || "August 18, 2026";
    document.getElementById("payBadge").textContent = "Pay " + money(amountDue);
    updateBusinessPreview();
  }

  function calcAmountDue() {
    var rows = getRows();
    var subtotal = 0;
    var itemTaxTotal = 0;
    rows.forEach(function (row) {
      subtotal += row.subtotal;
      itemTaxTotal += row.subtotal * row.tax / 100;
    });
    var discountMode = document.querySelector('input[name="discountMode"]:checked').value;
    var extraTax = subtotal * Number(taxValue.value || 0) / 100;
    var discountAmount = discountMode === "percent"
      ? subtotal * Number(discountValue.value || 0) / 100
      : Number(discountValue.value || 0);
    var tip = tippingCheck && tippingCheck.checked ? Number(tippingValue.value || 0) : 0;
    return Math.max(0, subtotal + itemTaxTotal + extraTax - discountAmount + tip);
  }

  function getHandle(name) {
    var clean = String(name || "customer").toLowerCase().replace(/[^a-z0-9]+/g, "");
    return "@" + (clean.slice(0, 12) || "customer");
  }

  function collectInvoiceData(statusOverride) {
    var num = String(invoiceNumber.value || "2");
    var customer = customerName.value || "Select customer";
    if (customer === "Select customer") customer = (activeInvoice && activeInvoice.customer) || "New Customer";
    return {
      id: currentInvoiceId || window.InvoicesStore.nextId(),
      name: (templateName.textContent || "").trim() || "New Invoice",
      number: "INV-" + num,
      invoiceNum: num,
      customer: customer,
      handle: (activeInvoice && activeInvoice.handle) || getHandle(customer),
      issueDate: issueDateInput.value || "2026-08-04",
      dueDate: dueDateInput.value || "2026-08-18",
      value: Number(calcAmountDue().toFixed(2)),
      status: statusOverride || currentInvoiceStatus || "draft",
      paymentMode: (activeInvoice && activeInvoice.paymentMode) || "card",
      companyName: companyName.value || "ABC 3",
      companyEmail: companyEmail.value || "",
      companyPhone: companyPhone.value || "",
      companyAddress: companyAddress.value || "",
      products: getRows(),
      notes: notesEditor.innerHTML || "",
      lateFees: !!(lateFeesCheck && lateFeesCheck.checked),
      tipping: !!(tippingCheck && tippingCheck.checked),
      tipValue: Number(tippingValue.value || 0)
    };
  }

  function saveInvoice(statusOverride) {
    var data = collectInvoiceData(statusOverride);
    window.InvoicesStore.upsert(data);
    currentInvoiceId = data.id;
    currentInvoiceStatus = data.status;
    activeInvoice = data;

    if (window.TemplatesStore && (creatingAsTemplate || editingTemplateId)) {
      var products = data.products || [];
      var tpl = {
        id: editingTemplateId || window.TemplatesStore.nextId(),
        type: "invoice",
        name: data.name,
        companyName: data.companyName,
        companyEmail: data.companyEmail,
        companyPhone: data.companyPhone,
        companyAddress: data.companyAddress,
        customer: data.customer,
        invoiceNum: data.invoiceNum,
        issueDate: data.issueDate,
        dueDate: data.dueDate,
        amount: data.value,
        products: products.map(function (p) { return Object.assign({}, p); }),
        notes: data.notes || "",
        createdAt: Date.now()
      };
      if (editingTemplateId) {
        var existing = window.TemplatesStore.getById(editingTemplateId);
        if (existing && existing.createdAt) tpl.createdAt = existing.createdAt;
      }
      window.TemplatesStore.upsert(tpl);
      editingTemplateId = tpl.id;
      creatingAsTemplate = false;
    }
    return data;
  }

  function fillCustomerSelect(name) {
    if (!name) return;
    var found = false;
    Array.prototype.slice.call(customerName.options).forEach(function (opt) {
      if (opt.value === name || opt.textContent === name) found = true;
    });
    if (!found) {
      var opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      customerName.appendChild(opt);
    }
    customerName.value = name;
  }

  function loadInvoiceIntoForm(item) {
    if (!item) return;
    templateName.textContent = item.name || "Invoice Name";
    companyName.value = item.companyName || companyName.value;
    companyEmail.value = item.companyEmail || companyEmail.value;
    companyPhone.value = item.companyPhone || companyPhone.value;
    companyAddress.value = item.companyAddress || companyAddress.value;
    invoiceNumber.value = item.invoiceNum || String(item.number || "").replace(/^INV-/, "") || invoiceNumber.value;
    fillCustomerSelect(item.customer);
    if (item.issueDate) issueDateInput.value = item.issueDate;
    if (item.dueDate) dueDateInput.value = item.dueDate;
    if (item.notes) notesEditor.innerHTML = item.notes;
    if (lateFeesCheck) {
      lateFeesCheck.checked = !!item.lateFees;
      lateFeesPanel.hidden = !lateFeesCheck.checked;
    }
    if (tippingCheck) {
      tippingCheck.checked = !!item.tipping;
      tippingRow.hidden = !tippingCheck.checked;
      tippingValue.value = item.tipValue || 0;
    }
    productRows.innerHTML = "";
    var products = item.products && item.products.length
      ? item.products
      : [{ name: "Product 1", price: 20, qty: 2, tax: 0 }];
    products.forEach(function (row) {
      addRow({ name: row.name, price: row.price, qty: row.qty, tax: row.tax });
    });
  }

  function renderFiles() {
    uploadFiles.innerHTML = "";
    uploadPreviewGrid.innerHTML = "";
    Array.prototype.slice.call(attachmentInput.files || []).forEach(function (file) {
      var item = document.createElement("div");
      item.className = "upload-file";
      item.textContent = file.name;
      uploadFiles.appendChild(item);
      if (file.type.indexOf("image/") === 0) {
        var reader = new FileReader();
        reader.onload = function (event) {
          var preview = document.createElement("div");
          preview.className = "upload-preview-item";
          preview.innerHTML = "<img src='" + event.target.result + "' alt='Preview'><div class='upload-preview-name'>" + file.name + "</div>";
          uploadPreviewGrid.appendChild(preview);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function saveSelection() {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) savedRange = selection.getRangeAt(0).cloneRange();
  }

  function restoreSelection() {
    if (!savedRange) { notesEditor.focus(); return; }
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(savedRange);
  }

  function exec(command, value) {
    restoreSelection();
    document.execCommand(command, false, value || null);
    saveSelection();
    notesEditor.focus();
  }

  function openSendModal() {
    sendInvoiceName.value = templateName.textContent.trim() || "New Invoice";
    updateSendModalFields();
    window.InvoicesApp.setModal(sendModalOverlay, true);
  }

  function closeSendModal() {
    window.InvoicesApp.setModal(sendModalOverlay, false);
  }

  function openTopbarMenu() {
    topbarMenuDropdown.hidden = false;
    topbarMenuTrigger.setAttribute("aria-expanded", "true");
  }

  function closeTopbarMenu() {
    topbarMenuDropdown.hidden = true;
    topbarMenuTrigger.setAttribute("aria-expanded", "false");
  }

  function getSelectedSendMode() {
    var checked = document.querySelector('input[name="sendAs"]:checked');
    return checked ? checked.value : "email-text";
  }

  function setFieldVisibility(element, isVisible) {
    if (!element) return;
    element.classList.toggle("is-collapsed", !isVisible);
  }

  function setPillActive(button, isActive) {
    if (!button) return;
    button.classList.toggle("is-active", isActive);
  }

  function updateSendModalFields() {
    var mode = getSelectedSendMode();
    var showEmail = mode === "email" || mode === "email-text";
    var showPhone = mode === "text" || mode === "email-text";
    setFieldVisibility(sendEmailField, showEmail);
    setFieldVisibility(sendPhoneField, showPhone);
    if (!showEmail) {
      setFieldVisibility(sendCcField, false);
      setFieldVisibility(sendBccField, false);
      setPillActive(toggleCcButton, false);
      setPillActive(toggleBccButton, false);
    }
  }

  saveButton.addEventListener("click", function () {
    saveInvoice(currentInvoiceStatus || "draft");
    saveButton.querySelector("span").textContent = "Saved";
    setTimeout(function () { saveButton.querySelector("span").textContent = "Save"; }, 1500);
  });

  sendButton.addEventListener("click", openSendModal);

  if (sendModalClose) sendModalClose.addEventListener("click", closeSendModal);
  if (sendModalCancel) sendModalCancel.addEventListener("click", closeSendModal);
  if (sendModalOverlay) {
    sendModalOverlay.addEventListener("click", function (event) {
      if (event.target === sendModalOverlay) closeSendModal();
    });
  }
  if (sendModalSubmit) {
    sendModalSubmit.addEventListener("click", function () {
      var data = saveInvoice("due");
      closeSendModal();
      window.openInvoicePreview(data.id);
    });
  }

  topbarMenuTrigger.addEventListener("click", function (event) {
    event.stopPropagation();
    if (topbarMenuDropdown.hidden) openTopbarMenu();
    else closeTopbarMenu();
  });

  document.getElementById("previewAction").addEventListener("click", function () {
    closeTopbarMenu();
    var data = saveInvoice(currentInvoiceStatus || "draft");
    window.openInvoicePreview(data.id);
  });
  document.getElementById("recordPaymentAction").addEventListener("click", function () {
    closeTopbarMenu();
    saveInvoice("paid");
    saveButton.querySelector("span").textContent = "Paid";
    setTimeout(function () { saveButton.querySelector("span").textContent = "Save"; }, 1500);
  });
  var templatePickerOverlay = document.getElementById("templatePickerOverlay");
  var templatePickerGrid = document.getElementById("templatePickerGrid");
  var templatePickerSearch = document.getElementById("templatePickerSearch");
  var templatePickerSort = document.getElementById("templatePickerSort");

  function closeTemplatePicker() {
    window.InvoicesApp.setModal(templatePickerOverlay, false);
  }

  function applyTemplateToEditor(tpl) {
    if (!tpl) return;
    templateName.textContent = tpl.name || "Invoice Name";
    companyName.value = tpl.companyName || companyName.value;
    companyEmail.value = tpl.companyEmail || companyEmail.value;
    companyPhone.value = tpl.companyPhone || companyPhone.value;
    companyAddress.value = tpl.companyAddress || companyAddress.value;
    if (tpl.invoiceNum) invoiceNumber.value = tpl.invoiceNum;
    fillCustomerSelect(tpl.customer || "John's Company");
    if (tpl.issueDate) issueDateInput.value = tpl.issueDate;
    if (tpl.dueDate) dueDateInput.value = tpl.dueDate;
    notesEditor.innerHTML = tpl.notes || "";
    productRows.innerHTML = "";
    var products = tpl.products && tpl.products.length
      ? tpl.products
      : [{ name: "Product 1", price: 20, qty: 1, tax: 0 }];
    products.forEach(function (row) {
      addRow({ name: row.name, price: row.price, qty: row.qty, tax: row.tax });
    });
    updateInvoice();
  }

  function getPickerTemplates() {
    if (!window.TemplatesStore) return [];
    var list = window.TemplatesStore.getByType("invoice").slice();
    var needle = (templatePickerSearch && templatePickerSearch.value || "").trim().toLowerCase();
    if (needle) {
      list = list.filter(function (item) {
        return String(item.name || "").toLowerCase().indexOf(needle) !== -1;
      });
    }
    var sort = templatePickerSort ? templatePickerSort.value : "newest";
    list.sort(function (a, b) {
      if (sort === "name") return String(a.name || "").localeCompare(String(b.name || ""));
      if (sort === "oldest") return (a.createdAt || 0) - (b.createdAt || 0);
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
    return list;
  }

  function miniPreviewHtml(tpl) {
    var products = [
      { name: "Product 1", price: 20, qty: 1, tax: 0 },
      { name: "Product 1", price: 20, qty: 1, tax: 0 },
      { name: "Product 1", price: 20, qty: 1, tax: 0 }
    ];
    var amount = "60.00";
    var invNum = String(tpl.invoiceNum || "4");
    while (invNum.length < 6) invNum = "0" + invNum;
    var rows = products.map(function (row) {
      return "<tr><td>Product 1</td><td>$20</td><td>1</td><td>-</td><td class='text-right'>$20</td></tr>";
    }).join("");
    return [
      '<div class="preview-card">',
      '<div class="preview-head"><h3>Invoice</h3></div>',
      '<div class="company-meta">ABC 3<br>+92447475763830<br>Oxford Street<br>London, Greater London<br>W1C 1JT<br>GB</div>',
      '<div class="preview-meta-grid preview-meta-grid-wide">',
      "<div><h4>Billed To</h4><p>John's Company John Doe<br>1234 Main Street Austin, Texas 54321 US</p></div>",
      "<div><h4>Invoice Number</h4><p>INV-", invNum, "</p>",
      "<h4 class='due-date-label'>Issue Date</h4><p>August 4, 2026</p>",
      "<h4 class='due-date-label'>Due Date</h4><p>August 18, 2026</p></div>",
      "</div>",
      '<div class="preview-table-wrap"><table class="table preview-table mb-0"><thead><tr><th>Item Name</th><th>Price</th><th>Quantity</th><th>Tax</th><th class="text-right">Subtotal</th></tr></thead><tbody>',
      rows,
      "</tbody></table></div>",
      '<div class="preview-totals">',
      '<div class="preview-total-line"><span>Subtotal</span><strong>$', amount, "</strong></div>",
      '<div class="preview-total-line"><span>Tax</span><strong>$', amount, "</strong></div>",
      '<div class="preview-total-line total-due"><span>Amount Due (GBP)</span><strong>$', amount, "</strong></div>",
      "</div></div>"
    ].join("");
  }

  function renderTemplatePicker() {
    if (!templatePickerGrid) return;
    var list = getPickerTemplates();
    if (!list.length) {
      templatePickerGrid.innerHTML = '<div class="template-picker-empty">No templates found.</div>';
      return;
    }
    templatePickerGrid.innerHTML = list.map(function (tpl, index) {
      return [
        '<article class="template-picker-card" data-id="', tpl.id, '">',
        '<div class="template-picker-thumb">', miniPreviewHtml(tpl), "</div>",
        '<div class="template-picker-card-foot">',
        '<span class="template-picker-card-name">Template ', index + 1, "</span>",
        '<button type="button" class="template-picker-use-btn" data-use-id="', tpl.id, '">Use Template</button>',
        "</div></article>"
      ].join("");
    }).join("");
  }

  function openTemplatePicker() {
    if (templatePickerSearch) templatePickerSearch.value = "";
    if (templatePickerSort) templatePickerSort.value = "newest";
    renderTemplatePicker();
    window.InvoicesApp.setModal(templatePickerOverlay, true);
  }

  document.getElementById("useTemplateAction").addEventListener("click", function () {
    closeTopbarMenu();
    openTemplatePicker();
  });
  document.getElementById("managePaymentsAction").addEventListener("click", function () {
    closeTopbarMenu();
    window.alert("Open payment methods settings.");
  });

  var templatePickerCloseBtn = document.getElementById("templatePickerClose");
  if (templatePickerCloseBtn) {
    templatePickerCloseBtn.addEventListener("click", closeTemplatePicker);
  }
  var templatePickerCancel = document.getElementById("templatePickerCancel");
  if (templatePickerCancel) templatePickerCancel.addEventListener("click", closeTemplatePicker);
  if (templatePickerOverlay) {
    templatePickerOverlay.addEventListener("click", function (event) {
      if (event.target === templatePickerOverlay) closeTemplatePicker();
    });
  }
  if (templatePickerSearch) {
    templatePickerSearch.addEventListener("input", renderTemplatePicker);
  }
  if (templatePickerSort) {
    templatePickerSort.addEventListener("change", renderTemplatePicker);
  }
  if (templatePickerGrid) {
    templatePickerGrid.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-use-id]");
      if (!btn || !window.TemplatesStore) return;
      var tpl = window.TemplatesStore.getById(btn.getAttribute("data-use-id"));
      applyTemplateToEditor(tpl);
      closeTemplatePicker();
    });
  }

  sendAsRadios.forEach(function (radio) {
    radio.addEventListener("change", updateSendModalFields);
  });
  if (toggleCcButton) {
    toggleCcButton.addEventListener("click", function () {
      var shouldShow = sendCcField.classList.contains("is-collapsed");
      setFieldVisibility(sendCcField, shouldShow);
      setPillActive(toggleCcButton, shouldShow);
    });
  }
  if (toggleBccButton) {
    toggleBccButton.addEventListener("click", function () {
      var shouldShow = sendBccField.classList.contains("is-collapsed");
      setFieldVisibility(sendBccField, shouldShow);
      setPillActive(toggleBccButton, shouldShow);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && topbarMenuDropdown && !topbarMenuDropdown.hidden) closeTopbarMenu();
    if (event.key === "Escape" && sendModalOverlay && !sendModalOverlay.hidden) closeSendModal();
    if (event.key === "Escape" && templatePickerOverlay && !templatePickerOverlay.hidden) closeTemplatePicker();
  });
  document.addEventListener("click", function (event) {
    if (topbarMenu && !topbarMenu.contains(event.target)) closeTopbarMenu();
  });

  templateEditButton.addEventListener("click", function () {
    templateName.focus();
    document.execCommand("selectAll", false, null);
  });

  [companyName, companyEmail, companyPhone, companyAddress, invoiceNumber, customerName, discountValue, taxValue, issueDateInput, dueDateInput, tippingValue].forEach(function (field) {
    if (!field) return;
    field.addEventListener("input", updateInvoice);
    field.addEventListener("change", updateInvoice);
  });

  document.querySelectorAll('input[name="discountMode"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      discountPrefix.textContent = this.value === "percent" ? "%" : "$";
      updateInvoice();
    });
  });

  termsCheck.addEventListener("change", function () {
    notesEditor.contentEditable = this.checked ? "true" : "false";
  });
  attachmentCheck.addEventListener("change", function () {
    uploadPanel.style.display = this.checked ? "block" : "none";
  });
  attachmentInput.addEventListener("change", renderFiles);
  businessEditToggle.addEventListener("click", function () {
    businessEditGrid.classList.toggle("is-collapsed");
  });
  if (closeGateway) {
    closeGateway.addEventListener("click", function () {
      document.getElementById("gatewayCard").hidden = true;
    });
  }
  lateFeesCheck.addEventListener("change", function () {
    lateFeesPanel.hidden = !this.checked;
  });
  tippingCheck.addEventListener("change", function () {
    tippingRow.hidden = !this.checked;
    updateInvoice();
  });
  paymentScheduleButton.addEventListener("click", function () {
    paymentScheduleButton.textContent = "Payment Schedule Added";
    setTimeout(function () { paymentScheduleButton.textContent = "Add Payment Schedule"; }, 1500);
  });
  dateTriggers.forEach(function (button) {
    button.addEventListener("click", function () {
      var target = document.getElementById(this.getAttribute("data-target"));
      if (!target) return;
      if (typeof target.showPicker === "function") target.showPicker();
      else { target.focus(); target.click(); }
    });
  });

  notesEditor.addEventListener("mouseup", saveSelection);
  notesEditor.addEventListener("keyup", saveSelection);
  notesEditor.addEventListener("focus", saveSelection);
  document.querySelectorAll("#viewEditor [data-command]").forEach(function (button) {
    button.addEventListener("click", function () {
      exec(this.getAttribute("data-command"), this.getAttribute("data-value"));
    });
  });
  document.querySelectorAll("#viewEditor [data-action='link']").forEach(function (button) {
    button.addEventListener("click", function () {
      var url = window.prompt("Enter link URL");
      if (url) exec("createLink", url);
    });
  });
  fontNameSelect.addEventListener("change", function () { exec("fontName", this.value); });
  formatBlockSelect.addEventListener("change", function () { exec("formatBlock", this.value); });
  fontSizeSelect.addEventListener("change", function () { exec("fontSize", this.value); });
  lineHeightSelect.addEventListener("change", function () { notesEditor.style.lineHeight = this.value; });
  imageInsertButton.addEventListener("click", function () { editorImageInput.click(); });
  editorImageInput.addEventListener("change", function () {
    var file = this.files && this.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (event) {
      restoreSelection();
      document.execCommand("insertImage", false, event.target.result);
      saveSelection();
      notesEditor.focus();
    };
    reader.readAsDataURL(file);
    editorImageInput.value = "";
  });

  window.openInvoicePreview = function (id) {
    var invoice = id ? window.InvoicesStore.getById(id) : activeInvoice;
    if (!invoice) invoice = collectInvoiceData(currentInvoiceStatus || "due");

    var createdEl = document.getElementById("invoicePreviewCreated");
    if (createdEl) {
      var longDate = formatDate(invoice.issueDate) || "August 7, 2026";
      createdEl.textContent = "Created: " + longDate.replace(/(\w+) (\d+), (\d+)/, function (_, m, d, y) {
        return m.slice(0, 3) + " " + d + ", " + y;
      });
    }

    var companyEl = document.getElementById("invoicePreviewCompanyMeta");
    if (companyEl) {
      companyEl.innerHTML = [
        invoice.companyName || "ABC 3",
        invoice.companyPhone || "+92447475763830",
        "Oxford Street",
        "London, Greater London",
        "W1C 1JT",
        "GB"
      ].join("<br>");
    }

    var billed = document.getElementById("invoicePreviewBilledTo");
    if (billed) billed.innerHTML = (invoice.customer || "John's Company") + "<br>1234 Main Street Austin, Texas 54321 US";

    var numEl = document.getElementById("invoicePreviewNumber");
    if (numEl) numEl.textContent = invoice.number || ("INV-" + (invoice.invoiceNum || "04"));

    var issueEl = document.getElementById("invoicePreviewIssueDate");
    var dueEl = document.getElementById("invoicePreviewDueDate");
    if (issueEl) issueEl.textContent = formatDate(invoice.issueDate) || "August 4, 2026";
    if (dueEl) dueEl.textContent = formatDate(invoice.dueDate) || "August 18, 2026";

    var tbody = document.getElementById("invoicePreviewRows");
    var products = invoice.products && invoice.products.length ? invoice.products : [
      { name: "Product 1", price: 20, qty: 2, tax: 0, subtotal: 20 }
    ];
    if (tbody) {
      tbody.innerHTML = products.map(function (row) {
        var sub = row.subtotal != null ? row.subtotal : Number(row.price) * Number(row.qty);
        var taxLabel = row.tax ? row.tax + "%" : "-";
        return "<tr><td>" + (row.name || "Product") + "</td><td>" + money(row.price).replace(".00", "") + "</td><td>" + row.qty + "</td><td>" + taxLabel + "</td><td class='text-right'>" + money(sub).replace(".00", "") + "</td></tr>";
      }).join("");
    }

    var amount = money(invoice.value);
    var subEl = document.getElementById("invoicePreviewSubtotal");
    var taxEl = document.getElementById("invoicePreviewTax");
    var dueAmt = document.getElementById("invoicePreviewAmountDue");
    if (subEl) subEl.textContent = amount;
    if (taxEl) taxEl.textContent = amount;
    if (dueAmt) dueAmt.textContent = amount;

    window.InvoicesApp.showPreview();
  };

  var downloadBtn = document.getElementById("downloadInvoiceBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () { window.print(); });
  }

  window.openInvoiceEditor = function (id, mode) {
    currentInvoiceId = id ? Number(id) : null;
    activeInvoice = currentInvoiceId ? window.InvoicesStore.getById(currentInvoiceId) : null;
    currentInvoiceStatus = (activeInvoice && activeInvoice.status) || "draft";
    productRows.innerHTML = "";
    if (activeInvoice) {
      loadInvoiceIntoForm(activeInvoice);
    } else {
      templateName.textContent = creatingAsTemplate ? "New Invoice Template" : "Invoice Name";
      invoiceNumber.value = String(window.InvoicesStore.nextId() + 3);
      addRow({ name: "Product 1", price: 20, qty: 2, tax: 0 });
      addRow({ name: "Product 1", price: 20, qty: 2, tax: 0 });
      addRow({ name: "Product 1", price: 20, qty: 2, tax: 0 });
      notesEditor.innerHTML = "";
      if (lateFeesCheck) { lateFeesCheck.checked = false; lateFeesPanel.hidden = true; }
      if (tippingCheck) { tippingCheck.checked = false; tippingRow.hidden = true; tippingValue.value = 0; }
    }
    notesEditor.style.lineHeight = lineHeightSelect.value;
    if (mode === "view") {
      saveButton.disabled = true;
      saveButton.classList.add("is-disabled");
    } else {
      saveButton.disabled = false;
      saveButton.classList.remove("is-disabled");
    }
    updateInvoice();
    window.InvoicesApp.showEditor();
  };

  (function handleTemplateQuery() {
    var params = new URLSearchParams(window.location.search);
    var templateId = params.get("templateId");
    var asTemplate = params.get("asTemplate");
    var mode = params.get("mode") || "edit";
    if (templateId && window.TemplatesStore) {
      var tpl = window.TemplatesStore.getById(templateId);
      editingTemplateId = tpl ? tpl.id : null;
      window.openInvoiceEditor(null, mode);
      if (tpl) applyTemplateToEditor(tpl);
      return;
    }
    if (asTemplate === "1") {
      creatingAsTemplate = true;
      window.openInvoiceEditor(null, "create");
    }
  }());
}());

}());

window.initInvoiceTemplateEditor = function (opts) {
  opts = opts || {};
  if (!document.getElementById("productRows")) return;
  var productRows = document.getElementById("productRows");
  var previewRows = document.getElementById("previewRows");
  var companyName = document.getElementById("companyName");
  var companyEmail = document.getElementById("companyEmail");
  var companyPhone = document.getElementById("companyPhone");
  var companyAddress = document.getElementById("companyAddress");
  var invoiceNumber = document.getElementById("invoiceNumber");
  var discountValue = document.getElementById("discountValue");
  var taxValue = document.getElementById("taxValue");
  var discountPrefix = document.getElementById("discountPrefix");
  var saveButton = document.getElementById("saveButton");
  var termsCheck = document.getElementById("termsCheck");
  var notesEditor = document.getElementById("notesEditor");
  var attachmentCheck = document.getElementById("attachmentCheck");
  var uploadPanel = document.getElementById("uploadPanel");
  var attachmentInput = document.getElementById("attachmentInput");
  var uploadFiles = document.getElementById("uploadFiles");
  var uploadPreviewGrid = document.getElementById("uploadPreviewGrid");
  var editorImageInput = document.getElementById("editorImageInput");
  var imageInsertButton = document.getElementById("imageInsertButton");
  var fontNameSelect = document.getElementById("fontNameSelect");
  var formatBlockSelect = document.getElementById("formatBlockSelect");
  var fontSizeSelect = document.getElementById("fontSizeSelect");
  var lineHeightSelect = document.getElementById("lineHeightSelect");
  var businessEditToggle = document.getElementById("businessEditToggle");
  var businessEditGrid = document.querySelector(".edit-grid");
  var templateName = document.getElementById("templateName");
  var templateEditButton = document.getElementById("templateEditButton");
  var closeGatewayButton = document.getElementById("closeGateway");
  var savedRange = null;

  function money(value) {
    return "$" + Number(value || 0).toFixed(2);
  }

  function addRow(defaults) {
    var template = document.getElementById("productRowTemplate");
    var row = template.content.firstElementChild.cloneNode(true);

    row.querySelector(".item-name").value = defaults.name;
    row.querySelector(".item-price").value = defaults.price;
    row.querySelector(".item-qty").value = defaults.qty;
    row.querySelector(".item-tax").value = defaults.tax;

    row.querySelector(".add-row").addEventListener("click", function () {
      addRow({ name: "", price: 0, qty: 0, tax: 0 });
      updateInvoice();
    });

    row.querySelector(".remove-row").addEventListener("click", function () {
      if (productRows.children.length > 1) {
        row.remove();
        updateInvoice();
      }
    });

    row.querySelector(".qty-up").addEventListener("click", function () {
      var qtyInput = row.querySelector(".item-qty");
      qtyInput.value = Number(qtyInput.value || 0) + 1;
      updateInvoice();
    });

    row.querySelector(".qty-down").addEventListener("click", function () {
      var qtyInput = row.querySelector(".item-qty");
      qtyInput.value = Math.max(0, Number(qtyInput.value || 0) - 1);
      updateInvoice();
    });

    row.querySelectorAll("input").forEach(function (input) {
      input.addEventListener("input", updateInvoice);
    });

    productRows.appendChild(row);
  }

  function getRows() {
    return Array.prototype.slice.call(productRows.querySelectorAll(".product-row")).map(function (row) {
      var name = row.querySelector(".item-name").value || "Product";
      var price = Number(row.querySelector(".item-price").value || 0);
      var qty = Number(row.querySelector(".item-qty").value || 0);
      var tax = Number(row.querySelector(".item-tax").value || 0);
      var subtotal = price * qty;

      return {
        name: name,
        price: price,
        qty: qty,
        tax: tax,
        subtotal: subtotal
      };
    });
  }

  function updateBusinessPreview() {
    document.getElementById("companyPreview").textContent = companyName.value || "ABC 3";
    document.getElementById("emailPreview").textContent = companyEmail.value || "-";
    document.getElementById("phonePreview").textContent = companyPhone.value || "-";
    document.getElementById("addressPreview").textContent = companyAddress.value || "-";

    document.getElementById("previewCompanyMeta").innerHTML = [
      companyName.value || "ABC 3",
      companyPhone.value || "-",
      "Oxford Street",
      "United Kingdom"
    ].join("<br>");

    document.getElementById("previewBilledTo").innerHTML = [
      companyName.value || "ABC 3",
      companyAddress.value || "-"
    ].join("<br>");

    document.getElementById("previewInvoiceNumber").textContent = "INV-" + (invoiceNumber.value || "2");
  }

  function updateInvoice() {
    var rows = getRows();
    var subtotal = 0;
    var itemTaxTotal = 0;
    var discountMode = document.querySelector('input[name="discountMode"]:checked').value;
    var extraTaxPercent = Number(taxValue.value || 0);

    previewRows.innerHTML = "";

    rows.forEach(function (row) {
      subtotal += row.subtotal;
      itemTaxTotal += row.subtotal * row.tax / 100;

      var tr = document.createElement("tr");
      tr.innerHTML = [
        "<td>" + row.name + "</td>",
        "<td>" + money(row.price) + "</td>",
        "<td>" + row.qty + "</td>",
        "<td>" + row.tax + "%</td>",
        "<td class='text-right'>" + money(row.subtotal) + "</td>"
      ].join("");
      previewRows.appendChild(tr);
    });

    var extraTaxAmount = subtotal * extraTaxPercent / 100;
    var totalTax = itemTaxTotal + extraTaxAmount;
    var discountAmount = discountMode === "percent"
      ? subtotal * Number(discountValue.value || 0) / 100
      : Number(discountValue.value || 0);
    var amountDue = Math.max(0, subtotal + totalTax - discountAmount);

    document.getElementById("subtotalOutput").textContent = money(subtotal);
    document.getElementById("amountDueOutput").textContent = money(amountDue);
    document.getElementById("previewSubtotal").textContent = money(subtotal);
    document.getElementById("previewTax").textContent = money(totalTax);
    document.getElementById("previewAmountDue").textContent = money(amountDue);
    var payBadgeEl = document.getElementById("payBadge");
    if (payBadgeEl) payBadgeEl.textContent = "Pay " + money(amountDue);
    document.getElementById("previewIssueDate").textContent = "August 7, 2026";
    document.getElementById("previewDueDate").textContent = "August 18, 2026";

    updateBusinessPreview();
  }

  function renderFiles() {
    uploadFiles.innerHTML = "";
    uploadPreviewGrid.innerHTML = "";

    Array.prototype.slice.call(attachmentInput.files || []).forEach(function (file) {
      var item = document.createElement("div");
      item.className = "upload-file";
      item.textContent = file.name;
      uploadFiles.appendChild(item);

      if (file.type.indexOf("image/") === 0) {
        var reader = new FileReader();
        reader.onload = function (event) {
          var preview = document.createElement("div");
          preview.className = "upload-preview-item";
          preview.innerHTML = "<img src='" + event.target.result + "' alt='Preview'><div class='upload-preview-name'>" + file.name + "</div>";
          uploadPreviewGrid.appendChild(preview);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function saveSelection() {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      savedRange = selection.getRangeAt(0).cloneRange();
    }
  }

  function restoreSelection() {
    if (!savedRange) {
      notesEditor.focus();
      return;
    }

    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(savedRange);
  }

  function exec(command, value) {
    restoreSelection();
    document.execCommand(command, false, value || null);
    saveSelection();
    notesEditor.focus();
  }

  if (closeGatewayButton) {
    closeGatewayButton.addEventListener("click", function () {
      document.getElementById("gatewayCard").style.display = "none";
    });
  }

  var activeTemplate = opts.template || null;

  function applyTemplate(item) {
    if (!item) return;
    if (templateName) templateName.textContent = item.name || "Template Name";
    companyName.value = item.companyName || "";
    companyEmail.value = item.companyEmail || "";
    companyPhone.value = item.companyPhone || "";
    companyAddress.value = item.companyAddress || "";
    invoiceNumber.value = item.invoiceNum || "";
    productRows.innerHTML = "";
    (item.products && item.products.length ? item.products : [{ name: "", price: 0, qty: 0, tax: 0 }]).forEach(function (p) {
      addRow(p);
    });
    if (notesEditor) notesEditor.innerHTML = item.notes || "";
    updateInvoice();
  }

  function collectTemplateData() {
    var rows = getRows();
    return {
      name: ((templateName && templateName.textContent) || "").trim() || "Template Name",
      companyName: companyName.value,
      companyEmail: companyEmail.value,
      companyPhone: companyPhone.value,
      companyAddress: companyAddress.value,
      invoiceNum: invoiceNumber.value,
      products: rows.map(function (row) {
        return { name: row.name, price: row.price, qty: row.qty, tax: row.tax };
      }),
      amount: window.TemplatesStore ? window.TemplatesStore.amountOf(rows) : 0,
      notes: notesEditor ? notesEditor.innerHTML : ""
    };
  }

  function goBackToTemplates() {
    if (typeof opts.onBack === "function") {
      opts.onBack();
      return;
    }
    window.location.href = "templates.html";
  }

  var backLink = document.querySelector(".back-link");
  if (backLink) {
    backLink.addEventListener("click", function (event) {
      event.preventDefault();
      goBackToTemplates();
    });
  }

  saveButton.addEventListener("click", function () {
    if (activeTemplate && window.TemplatesStore) {
      Object.assign(activeTemplate, collectTemplateData());
      activeTemplate.type = opts.type || "invoice";
      window.TemplatesStore.upsert(activeTemplate);
    }
    saveButton.querySelector("span").textContent = "Saved";
    setTimeout(function () {
      saveButton.querySelector("span").textContent = "Save";
    }, 1500);
  });

  templateEditButton.addEventListener("click", function () {
    templateName.focus();
    document.execCommand("selectAll", false, null);
  });

  [companyName, companyEmail, companyPhone, companyAddress, invoiceNumber, discountValue, taxValue].forEach(function (field) {
    field.addEventListener("input", updateInvoice);
  });

  document.querySelectorAll('input[name="discountMode"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      discountPrefix.textContent = this.value === "percent" ? "%" : "$";
      updateInvoice();
    });
  });

  termsCheck.addEventListener("change", function () {
    notesEditor.contentEditable = this.checked ? "true" : "false";
  });

  attachmentCheck.addEventListener("change", function () {
    uploadPanel.style.display = this.checked ? "block" : "none";
  });

  attachmentInput.addEventListener("change", renderFiles);

  businessEditToggle.addEventListener("click", function () {
    businessEditGrid.classList.toggle("is-collapsed");
  });

  notesEditor.addEventListener("mouseup", saveSelection);
  notesEditor.addEventListener("keyup", saveSelection);
  notesEditor.addEventListener("focus", saveSelection);

  document.querySelectorAll("[data-command]").forEach(function (button) {
    button.addEventListener("click", function () {
      exec(this.getAttribute("data-command"), this.getAttribute("data-value"));
    });
  });

  document.querySelectorAll("[data-action='link']").forEach(function (button) {
    button.addEventListener("click", function () {
      var url = window.prompt("Enter link URL");
      if (url) {
        exec("createLink", url);
      }
    });
  });

  fontNameSelect.addEventListener("change", function () {
    exec("fontName", this.value);
  });

  formatBlockSelect.addEventListener("change", function () {
    exec("formatBlock", this.value);
  });

  fontSizeSelect.addEventListener("change", function () {
    exec("fontSize", this.value);
  });

  lineHeightSelect.addEventListener("change", function () {
    notesEditor.style.lineHeight = this.value;
  });

  imageInsertButton.addEventListener("click", function () {
    editorImageInput.click();
  });

  editorImageInput.addEventListener("change", function () {
    var file = this.files && this.files[0];
    if (!file) {
      return;
    }

    var reader = new FileReader();
    reader.onload = function (event) {
      restoreSelection();
      document.execCommand("insertImage", false, event.target.result);
      saveSelection();
      notesEditor.focus();
    };
    reader.readAsDataURL(file);
    editorImageInput.value = "";
  });

  addRow({ name: "", price: 0, qty: 0, tax: 0 });
  addRow({ name: "", price: 0, qty: 0, tax: 0 });
  notesEditor.innerHTML = "";
  notesEditor.style.lineHeight = lineHeightSelect.value;
  if (activeTemplate) applyTemplate(activeTemplate);
  else updateInvoice();
};


window.initEstimateTemplateEditor = function (opts) {
  opts = opts || {};
  if (!document.getElementById("productRows")) return;
  var productRows = document.getElementById("productRows");
  var previewRows = document.getElementById("previewRows");
  var companyName = document.getElementById("companyName");
  var companyEmail = document.getElementById("companyEmail");
  var companyPhone = document.getElementById("companyPhone");
  var companyAddress = document.getElementById("companyAddress");
  var invoiceNumber = document.getElementById("invoiceNumber");
  var discountValue = document.getElementById("discountValue");
  var taxValue = document.getElementById("taxValue");
  var discountPrefix = document.getElementById("discountPrefix");
  var saveButton = document.getElementById("saveButton");
  var termsCheck = document.getElementById("termsCheck");
  var notesEditor = document.getElementById("notesEditor");
  var attachmentCheck = document.getElementById("attachmentCheck");
  var uploadPanel = document.getElementById("uploadPanel");
  var attachmentInput = document.getElementById("attachmentInput");
  var uploadFiles = document.getElementById("uploadFiles");
  var uploadPreviewGrid = document.getElementById("uploadPreviewGrid");
  var editorImageInput = document.getElementById("editorImageInput");
  var imageInsertButton = document.getElementById("imageInsertButton");
  var fontNameSelect = document.getElementById("fontNameSelect");
  var formatBlockSelect = document.getElementById("formatBlockSelect");
  var fontSizeSelect = document.getElementById("fontSizeSelect");
  var lineHeightSelect = document.getElementById("lineHeightSelect");
  var businessEditToggle = document.getElementById("businessEditToggle");
  var businessEditGrid = document.querySelector(".edit-grid");
  var templateName = document.getElementById("templateName");
  var templateEditButton = document.getElementById("templateEditButton");
  var closeGatewayButton = document.getElementById("closeGateway");
  var payBadge = document.getElementById("payBadge");
  var savedRange = null;

  function money(value) {
    return "$" + Number(value || 0).toFixed(2);
  }

  function addRow(defaults) {
    var template = document.getElementById("productRowTemplate");
    var row = template.content.firstElementChild.cloneNode(true);

    row.querySelector(".item-name").value = defaults.name;
    row.querySelector(".item-price").value = defaults.price;
    row.querySelector(".item-qty").value = defaults.qty;
    row.querySelector(".item-tax").value = defaults.tax;

    row.querySelector(".add-row").addEventListener("click", function () {
      addRow({ name: "", price: 0, qty: 0, tax: 0 });
      updateInvoice();
    });

    row.querySelector(".remove-row").addEventListener("click", function () {
      if (productRows.children.length > 1) {
        row.remove();
        updateInvoice();
      }
    });

    row.querySelector(".qty-up").addEventListener("click", function () {
      var qtyInput = row.querySelector(".item-qty");
      qtyInput.value = Number(qtyInput.value || 0) + 1;
      updateInvoice();
    });

    row.querySelector(".qty-down").addEventListener("click", function () {
      var qtyInput = row.querySelector(".item-qty");
      qtyInput.value = Math.max(0, Number(qtyInput.value || 0) - 1);
      updateInvoice();
    });

    row.querySelectorAll("input").forEach(function (input) {
      input.addEventListener("input", updateInvoice);
    });

    productRows.appendChild(row);
  }

  function getRows() {
    return Array.prototype.slice.call(productRows.querySelectorAll(".product-row")).map(function (row) {
      var name = row.querySelector(".item-name").value || "Product";
      var price = Number(row.querySelector(".item-price").value || 0);
      var qty = Number(row.querySelector(".item-qty").value || 0);
      var tax = Number(row.querySelector(".item-tax").value || 0);
      var subtotal = price * qty;

      return {
        name: name,
        price: price,
        qty: qty,
        tax: tax,
        subtotal: subtotal
      };
    });
  }

  function updateBusinessPreview() {
    document.getElementById("companyPreview").textContent = companyName.value || "ABC 3";
    document.getElementById("emailPreview").textContent = companyEmail.value || "-";
    document.getElementById("phonePreview").textContent = companyPhone.value || "-";
    document.getElementById("addressPreview").textContent = companyAddress.value || "-";

    document.getElementById("previewCompanyMeta").innerHTML = [
      companyName.value || "ABC 3",
      "+92447475763830",
      "Oxford Street",
      "London, Greater London",
      "W1C 1JT",
      "GB"
    ].join("<br>");

    document.getElementById("previewBilledTo").innerHTML = [
      "John's Company",
      "John Doe 1234 Main Street Austin, Texas 54321 US"
    ].join("<br>");

    document.getElementById("previewInvoiceNumber").textContent = "INV-" + String(invoiceNumber.value || "2").padStart(6, "0");
  }

  function updateInvoice() {
    var rows = getRows();
    var subtotal = 0;
    var itemTaxTotal = 0;
    var discountMode = document.querySelector('input[name="discountMode"]:checked').value;
    var extraTaxPercent = Number(taxValue.value || 0);

    previewRows.innerHTML = "";

    rows.forEach(function (row) {
      subtotal += row.subtotal;
      itemTaxTotal += row.subtotal * row.tax / 100;

      var tr = document.createElement("tr");
      tr.innerHTML = [
        "<td>" + row.name + "</td>",
        "<td>" + money(row.price) + "</td>",
        "<td>" + row.qty + "</td>",
        "<td>" + row.tax + "%</td>",
        "<td class='text-right'>" + money(row.subtotal) + "</td>"
      ].join("");
      previewRows.appendChild(tr);
    });

    var extraTaxAmount = subtotal * extraTaxPercent / 100;
    var totalTax = itemTaxTotal + extraTaxAmount;
    var discountAmount = discountMode === "percent"
      ? subtotal * Number(discountValue.value || 0) / 100
      : Number(discountValue.value || 0);
    var amountDue = Math.max(0, subtotal + totalTax - discountAmount);

    document.getElementById("subtotalOutput").textContent = money(subtotal);
    document.getElementById("amountDueOutput").textContent = money(amountDue);
    document.getElementById("previewSubtotal").textContent = money(subtotal);
    document.getElementById("previewTax").textContent = money(totalTax);
    document.getElementById("previewAmountDue").textContent = money(amountDue);
    if (payBadge) {
      payBadge.textContent = "Pay " + money(amountDue);
    }
    document.getElementById("previewIssueDate").textContent = "August 4, 2026";
    document.getElementById("previewDueDate").textContent = "August 18, 2026";

    updateBusinessPreview();
  }

  function renderFiles() {
    uploadFiles.innerHTML = "";
    uploadPreviewGrid.innerHTML = "";

    Array.prototype.slice.call(attachmentInput.files || []).forEach(function (file) {
      var item = document.createElement("div");
      item.className = "upload-file";
      item.textContent = file.name;
      uploadFiles.appendChild(item);

      if (file.type.indexOf("image/") === 0) {
        var reader = new FileReader();
        reader.onload = function (event) {
          var preview = document.createElement("div");
          preview.className = "upload-preview-item";
          preview.innerHTML = "<img src='" + event.target.result + "' alt='Preview'><div class='upload-preview-name'>" + file.name + "</div>";
          uploadPreviewGrid.appendChild(preview);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function saveSelection() {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      savedRange = selection.getRangeAt(0).cloneRange();
    }
  }

  function restoreSelection() {
    if (!savedRange) {
      notesEditor.focus();
      return;
    }

    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(savedRange);
  }

  function exec(command, value) {
    restoreSelection();
    document.execCommand(command, false, value || null);
    saveSelection();
    notesEditor.focus();
  }

  if (closeGatewayButton) {
    closeGatewayButton.addEventListener("click", function () {
      document.getElementById("gatewayCard").style.display = "none";
    });
  }

  var activeTemplate = opts.template || null;

  function applyTemplate(item) {
    if (!item) return;
    if (templateName) templateName.textContent = item.name || "Template Name";
    companyName.value = item.companyName || "";
    companyEmail.value = item.companyEmail || "";
    companyPhone.value = item.companyPhone || "";
    companyAddress.value = item.companyAddress || "";
    invoiceNumber.value = item.invoiceNum || "";
    productRows.innerHTML = "";
    (item.products && item.products.length ? item.products : [{ name: "Enter item name", price: 0, qty: 0, tax: 0 }]).forEach(function (p) {
      addRow(p);
    });
    if (notesEditor) notesEditor.innerHTML = item.notes || "";
    updateInvoice();
  }

  function collectTemplateData() {
    var rows = getRows();
    return {
      name: ((templateName && templateName.textContent) || "").trim() || "Template Name",
      companyName: companyName.value,
      companyEmail: companyEmail.value,
      companyPhone: companyPhone.value,
      companyAddress: companyAddress.value,
      invoiceNum: invoiceNumber.value,
      products: rows.map(function (row) {
        return { name: row.name, price: row.price, qty: row.qty, tax: row.tax };
      }),
      amount: window.TemplatesStore ? window.TemplatesStore.amountOf(rows) : 0,
      notes: notesEditor ? notesEditor.innerHTML : ""
    };
  }

  function goBackToTemplates() {
    if (typeof opts.onBack === "function") {
      opts.onBack();
      return;
    }
    window.location.href = "templates.html";
  }

  var backLink = document.querySelector(".back-link");
  if (backLink) {
    backLink.addEventListener("click", function (event) {
      event.preventDefault();
      goBackToTemplates();
    });
  }

  saveButton.addEventListener("click", function () {
    if (activeTemplate && window.TemplatesStore) {
      Object.assign(activeTemplate, collectTemplateData());
      activeTemplate.type = opts.type || "estimate";
      window.TemplatesStore.upsert(activeTemplate);
    }
    saveButton.querySelector("span").textContent = "Saved";
    setTimeout(function () {
      saveButton.querySelector("span").textContent = "Save";
    }, 1500);
  });

  templateEditButton.addEventListener("click", function () {
    templateName.focus();
    document.execCommand("selectAll", false, null);
  });

  [companyName, companyEmail, companyPhone, companyAddress, invoiceNumber, discountValue, taxValue].forEach(function (field) {
    field.addEventListener("input", updateInvoice);
  });

  document.querySelectorAll('input[name="discountMode"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      discountPrefix.textContent = this.value === "percent" ? "%" : "$";
      updateInvoice();
    });
  });

  termsCheck.addEventListener("change", function () {
    notesEditor.contentEditable = this.checked ? "true" : "false";
  });

  attachmentCheck.addEventListener("change", function () {
    uploadPanel.style.display = this.checked ? "block" : "none";
  });

  attachmentInput.addEventListener("change", renderFiles);

  businessEditToggle.addEventListener("click", function () {
    businessEditGrid.classList.toggle("is-collapsed");
  });

  notesEditor.addEventListener("mouseup", saveSelection);
  notesEditor.addEventListener("keyup", saveSelection);
  notesEditor.addEventListener("focus", saveSelection);

  document.querySelectorAll("[data-command]").forEach(function (button) {
    button.addEventListener("click", function () {
      exec(this.getAttribute("data-command"), this.getAttribute("data-value"));
    });
  });

  document.querySelectorAll("[data-action='link']").forEach(function (button) {
    button.addEventListener("click", function () {
      var url = window.prompt("Enter link URL");
      if (url) {
        exec("createLink", url);
      }
    });
  });

  fontNameSelect.addEventListener("change", function () {
    exec("fontName", this.value);
  });

  formatBlockSelect.addEventListener("change", function () {
    exec("formatBlock", this.value);
  });

  fontSizeSelect.addEventListener("change", function () {
    exec("fontSize", this.value);
  });

  lineHeightSelect.addEventListener("change", function () {
    notesEditor.style.lineHeight = this.value;
  });

  imageInsertButton.addEventListener("click", function () {
    editorImageInput.click();
  });

  editorImageInput.addEventListener("change", function () {
    var file = this.files && this.files[0];
    if (!file) {
      return;
    }

    var reader = new FileReader();
    reader.onload = function (event) {
      restoreSelection();
      document.execCommand("insertImage", false, event.target.result);
      saveSelection();
      notesEditor.focus();
    };
    reader.readAsDataURL(file);
    editorImageInput.value = "";
  });

  addRow({ name: "Enter item name", price: 0, qty: 0, tax: 0 });
  addRow({ name: "Enter item name", price: 0, qty: 0, tax: 0 });
  notesEditor.innerHTML = "";
  notesEditor.style.lineHeight = lineHeightSelect.value;
  if (activeTemplate) applyTemplate(activeTemplate);
  else updateInvoice();
};


/* page boot */
(function () {
  if (document.body.classList.contains('ep-template-page') && document.getElementById('gatewayCard')) {
    window.initInvoiceTemplateEditor({});
  } else if (document.body.classList.contains('ep-template-page')) {
    window.initEstimateTemplateEditor({});
  }
}());

/* Shared Pages helpers — estimate_pages status tabs + shared extras */
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".ep-demo-tab"));
  var isStatusPages = tabs.length > 0;

  if (isStatusPages) {
    var menu = document.getElementById("topbarMenu");
    var trigger = document.getElementById("topbarMenuTrigger");
    var dropdown = document.getElementById("topbarMenuDropdown");
    var saveBtn = document.getElementById("saveButton");
    var primaryBtn = document.getElementById("primaryButton");

    var STATES = {
      draft: {
        save: { show: true, disabled: false },
        primary: { show: true, text: "Send", icon: "icon-send" },
        menu: [],
        openMenu: false
      },
      sent: {
        save: { show: true, disabled: false },
        primary: { show: true, text: "Resend", icon: "icon-send" },
        menu: [
          { text: "Preview" },
          { text: "Mark as Sent" },
          { text: "Mark as Accepted" },
          { text: "Cancel Estimate", danger: true }
        ],
        openMenu: true
      },
      accepted: {
        save: { show: true, disabled: true },
        primary: { show: true, text: "Create Invoice", icon: "invoice" },
        menu: [
          { text: "Copy Link" },
          { text: "Mark as Declined" },
          { text: "Delete Estimate", danger: true }
        ],
        openMenu: true
      },
      declined: {
        save: { show: true, disabled: true },
        primary: { show: false },
        menu: [
          { text: "Copy Link" },
          { text: "Mark as Sent" },
          { text: "Delete Estimate", danger: true }
        ],
        openMenu: true
      }
    };

    function setPrimaryIcon(svg, id) {
      if (!svg) return;
      if (id === "invoice") {
        svg.innerHTML = '<path d="M6 3.5h8a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" stroke="currentColor" fill="none"></path><path d="M8 7.5h4M8 10.5h4M8 13.5h4" stroke="currentColor" fill="none"></path>';
        return;
      }
      svg.innerHTML = '<use href="#' + id + '"></use>';
    }

    function renderMenu(items) {
      dropdown.innerHTML = items.map(function (item) {
        return '<button type="button" class="topbar-menu-item' + (item.danger ? " is-danger" : "") + '">' + item.text + "</button>";
      }).join("");
    }

    function setMenuOpen(open) {
      dropdown.hidden = !open;
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }

    function applyStatus(status) {
      var cfg = STATES[status] || STATES.draft;
      saveBtn.hidden = !cfg.save.show;
      saveBtn.disabled = !!cfg.save.disabled;
      saveBtn.classList.toggle("is-disabled", !!cfg.save.disabled);
      primaryBtn.hidden = !cfg.primary.show;
      if (cfg.primary.show) {
        primaryBtn.querySelector("span").textContent = cfg.primary.text;
        setPrimaryIcon(primaryBtn.querySelector("svg"), cfg.primary.icon || "icon-send");
      }
      var hasMenu = cfg.menu.length > 0;
      menu.hidden = !hasMenu;
      renderMenu(cfg.menu);
      setMenuOpen(hasMenu && cfg.openMenu);
      tabs.forEach(function (tab) {
        var on = tab.getAttribute("data-status") === status;
        tab.classList.toggle("is-active", on);
        tab.setAttribute("aria-selected", on ? "true" : "false");
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        applyStatus(tab.getAttribute("data-status"));
      });
    });

    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      setMenuOpen(dropdown.hidden);
    });

    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target)) setMenuOpen(false);
    });

    var numberInput = document.getElementById("estimateNumberInput");
    var minusBtn = document.getElementById("estimateMinus");
    var plusBtn = document.getElementById("estimatePlus");
    function bumpNumber(delta) {
      if (!numberInput) return;
      var n = parseInt(numberInput.value, 10);
      if (isNaN(n)) n = 0;
      numberInput.value = String(Math.max(0, n + delta));
    }
    if (minusBtn) minusBtn.addEventListener("click", function () { bumpNumber(-1); });
    if (plusBtn) plusBtn.addEventListener("click", function () { bumpNumber(1); });

    /* Send modal — same flow as estimates.html */
    var sendOverlay = document.getElementById("sendModalOverlay");
    var sendClose = document.getElementById("sendModalClose");
    var sendCancel = document.getElementById("sendModalCancel");
    var sendSubmit = document.getElementById("sendModalSubmit");
    var sendInvoiceName = document.getElementById("sendInvoiceName");
    var sendEmailField = document.getElementById("sendEmailField");
    var sendCcField = document.getElementById("sendCcField");
    var sendBccField = document.getElementById("sendBccField");
    var sendPhoneField = document.getElementById("sendPhoneField");
    var toggleCcButton = document.getElementById("toggleCcButton");
    var toggleBccButton = document.getElementById("toggleBccButton");
    var templateName = document.getElementById("templateName");
    var currentStatus = "draft";

    function setModal(overlay, open) {
      if (!overlay) return;
      overlay.hidden = !open;
      document.body.classList.toggle("modal-open", !!open);
    }

    function setFieldVisibility(el, visible) {
      if (!el) return;
      el.hidden = !visible;
      el.classList.toggle("is-collapsed", !visible);
    }

    function getSendMode() {
      var checked = document.querySelector('input[name="sendAs"]:checked');
      return checked ? checked.value : "email-text";
    }

    function updateSendModalFields() {
      var mode = getSendMode();
      var showEmail = mode === "email" || mode === "email-text";
      var showPhone = mode === "text" || mode === "email-text";
      setFieldVisibility(sendEmailField, showEmail);
      setFieldVisibility(sendPhoneField, showPhone);
      if (!showEmail) {
        setFieldVisibility(sendCcField, false);
        setFieldVisibility(sendBccField, false);
        if (toggleCcButton) toggleCcButton.classList.remove("is-active");
        if (toggleBccButton) toggleBccButton.classList.remove("is-active");
      }
    }

    function openSendModal() {
      if (!sendOverlay) return;
      if (sendInvoiceName) {
        sendInvoiceName.value = (templateName && templateName.textContent.trim()) || "New Invoice";
      }
      updateSendModalFields();
      setModal(sendOverlay, true);
    }

    function closeSendModal() {
      setModal(sendOverlay, false);
    }

    var baseApplyStatus = applyStatus;
    applyStatus = function (status) {
      currentStatus = status;
      baseApplyStatus(status);
    };

    if (primaryBtn) {
      primaryBtn.addEventListener("click", function () {
        if (currentStatus === "accepted") return;
        if (primaryBtn.hidden) return;
        openSendModal();
      });
    }

    document.querySelectorAll('input[name="sendAs"]').forEach(function (radio) {
      radio.addEventListener("change", updateSendModalFields);
    });

    if (toggleCcButton) {
      toggleCcButton.addEventListener("click", function () {
        var show = sendCcField && sendCcField.classList.contains("is-collapsed");
        setFieldVisibility(sendCcField, show);
        toggleCcButton.classList.toggle("is-active", show);
      });
    }
    if (toggleBccButton) {
      toggleBccButton.addEventListener("click", function () {
        var show = sendBccField && sendBccField.classList.contains("is-collapsed");
        setFieldVisibility(sendBccField, show);
        toggleBccButton.classList.toggle("is-active", show);
      });
    }

    if (sendClose) sendClose.addEventListener("click", closeSendModal);
    if (sendCancel) sendCancel.addEventListener("click", closeSendModal);
    if (sendSubmit) sendSubmit.addEventListener("click", closeSendModal);
    if (sendOverlay) {
      sendOverlay.addEventListener("click", function (e) {
        if (e.target === sendOverlay) closeSendModal();
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && sendOverlay && !sendOverlay.hidden) closeSendModal();
    });

    applyStatus("draft");
  }

  /* estimate_pages only — templates/create_invoice use Invoice_template scripts */
  if (isStatusPages) {
    var attachmentCheck = document.getElementById("attachmentCheck");
    var uploadPanel = document.getElementById("uploadPanel");
    if (attachmentCheck && uploadPanel) {
      attachmentCheck.addEventListener("change", function () {
        uploadPanel.hidden = !attachmentCheck.checked;
      });
    }

    var notesEditor = document.getElementById("notesEditor");
    function focusEditor() { if (notesEditor) notesEditor.focus(); }
    function exec(command, value) {
      focusEditor();
      document.execCommand(command, false, value || null);
    }
    function preserveEditorSelection(e) { e.preventDefault(); }
    document.querySelectorAll("[data-command]").forEach(function (button) {
      button.addEventListener("mousedown", preserveEditorSelection);
      button.addEventListener("click", function () {
        exec(this.getAttribute("data-command"), this.getAttribute("data-value"));
      });
    });
    var linkBtn = document.querySelector('[data-action="link"]');
    if (linkBtn) {
      linkBtn.addEventListener("mousedown", preserveEditorSelection);
      linkBtn.addEventListener("click", function () {
        var url = window.prompt("Enter URL");
        if (url) exec("createLink", url);
      });
    }
    var imageBtn = document.getElementById("imageInsertButton");
    var imageInput = document.getElementById("editorImageInput");
    if (imageBtn && imageInput) {
      imageBtn.addEventListener("mousedown", preserveEditorSelection);
      imageBtn.addEventListener("click", function () { imageInput.click(); });
      imageInput.addEventListener("change", function () {
        var file = imageInput.files && imageInput.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (event) {
          focusEditor();
          document.execCommand("insertImage", false, event.target.result);
        };
        reader.readAsDataURL(file);
        imageInput.value = "";
      });
    }
  }

  if (document.body.classList.contains("ep-create-invoice") && window.openInvoiceEditor) {
    window.openInvoiceEditor(null, "create");
  }
}());
