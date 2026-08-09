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
    edit: '<svg viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"></path></svg>',
    view: '<svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z"></path><circle cx="12" cy="12" r="2.8"></circle></svg>',
    download: '<svg viewBox="0 0 24 24"><path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path></svg>',
    copy: '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="10" height="10" rx="2"></rect><path d="M15 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path></svg>',
    percent: '<svg viewBox="0 0 24 24"><path d="M19 5 5 19"></path><circle cx="7.5" cy="7.5" r="2.5"></circle><circle cx="16.5" cy="16.5" r="2.5"></circle></svg>',
    save: '<svg viewBox="0 0 24 24"><path d="M6 3.5h10l2 2V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z"></path><path d="M8 3.5v5h8v-5M8 14h8"></path></svg>',
    delete: '<svg viewBox="0 0 24 24"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6M14 11v6"></path></svg>'
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
