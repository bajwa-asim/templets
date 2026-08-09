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
  var backLink = document.querySelector(".back-link");
  var topbarMenu = document.getElementById("topbarMenu");
  var topbarMenuTrigger = document.getElementById("topbarMenuTrigger");
  var topbarMenuDropdown = document.getElementById("topbarMenuDropdown");
  var copyLinkAction = document.getElementById("copyLinkAction");
  var acceptEstimateAction = document.getElementById("acceptEstimateAction");
  var deleteEstimateAction = document.getElementById("deleteEstimateAction");
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
  var businessEditGrid = document.querySelector(".edit-grid");
  var templateName = document.getElementById("templateName");
  var templateEditButton = document.getElementById("templateEditButton");
  var payBadge = document.getElementById("payBadge");
  var estimateMinus = document.getElementById("estimateMinus");
  var estimatePlus = document.getElementById("estimatePlus");
  var autoTaxToggle = document.getElementById("autoTaxToggle");
  var paymentScheduleButton = document.getElementById("paymentScheduleButton");
  var sendInvoiceToggle = document.getElementById("sendInvoiceToggle");
  var dateTriggers = document.querySelectorAll(".date-trigger");
  var pageParams = new URLSearchParams(window.location.search);
  var currentEstimateStatus = pageParams.get("status") || "";
  var isSentEstimate = currentEstimateStatus === "sent";
  var isAcceptedEstimate = currentEstimateStatus === "accepted";
  var isDeclinedEstimate = currentEstimateStatus === "declined";
  var savedRange = null;

  function money(value) {
    return "$" + Number(value || 0).toFixed(2);
  }

  function formatDate(value) {
    if (!value) return "";
    var date = new Date(value + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
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
      "+92447475763830",
      "Oxford Street",
      "London, Greater London",
      "W1C 1JT",
      "GB"
    ].join("<br>");

    document.getElementById("previewBilledTo").innerHTML = [
      customerName.value === "Select customer" ? "John's Company" : customerName.value,
      "John Doe 1234 Main Street Austin, Texas 54321 US"
    ].join("<br>");

    document.getElementById("previewInvoiceNumber").textContent = "EST-" + String(invoiceNumber.value || "10");
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
    var discountAmount = discountMode === "percent" ? subtotal * Number(discountValue.value || 0) / 100 : Number(discountValue.value || 0);
    var amountDue = Math.max(0, subtotal + totalTax - discountAmount);

    document.getElementById("subtotalOutput").textContent = money(subtotal);
    document.getElementById("amountDueOutput").textContent = money(amountDue);
    document.getElementById("previewSubtotal").textContent = money(subtotal);
    document.getElementById("previewTax").textContent = money(totalTax);
    document.getElementById("previewAmountDue").textContent = money(amountDue);
    if (payBadge) payBadge.textContent = "Pay " + money(amountDue);
    document.getElementById("previewIssueDate").textContent = formatDate(issueDateInput.value) || "August 4, 2026";
    document.getElementById("previewDueDate").textContent = formatDate(dueDateInput.value) || "August 18, 2026";
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
    if (selection.rangeCount > 0) savedRange = selection.getRangeAt(0).cloneRange();
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

  function openSendModal() {
    if (!sendModalOverlay) return;
    sendInvoiceName.value = templateName.textContent.trim() || "New Invoice";
    updateSendModalFields();
    sendModalOverlay.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeSendModal() {
    if (!sendModalOverlay) return;
    sendModalOverlay.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function openTopbarMenu() {
    if (!topbarMenuDropdown || !topbarMenuTrigger) return;
    topbarMenuDropdown.hidden = false;
    topbarMenuTrigger.setAttribute("aria-expanded", "true");
  }

  function closeTopbarMenu() {
    if (!topbarMenuDropdown || !topbarMenuTrigger) return;
    topbarMenuDropdown.hidden = true;
    topbarMenuTrigger.setAttribute("aria-expanded", "false");
  }

  function toggleTopbarMenu() {
    if (!topbarMenuDropdown || topbarMenuDropdown.hidden) {
      openTopbarMenu();
    } else {
      closeTopbarMenu();
    }
  }

  function setButtonLabel(button, text) {
    var label = button && button.querySelector("span");
    if (label) label.textContent = text;
  }

  function setButtonIcon(button, variant) {
    var icon = button && button.querySelector("svg");
    if (!icon) return;

    if (variant === "invoice") {
      icon.innerHTML = '<path d="M6 3.5h8a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z"></path><path d="M8 7.5h4M8 10.5h4M8 13.5h4"></path>';
      return;
    }

    icon.innerHTML = '<path d="M16.5 4.5 8.2 12.8"></path><path d="m16.5 4.5-5.4 10.8-1.7-5.1-5.1-1.7z"></path>';
  }

  function setupTopbarActions() {
    if (!isSentEstimate && !isAcceptedEstimate && !isDeclinedEstimate) return;

    if (topbarMenu) {
      topbarMenu.hidden = false;
    }

    if (backLink) {
      backLink.setAttribute("href", "estimates.html");
    }

    if (isSentEstimate) {
      setButtonLabel(sendButton, "Resend");
      setButtonIcon(sendButton, "send");
      if (acceptEstimateAction) {
        acceptEstimateAction.textContent = "Mark as Accepted";
      }
      return;
    }

    if (isAcceptedEstimate) {
      setButtonLabel(sendButton, "Create Invoice");
      setButtonIcon(sendButton, "invoice");
      saveButton.disabled = true;
      saveButton.classList.add("is-disabled");
      if (acceptEstimateAction) {
        acceptEstimateAction.textContent = "Unmark as Accepted";
      }
      return;
    }

    if (isDeclinedEstimate) {
      sendButton.hidden = true;
      saveButton.disabled = true;
      saveButton.classList.add("is-disabled");
      if (acceptEstimateAction) {
        acceptEstimateAction.textContent = "Unmark as Declined";
      }
    }
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
    saveButton.querySelector("span").textContent = "Saved";
    setTimeout(function () { saveButton.querySelector("span").textContent = "Save"; }, 1500);
  });

  sendButton.addEventListener("click", function () {
    openSendModal();
  });

  if (sendModalClose) {
    sendModalClose.addEventListener("click", closeSendModal);
  }

  if (sendModalCancel) {
    sendModalCancel.addEventListener("click", closeSendModal);
  }

  if (sendModalSubmit) {
    sendModalSubmit.addEventListener("click", function () {
      closeSendModal();
      window.location.href = "estimate-preview.html";
    });
  }

  if (sendModalOverlay) {
    sendModalOverlay.addEventListener("click", function (event) {
      if (event.target === sendModalOverlay) closeSendModal();
    });
  }

  if (topbarMenuTrigger) {
    topbarMenuTrigger.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleTopbarMenu();
    });
  }

  if (copyLinkAction) {
    copyLinkAction.addEventListener("click", function () {
      closeTopbarMenu();
      saveButton.querySelector("span").textContent = "Link Copied";
      setTimeout(function () { saveButton.querySelector("span").textContent = "Save"; }, 1500);
    });
  }

  if (acceptEstimateAction) {
    acceptEstimateAction.addEventListener("click", function () {
      closeTopbarMenu();
      if (isDeclinedEstimate) {
        acceptEstimateAction.textContent = "Declined Removed";
        setTimeout(function () { acceptEstimateAction.textContent = "Unmark as Declined"; }, 1500);
      } else if (isAcceptedEstimate) {
        acceptEstimateAction.textContent = "Accepted Removed";
        setTimeout(function () { acceptEstimateAction.textContent = "Unmark as Accepted"; }, 1500);
      } else {
        acceptEstimateAction.textContent = "Accepted";
        setTimeout(function () { acceptEstimateAction.textContent = "Mark as Accepted"; }, 1500);
      }
    });
  }

  if (deleteEstimateAction) {
    deleteEstimateAction.addEventListener("click", function () {
      window.location.href = "estimates.html";
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
    if (event.key === "Escape" && topbarMenuDropdown && !topbarMenuDropdown.hidden) {
      closeTopbarMenu();
    }
    if (event.key === "Escape" && sendModalOverlay && !sendModalOverlay.hidden) {
      closeSendModal();
    }
  });

  document.addEventListener("click", function (event) {
    if (topbarMenu && !topbarMenu.hidden && !topbarMenu.contains(event.target)) {
      closeTopbarMenu();
    }
  });

  templateEditButton.addEventListener("click", function () {
    templateName.focus();
    document.execCommand("selectAll", false, null);
  });

  [companyName, companyEmail, companyPhone, companyAddress, invoiceNumber, customerName, discountValue, taxValue, issueDateInput, dueDateInput].forEach(function (field) {
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

  estimateMinus.addEventListener("click", function () {
    invoiceNumber.value = Math.max(1, Number(invoiceNumber.value || 1) - 1);
    updateInvoice();
  });

  estimatePlus.addEventListener("click", function () {
    invoiceNumber.value = Number(invoiceNumber.value || 0) + 1;
    updateInvoice();
  });

  autoTaxToggle.addEventListener("change", function () {
    Array.prototype.slice.call(document.querySelectorAll(".item-tax")).forEach(function (input) {
      input.value = autoTaxToggle.checked ? 5 : 0;
    });
    updateInvoice();
  });

  paymentScheduleButton.addEventListener("click", function () {
    paymentScheduleButton.textContent = "Payment Schedule Added";
    setTimeout(function () { paymentScheduleButton.textContent = "Add Payment Schedule"; }, 1500);
  });

  sendInvoiceToggle.addEventListener("change", function () {
    sendButton.style.visibility = this.checked ? "visible" : "hidden";
  });

  dateTriggers.forEach(function (button) {
    button.addEventListener("click", function () {
      var target = document.getElementById(this.getAttribute("data-target"));
      if (!target) return;
      if (typeof target.showPicker === "function") {
        target.showPicker();
      } else {
        target.focus();
        target.click();
      }
    });
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

  addRow({ name: "Product 1", price: 20, qty: 2, tax: 0 });
  addRow({ name: "Product 1", price: 20, qty: 2, tax: 0 });
  addRow({ name: "Product 1", price: 20, qty: 2, tax: 0 });
  notesEditor.innerHTML = "";
  notesEditor.style.lineHeight = lineHeightSelect.value;
  setupTopbarActions();
  updateInvoice();
}());
