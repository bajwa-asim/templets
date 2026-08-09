/* ===== Estimates Store ===== */
window.EstimatesStore = (function () {
  var KEY = "stitch_gb_estimates";

  var seed = [
    { id: 1, name: "New Estimate", number: "EST-000004", customer: "Olivia Rhye", handle: "@olivia", issueDate: "2026-04-20", dueDate: "2026-05-04", value: 20, status: "draft", estimateNum: "000004" },
    { id: 2, name: "New Estimate", number: "EST-000005", customer: "Phoenix Baker", handle: "@phoenix", issueDate: "2026-04-20", dueDate: "2026-05-04", value: 20, status: "accepted", estimateNum: "000005" },
    { id: 3, name: "New Estimate", number: "EST-000006", customer: "Phoenix Baker", handle: "@phoenix", issueDate: "2026-04-20", dueDate: "2026-05-04", value: 20, status: "declined", estimateNum: "000006" },
    { id: 4, name: "New Estimate", number: "EST-000007", customer: "Phoenix Baker", handle: "@phoenix", issueDate: "2026-04-20", dueDate: "2026-05-04", value: 20, status: "invoiced", estimateNum: "000007" },
    { id: 5, name: "New Estimate", number: "EST-000008", customer: "Lana Steiner", handle: "@lana", issueDate: "2026-04-20", dueDate: "2026-05-04", value: 20, status: "sent", estimateNum: "000008" },
    { id: 6, name: "Q2 Estimate", number: "EST-000009", customer: "Candice Wu", handle: "@candice", issueDate: "2026-03-12", dueDate: "2026-03-26", value: 1200, status: "sent", estimateNum: "000009" },
    { id: 7, name: "Website Estimate", number: "EST-000010", customer: "Natali Craig", handle: "@natali", issueDate: "2026-02-14", dueDate: "2026-02-28", value: 650, status: "draft", estimateNum: "000010" },
    { id: 8, name: "Support Renewal", number: "EST-000011", customer: "Drew Cano", handle: "@drew", issueDate: "2026-05-05", dueDate: "2026-05-19", value: 880, status: "accepted", estimateNum: "000011" },
    { id: 9, name: "Brand Retainer", number: "EST-000012", customer: "Orlando Diggs", handle: "@orlando", issueDate: "2026-01-25", dueDate: "2026-02-08", value: 410, status: "declined", estimateNum: "000012" },
    { id: 10, name: "Annual Package", number: "EST-000013", customer: "Alec Whitten", handle: "@alec", issueDate: "2026-05-28", dueDate: "2026-06-11", value: 1500, status: "invoiced", estimateNum: "000013" }
  ];

  function buildSeed() {
    var list = [];
    for (var i = 0; i < 50; i += 1) {
      var base = seed[i % seed.length];
      var d = new Date(base.issueDate + "T00:00:00");
      d.setDate(d.getDate() + i);
      var due = new Date(d);
      due.setDate(due.getDate() + 14);
      list.push({
        id: i + 1,
        name: i < 5 ? base.name : base.name + " " + (i + 1),
        number: "EST-" + String(4 + i).padStart(6, "0"),
        estimateNum: String(4 + i).padStart(6, "0"),
        customer: base.customer,
        handle: base.handle,
        issueDate: d.toISOString().slice(0, 10),
        dueDate: due.toISOString().slice(0, 10),
        value: base.value + (i % 6) * 15,
        status: base.status,
        companyName: "ABC 3",
        companyEmail: "riley.bennett@corporate.net",
        companyPhone: "+13141236547",
        companyAddress: "Oxford Street United Kingdom",
        products: [
          { name: "Product 1", price: 20, qty: 2, tax: 0 },
          { name: "Product 1", price: 20, qty: 2, tax: 0 },
          { name: "Product 1", price: 20, qty: 2, tax: 0 }
        ]
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

  function getAll() {
    return load();
  }

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
    var list = load().filter(function (item) { return item.id !== id; });
    save(list);
  }

  function setStatus(id, status) {
    var item = getById(id);
    if (!item) return null;
    item.status = status;
    return upsert(item);
  }

  function nextId() {
    var list = load();
    var max = 0;
    list.forEach(function (item) {
      if (item.id > max) max = item.id;
    });
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
    viewPreview.hidden = name !== "preview";
    document.body.classList.toggle("estimate-preview-page", name === "preview");
    document.body.classList.remove("modal-open");
    window.scrollTo(0, 0);
  }
  function setModal(overlay, open) {
    if (!overlay) return;
    overlay.hidden = !open;
    document.body.classList.toggle("modal-open", !!open);
  }
  window.EstimatesApp = {
    showList: function () { showView("list"); if (window.refreshEstimatesList) window.refreshEstimatesList(); },
    showEditor: function () { showView("editor"); },
    showPreview: function () { showView("preview"); },
    setModal: setModal
  };
  showView("list");
}());


/* ===== Estimates List ===== */
(function () {
  var estimates = window.EstimatesStore.getAll();

  var statusOrder = ["sent", "accepted", "declined", "invoiced"];
  var state = {
    status: "all",
    search: "",
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    page: 1,
    pageSize: Number(document.getElementById("pageSizeSelect").value)
  };

  var summaryCards = document.getElementById("summaryCards");
  var statusTabs = Array.prototype.slice.call(document.querySelectorAll(".estimate-tab"));
  var searchInput = document.getElementById("searchInput");
  var startDateInput = document.getElementById("startDate");
  var endDateInput = document.getElementById("endDate");
  var pageSizeSelect = document.getElementById("pageSizeSelect");
  var tableBody = document.getElementById("estimateTableBody");
  var emptyState = document.getElementById("emptyState");
  var resultsMeta = document.getElementById("resultsMeta");
  var pagination = document.getElementById("pagination");

  function persist() {
    window.EstimatesStore.save(estimates);
  }

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

  function getSummaryData() {
    return statusOrder.map(function (status) {
      var items = estimates.filter(function (item) { return item.status === status; });
      return {
        status: status,
        count: items.length,
        total: items.reduce(function (sum, item) { return sum + Number(item.value || 0); }, 0)
      };
    });
  }

  function renderSummary() {
    summaryCards.innerHTML = getSummaryData().map(function (item) {
      return [
        '<article class="summary-card">',
        '<div class="summary-label">', item.count, ' in ', item.status, '</div>',
        '<div class="summary-value">', formatMoney(item.total), '</div>',
        '</article>'
      ].join("");
    }).join("");
  }

  function matchesFilters(item) {
    var itemDate = item.issueDate;
    var statusMatch = state.status === "all" || item.status === state.status;
    var startMatch = !state.startDate || itemDate >= state.startDate;
    var endMatch = !state.endDate || itemDate <= state.endDate;
    var searchNeedle = state.search.trim().toLowerCase();
    var searchMatch = !searchNeedle || [
      item.name, item.number, item.customer, item.handle, item.status
    ].join(" ").toLowerCase().indexOf(searchNeedle) !== -1;
    return statusMatch && startMatch && endMatch && searchMatch;
  }

  function getFilteredEstimates() {
    return estimates.filter(matchesFilters);
  }

  function getPagedItems(items) {
    var start = (state.page - 1) * state.pageSize;
    return items.slice(start, start + state.pageSize);
  }

  function getStatusBadge(status) {
    return '<span class="estimate-badge badge-' + status + '">' + status.charAt(0).toUpperCase() + status.slice(1) + "</span>";
  }

  function getActionButton(action, label, svg) {
    return [
      '<button type="button" class="estimate-action-btn" data-action="', action, '" aria-label="', label, '" title="', label, '">',
      svg,
      "</button>"
    ].join("");
  }

  function renderTable() {
    var filtered = getFilteredEstimates();
    var totalRows = filtered.length;
    var totalPages = Math.max(1, Math.ceil(totalRows / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;
    var items = getPagedItems(filtered);

    tableBody.innerHTML = items.map(function (item) {
      return [
        '<tr data-id="', item.id, '">',
        '<td><a href="#" class="estimate-link" data-open-id="', item.id, '" data-open-status="', item.status, '">', item.name, "</a></td>",
        "<td>", item.number, "</td>",
        '<td><div class="estimate-customer-cell"><span class="estimate-avatar ', getAvatarTone(item.customer), '">', getInitials(item.customer), '</span><div><div class="estimate-customer-name">', item.customer, '</div><div class="estimate-customer-handle">', item.handle || "", "</div></div></div></td>",
        "<td>", formatShortDate(item.issueDate), "</td>",
        "<td>", formatMoney(item.value), "</td>",
        "<td>", getStatusBadge(item.status), "</td>",
        '<td><div class="estimate-actions">',
        getActionButton("open", "Open", '<svg viewBox="0 0 24 24"><path d="M14 5h5v5"></path><path d="M10 14 19 5"></path><path d="M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4"></path></svg>'),
        getActionButton("copy", "Duplicate", '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="10" height="10" rx="2"></rect><path d="M15 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path></svg>'),
        getActionButton("history", "Change Status", '<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 4v5h5"></path><path d="M12 7v5l3 2"></path></svg>'),
        getActionButton(item.status === "invoiced" ? "view" : "edit", item.status === "invoiced" ? "View" : "Edit", item.status === "invoiced"
          ? '<svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z"></path><circle cx="12" cy="12" r="2.8"></circle></svg>'
          : '<svg viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"></path></svg>'),
        getActionButton("delete", "Delete", '<svg viewBox="0 0 24 24"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6M14 11v6"></path></svg>'),
        "</div></td>",
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
      buttons.push('<button type="button" class="estimate-page-btn' + (page === state.page ? ' is-current' : '') + '" data-page="' + page + '">' + page + "</button>");
    }
    buttons.push('<button type="button" class="estimate-page-btn estimate-icon-page" data-page="' + Math.min(totalPages, state.page + 1) + '" aria-label="Next page"><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"></path></svg></button>');
    buttons.push('<button type="button" class="estimate-page-btn" data-page="' + totalPages + '">Last</button>');
    pagination.innerHTML = buttons.join("");
  }

  function cycleStatus(item) {
    var nextMap = { draft: "sent", sent: "accepted", accepted: "declined", declined: "invoiced", invoiced: "draft" };
    item.status = nextMap[item.status] || "draft";
  }

  function bindEvents() {
    statusTabs.forEach(function (button) {
      button.addEventListener("click", function () {
        state.status = this.getAttribute("data-status");
        state.page = 1;
        statusTabs.forEach(function (tab) { tab.classList.remove("is-active"); });
        this.classList.add("is-active");
        render();
      });
    });

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

    tableBody.addEventListener("click", function (event) {
      var actionButton = event.target.closest("[data-action]");
      if (!actionButton) return;

      var row = actionButton.closest("tr");
      var itemId = Number(row.getAttribute("data-id"));
      var item = estimates.find(function (entry) { return entry.id === itemId; });
      var action = actionButton.getAttribute("data-action");
      if (!item) return;

      if (action === "copy") {
        var clone = Object.assign({}, item, {
          id: window.EstimatesStore.nextId(),
          number: "EST-" + String(Math.floor(Math.random() * 900000) + 100000),
          status: "draft"
        });
        clone.estimateNum = clone.number.replace(/^EST-/, "");
        estimates.unshift(clone);
        persist();
      }

      if (action === "open" || action === "edit" || action === "view") {
        window.openEstimateEditor(item.id, item.status, action);
        return;
      }

      if (action === "history") {
        cycleStatus(item);
        persist();
      }

      if (action === "delete") {
        estimates = estimates.filter(function (entry) { return entry.id !== itemId; });
        persist();
      }

      render();
    });
  }

  function render() {
    renderSummary();
    renderTable();
  }

  tableBody.addEventListener("click", function (event) {
    var link = event.target.closest("a.estimate-link");
    if (!link) return;
    event.preventDefault();
    window.openEstimateEditor(Number(link.getAttribute("data-open-id")), link.getAttribute("data-open-status"), "open");
  });
  var createBtn = document.querySelector(".estimate-primary-btn");
  if (createBtn) {
    createBtn.setAttribute("href", "#");
    createBtn.addEventListener("click", function (event) {
      event.preventDefault();
      window.openEstimateEditor(null, "draft", "create");
    });
  }
  window.refreshEstimatesList = function () {
    estimates = window.EstimatesStore.getAll();
    render();
  };
  bindEvents();
  render();
}());


/* ===== Estimate Editor ===== */
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
  var invoiceModalOverlay = document.getElementById("invoiceModalOverlay");
  var invoiceModalClose = document.getElementById("invoiceModalClose");
  var invoiceModalCancel = document.getElementById("invoiceModalCancel");
  var invoiceModalConfirm = document.getElementById("invoiceModalConfirm");
  var markAsInvoicedCheck = document.getElementById("markAsInvoicedCheck");
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
  var estimateMinus = document.getElementById("estimateMinus");
  var estimatePlus = document.getElementById("estimatePlus");
  var autoTaxToggle = document.getElementById("autoTaxToggle");
  var paymentScheduleButton = document.getElementById("paymentScheduleButton");
  var sendInvoiceToggle = document.getElementById("sendInvoiceToggle");
  var dateTriggers = document.querySelectorAll(".date-trigger");
  var currentEstimateId = null;
  var currentEstimateStatus = "draft";
  var isSentEstimate = currentEstimateStatus === "sent";
  var isAcceptedEstimate = currentEstimateStatus === "accepted";
  var isDeclinedEstimate = currentEstimateStatus === "declined";
  var isInvoicedEstimate = currentEstimateStatus === "invoiced";
  var savedRange = null;
  var activeEstimate = null;

  if (backLink) {
    backLink.setAttribute("href", "#");
    backLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.EstimatesApp.showList();
    });
  }

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
    window.EstimatesApp.setModal(sendModalOverlay, true);
  }

  function closeSendModal() {
    window.EstimatesApp.setModal(sendModalOverlay, false);
  }

  function openInvoiceModal() {
    if (markAsInvoicedCheck) markAsInvoicedCheck.checked = true;
    window.EstimatesApp.setModal(invoiceModalOverlay, true);
  }

  function closeInvoiceModal() {
    window.EstimatesApp.setModal(invoiceModalOverlay, false);
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

  function getHandle(name) {
    var clean = String(name || "customer").toLowerCase().replace(/[^a-z0-9]+/g, "");
    return "@" + (clean.slice(0, 12) || "customer");
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
    return Math.max(0, subtotal + itemTaxTotal + extraTax - discountAmount);
  }

  function collectEstimateData(statusOverride) {
    var num = String(invoiceNumber.value || "2");
    var customer = customerName.value || "Select customer";
    if (customer === "Select customer") customer = (activeEstimate && activeEstimate.customer) || "New Customer";
    return {
      id: currentEstimateId || window.EstimatesStore.nextId(),
      name: (templateName.textContent || "").trim() || "New Estimate",
      number: "EST-" + num,
      estimateNum: num,
      customer: customer,
      handle: (activeEstimate && activeEstimate.handle) || getHandle(customer),
      issueDate: issueDateInput.value || "2026-08-04",
      dueDate: dueDateInput.value || "2026-08-18",
      value: Number(calcAmountDue().toFixed(2)),
      status: statusOverride || currentEstimateStatus || "draft",
      companyName: companyName.value || "ABC 3",
      companyEmail: companyEmail.value || "",
      companyPhone: companyPhone.value || "",
      companyAddress: companyAddress.value || "",
      products: getRows(),
      notes: notesEditor.innerHTML || ""
    };
  }

  function saveEstimate(statusOverride) {
    var data = collectEstimateData(statusOverride);
    window.EstimatesStore.upsert(data);
    currentEstimateId = data.id;
    currentEstimateStatus = data.status;
    activeEstimate = data;
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

  function loadEstimateIntoForm(item) {
    if (!item) return;
    templateName.textContent = item.name || "Estimate Name";
    companyName.value = item.companyName || companyName.value;
    companyEmail.value = item.companyEmail || companyEmail.value;
    companyPhone.value = item.companyPhone || companyPhone.value;
    companyAddress.value = item.companyAddress || companyAddress.value;
    invoiceNumber.value = item.estimateNum || String(item.number || "").replace(/^EST-/, "") || invoiceNumber.value;
    fillCustomerSelect(item.customer);
    if (item.issueDate) issueDateInput.value = item.issueDate;
    if (item.dueDate) dueDateInput.value = item.dueDate;
    if (item.notes) notesEditor.innerHTML = item.notes;
    productRows.innerHTML = "";
    var products = item.products && item.products.length
      ? item.products
      : [{ name: "Product 1", price: 20, qty: 2, tax: 0 }];
    products.forEach(function (row) {
      addRow({ name: row.name, price: row.price, qty: row.qty, tax: row.tax });
    });
  }

  function setupTopbarActions() {
    if (backLink) backLink.setAttribute("href", "estimates.html");

    if (!isSentEstimate && !isAcceptedEstimate && !isDeclinedEstimate && !isInvoicedEstimate) return;

    if (topbarMenu) topbarMenu.hidden = false;

    if (isSentEstimate) {
      setButtonLabel(sendButton, "Resend");
      setButtonIcon(sendButton, "send");
      if (acceptEstimateAction) acceptEstimateAction.textContent = "Mark as Accepted";
      return;
    }

    if (isAcceptedEstimate) {
      setButtonLabel(sendButton, "Create Invoice");
      setButtonIcon(sendButton, "invoice");
      saveButton.disabled = true;
      saveButton.classList.add("is-disabled");
      if (acceptEstimateAction) acceptEstimateAction.textContent = "Unmark as Accepted";
      return;
    }

    if (isDeclinedEstimate) {
      sendButton.hidden = true;
      saveButton.disabled = true;
      saveButton.classList.add("is-disabled");
      if (acceptEstimateAction) acceptEstimateAction.textContent = "Unmark as Declined";
      return;
    }

    if (isInvoicedEstimate) {
      sendButton.hidden = true;
      saveButton.disabled = true;
      saveButton.classList.add("is-disabled");
      if (topbarMenu) topbarMenu.hidden = false;
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
    if (saveButton.disabled) return;
    saveEstimate(currentEstimateStatus === "sent" ? "sent" : (currentEstimateStatus || "draft"));
    saveButton.querySelector("span").textContent = "Saved";
    setTimeout(function () { saveButton.querySelector("span").textContent = "Save"; }, 1500);
  });

  sendButton.addEventListener("click", function () {
    if (isAcceptedEstimate) {
      openInvoiceModal();
      return;
    }
    openSendModal();
  });

  if (invoiceModalClose) invoiceModalClose.addEventListener("click", closeInvoiceModal);
  if (invoiceModalCancel) invoiceModalCancel.addEventListener("click", closeInvoiceModal);
  if (invoiceModalOverlay) {
    invoiceModalOverlay.addEventListener("click", function (event) {
      if (event.target === invoiceModalOverlay) closeInvoiceModal();
    });
  }
  if (invoiceModalConfirm) {
    invoiceModalConfirm.addEventListener("click", function () {
      var nextStatus = markAsInvoicedCheck && markAsInvoicedCheck.checked ? "invoiced" : "accepted";
      saveEstimate(nextStatus);
      closeInvoiceModal();
      window.EstimatesApp.showList();
    });
  }

  if (sendModalClose) {
    sendModalClose.addEventListener("click", closeSendModal);
  }

  if (sendModalCancel) {
    sendModalCancel.addEventListener("click", closeSendModal);
  }

  if (sendModalSubmit) {
    sendModalSubmit.addEventListener("click", function () {
      var data = saveEstimate("sent");
      closeSendModal();
      window.openEstimatePreview(data.id, "pending");
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
      if (isDeclinedEstimate || isAcceptedEstimate) {
        saveEstimate("sent");
        window.openEstimateEditor(currentEstimateId, "sent", "edit");
        return;
      }
      saveEstimate("accepted");
      window.openEstimateEditor(currentEstimateId, "accepted", "edit");
    });
  }

  if (deleteEstimateAction) {
    deleteEstimateAction.addEventListener("click", function () {
      if (currentEstimateId) window.EstimatesStore.remove(currentEstimateId);
      window.EstimatesApp.showList();
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
    if (event.key === "Escape" && invoiceModalOverlay && !invoiceModalOverlay.hidden) {
      closeInvoiceModal();
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

  window.openEstimateEditor = function (id, status) {
    currentEstimateId = id ? Number(id) : null;
    currentEstimateStatus = status || "draft";
    isSentEstimate = currentEstimateStatus === "sent";
    isAcceptedEstimate = currentEstimateStatus === "accepted";
    isDeclinedEstimate = currentEstimateStatus === "declined";
    isInvoicedEstimate = currentEstimateStatus === "invoiced";
    activeEstimate = currentEstimateId ? window.EstimatesStore.getById(currentEstimateId) : null;

    productRows.innerHTML = "";
    sendButton.hidden = false;
    saveButton.disabled = false;
    saveButton.classList.remove("is-disabled");
    setButtonLabel(sendButton, "Send");
    setButtonIcon(sendButton, "send");
    if (topbarMenu) topbarMenu.hidden = true;

    if (activeEstimate) {
      loadEstimateIntoForm(activeEstimate);
    } else {
      templateName.textContent = "Estimate Name";
      invoiceNumber.value = String(window.EstimatesStore.nextId() + 3);
      addRow({ name: "Product 1", price: 20, qty: 2, tax: 0 });
      addRow({ name: "Product 1", price: 20, qty: 2, tax: 0 });
      addRow({ name: "Product 1", price: 20, qty: 2, tax: 0 });
      notesEditor.innerHTML = "";
    }
    notesEditor.style.lineHeight = lineHeightSelect.value;
    setupTopbarActions();
    updateInvoice();
    window.EstimatesApp.showEditor();
  };
}());


/* ===== Estimate Preview ===== */
(function () {
  var estimateId = null;
  var estimate = null;
  var card = document.getElementById("estimatePreviewCard");
  var pendingActions = document.getElementById("pendingActions");
  var acceptedActions = document.getElementById("acceptedActions");
  var badgeAccepted = document.getElementById("statusBadgeAccepted");
  var badgeDeclined = document.getElementById("statusBadgeDeclined");
  var rejectBtn = document.getElementById("rejectEstimateBtn");
  var acceptBtn = document.getElementById("acceptEstimateBtn");
  var overlay = document.getElementById("acceptModalOverlay");
  var closeBtn = document.getElementById("acceptModalClose");
  var cancelBtn = document.getElementById("acceptModalCancel");
  var submitBtn = document.getElementById("acceptModalSubmit");
  var status = "pending";

  function money(value) {
    return "$" + Number(value || 0).toFixed(2);
  }

  function formatDate(value) {
    if (!value) return "-";
    var date = new Date(value + "T00:00:00");
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  function formatCreated(value) {
    if (!value) return "Aug 7, 2026";
    var date = new Date(value + "T00:00:00");
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function fillPreview() {
    if (!estimate) return;
    var createdEl = document.querySelector(".ep-created");
    if (createdEl) createdEl.textContent = "Created: " + formatCreated(estimate.issueDate);

    var companyEl = document.querySelector(".company-meta");
    if (companyEl) {
      companyEl.innerHTML = [
        estimate.companyName || "ABC 3",
        estimate.companyPhone || "+92447475763830",
        "Oxford Street",
        "London, Greater London",
        "W1C 1JT",
        "GB"
      ].join("<br>");
    }

    var billed = document.querySelector(".preview-meta-grid p");
    if (billed) billed.innerHTML = (estimate.customer || "John's Company") + "<br>1234 Main Street Austin, Texas 54321 US";

    var metaPs = document.querySelectorAll(".preview-meta-grid p");
    if (metaPs[1]) metaPs[1].textContent = estimate.number || "EST-04";
    if (metaPs[2]) metaPs[2].textContent = formatDate(estimate.issueDate);
    if (metaPs[3]) metaPs[3].textContent = formatDate(estimate.dueDate);

    var tbody = document.querySelector(".preview-table tbody");
    var products = estimate.products && estimate.products.length ? estimate.products : [
      { name: "Product 1", price: 20, qty: 2, tax: 0, subtotal: 20 }
    ];
    if (tbody) {
      tbody.innerHTML = products.map(function (row) {
        var sub = row.subtotal != null ? row.subtotal : (Number(row.price) * Number(row.qty));
        return "<tr><td>" + (row.name || "Product") + "</td><td>" + money(row.price).replace(".00", "") + "</td><td>" + row.qty + "</td><td>" + (row.tax ? row.tax + "%" : "-") + "</td><td class='text-right'>" + money(sub).replace(".00", "") + "</td></tr>";
      }).join("");
    }

    var lines = document.querySelectorAll(".preview-totals .preview-total-line strong");
    var value = money(estimate.value);
    if (lines[0]) lines[0].textContent = value;
    if (lines[1]) lines[1].textContent = value;
    if (lines[2]) lines[2].textContent = value;
  }

  function setStatus(next) {
    status = next;
    card.setAttribute("data-status", next);
    badgeAccepted.hidden = next !== "accepted";
    badgeDeclined.hidden = next !== "declined";
    pendingActions.hidden = next !== "pending";
    acceptedActions.hidden = next !== "accepted";
    if (estimateId && (next === "accepted" || next === "declined")) {
      window.EstimatesStore.setStatus(estimateId, next);
    }
  }

  function openModal() { window.EstimatesApp.setModal(overlay, true); }
  function closeModal() { window.EstimatesApp.setModal(overlay, false); }

  acceptBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });
  submitBtn.addEventListener("click", function () {
    closeModal();
    setStatus("accepted");
  });
  rejectBtn.addEventListener("click", function () {
    setStatus("declined");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) closeModal();
  });

  window.openEstimatePreview = function (id, nextStatus) {
    estimateId = id ? Number(id) : null;
    estimate = estimateId ? window.EstimatesStore.getById(estimateId) : null;
    status = nextStatus || "pending";
    if (estimate && estimate.status === "accepted") status = "accepted";
    if (estimate && estimate.status === "declined") status = "declined";
    if (estimate && estimate.status === "sent" && status !== "accepted" && status !== "declined") status = "pending";
    fillPreview();
    if (status === "accepted" || status === "declined") setStatus(status);
    else setStatus("pending");
    window.EstimatesApp.showPreview();
  };
}());
