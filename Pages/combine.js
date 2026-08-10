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
