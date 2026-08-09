/* Shared Pages helpers — estimate_pages status tabs + shared extras */
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".ep-demo-tab"));
  var isTemplatePage = document.body.classList.contains("ep-template-page");
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

    applyStatus("draft");

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
  }

  /* estimate_pages-only extras (templates already wired by script.js / estimate.js) */
  if (!isTemplatePage) {
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
    document.querySelectorAll("[data-command]").forEach(function (button) {
      button.addEventListener("click", function () {
        exec(this.getAttribute("data-command"), this.getAttribute("data-value"));
      });
    });
    var linkBtn = document.querySelector('[data-action="link"]');
    if (linkBtn) {
      linkBtn.addEventListener("click", function () {
        var url = window.prompt("Enter URL");
        if (url) exec("createLink", url);
      });
    }
    var imageBtn = document.getElementById("imageInsertButton");
    var imageInput = document.getElementById("editorImageInput");
    if (imageBtn && imageInput) {
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
    if (window.initEditorMenus) window.initEditorMenus();
  } else if (window.initEditorMenus) {
    window.initEditorMenus();
  }
}());
