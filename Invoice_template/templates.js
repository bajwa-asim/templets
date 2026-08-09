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
