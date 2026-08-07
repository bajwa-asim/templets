(function () {
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
      (companyAddress.value || "-").split(" ").slice(0, 2).join(" "),
      (companyAddress.value || "-").split(" ").slice(2).join(" ") || "-"
    ].join("<br>");

    document.getElementById("previewBilledTo").innerHTML = [
      companyName.value || "ABC 3",
      companyAddress.value || "-"
    ].join("<br>");

    document.getElementById("previewInvoiceNumber").textContent = "INV-" + (invoiceNumber.value || "0");
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
    document.getElementById("payBadge").textContent = "Pay " + money(amountDue);

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

  document.getElementById("closeGateway").addEventListener("click", function () {
    document.getElementById("gatewayCard").style.display = "none";
  });

  saveButton.addEventListener("click", function () {
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
  updateInvoice();
}());
