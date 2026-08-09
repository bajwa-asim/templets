(function () {
  var seedEstimates = [
    { id: 1, name: "New Estimate", number: "EST-000004", customer: "Olivia Rhye", handle: "@olivia", issueDate: "2026-04-20", value: 20, status: "draft" },
    { id: 2, name: "New Estimate", number: "EST-000005", customer: "Phoenix Baker", handle: "@phoenix", issueDate: "2026-04-20", value: 20, status: "accepted" },
    { id: 3, name: "New Estimate", number: "EST-000006", customer: "Phoenix Baker", handle: "@phoenix", issueDate: "2026-04-20", value: 20, status: "declined" },
    { id: 4, name: "New Estimate", number: "EST-000007", customer: "Phoenix Baker", handle: "@phoenix", issueDate: "2026-04-20", value: 20, status: "invoiced" },
    { id: 5, name: "New Estimate", number: "EST-000008", customer: "Lana Steiner", handle: "@lana", issueDate: "2026-04-20", value: 20, status: "sent" },
    { id: 6, name: "Q2 Estimate", number: "EST-000009", customer: "Candice Wu", handle: "@candice", issueDate: "2026-03-12", value: 1200, status: "sent" },
    { id: 7, name: "Website Estimate", number: "EST-000010", customer: "Natali Craig", handle: "@natali", issueDate: "2026-02-14", value: 650, status: "draft" },
    { id: 8, name: "Support Renewal", number: "EST-000011", customer: "Drew Cano", handle: "@drew", issueDate: "2026-05-05", value: 880, status: "accepted" },
    { id: 9, name: "Brand Retainer", number: "EST-000012", customer: "Orlando Diggs", handle: "@orlando", issueDate: "2026-01-25", value: 410, status: "declined" },
    { id: 10, name: "Annual Package", number: "EST-000013", customer: "Alec Whitten", handle: "@alec", issueDate: "2026-05-28", value: 1500, status: "invoiced" }
  ];
  var estimates = buildEstimates();

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

  function buildEstimates() {
    var list = [];

    for (var index = 0; index < 50; index += 1) {
      var base = seedEstimates[index % seedEstimates.length];
      var clonedDate = new Date(base.issueDate + "T00:00:00");
      clonedDate.setDate(clonedDate.getDate() + index);

      list.push({
        id: index + 1,
        name: index < 5 ? base.name : base.name + " " + (index + 1),
        number: "EST-" + String(4 + index).padStart(6, "0"),
        customer: base.customer,
        handle: base.handle,
        issueDate: clonedDate.toISOString().slice(0, 10),
        value: base.value + (index % 6) * 15,
        status: base.status
      });
    }

    return list;
  }

  function formatMoney(value) {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2
    }).format(value);
  }

  function formatShortDate(value) {
    var parts = value.split("-");
    return [parts[2], parts[1], parts[0]].join("-");
  }

  function getInitials(name) {
    return name.split(" ").slice(0, 2).map(function (part) { return part.charAt(0); }).join("").toUpperCase();
  }

  function getAvatarTone(name) {
    var tones = ["tone-gold", "tone-lilac", "tone-peach", "tone-sage", "tone-sky"];
    var index = name.length % tones.length;
    return tones[index];
  }

  function getSummaryData() {
    return statusOrder.map(function (status) {
      var items = estimates.filter(function (item) { return item.status === status; });
      var total = items.reduce(function (sum, item) { return sum + item.value; }, 0);
      return {
        status: status,
        count: items.length,
        total: total
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
      item.name,
      item.number,
      item.customer,
      item.handle,
      item.status
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

  function getEstimatePageUrl(item, action) {
    var params = new URLSearchParams();
    params.set("id", item.id);
    params.set("status", item.status);
    params.set("mode", action);
    return "create-estimate.html?" + params.toString();
  }

  function renderTable() {
    var filtered = getFilteredEstimates();
    var totalRows = filtered.length;
    var totalPages = Math.max(1, Math.ceil(totalRows / state.pageSize));

    if (state.page > totalPages) {
      state.page = totalPages;
    }

    var items = getPagedItems(filtered);

    tableBody.innerHTML = items.map(function (item) {
      return [
        '<tr data-id="', item.id, '">',
        '<td><a href="', getEstimatePageUrl(item, "open"), '" class="estimate-link">', item.name, "</a></td>",
        "<td>", item.number, "</td>",
        '<td><div class="estimate-customer-cell"><span class="estimate-avatar ', getAvatarTone(item.customer), '">', getInitials(item.customer), '</span><div><div class="estimate-customer-name">', item.customer, '</div><div class="estimate-customer-handle">', item.handle, "</div></div></div></td>",
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
    var nextMap = {
      draft: "sent",
      sent: "accepted",
      accepted: "declined",
      declined: "invoiced",
      invoiced: "draft"
    };
    item.status = nextMap[item.status];
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
      if (!button) {
        return;
      }
      state.page = Number(button.getAttribute("data-page"));
      renderTable();
    });

    tableBody.addEventListener("click", function (event) {
      var actionButton = event.target.closest("[data-action]");
      if (!actionButton) {
        return;
      }

      var row = actionButton.closest("tr");
      var itemId = Number(row.getAttribute("data-id"));
      var item = estimates.find(function (entry) { return entry.id === itemId; });
      var action = actionButton.getAttribute("data-action");

      if (!item) {
        return;
      }

      if (action === "copy") {
        var clone = Object.assign({}, item, {
          id: Date.now(),
          number: "EST-" + String(Math.floor(Math.random() * 900000) + 100000)
        });
        estimates.unshift(clone);
      }

      if (action === "open" || action === "edit" || action === "view") {
        window.location.href = getEstimatePageUrl(item, action);
        return;
      }

      if (action === "history") {
        cycleStatus(item);
      }

      if (action === "delete") {
        estimates = estimates.filter(function (entry) { return entry.id !== itemId; });
      }

      render();
    });
  }

  function render() {
    renderSummary();
    renderTable();
  }

  bindEvents();
  render();
}());
