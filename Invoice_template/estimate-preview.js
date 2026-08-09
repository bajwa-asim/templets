(function () {
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
  var status = new URLSearchParams(window.location.search).get("status") || "pending";

  function setStatus(next) {
    status = next;
    card.setAttribute("data-status", next);
    badgeAccepted.hidden = next !== "accepted";
    badgeDeclined.hidden = next !== "declined";
    pendingActions.hidden = next !== "pending";
    acceptedActions.hidden = next !== "accepted";
  }

  function openModal() {
    overlay.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    overlay.hidden = true;
    document.body.classList.remove("modal-open");
  }

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

  if (status === "accepted" || status === "declined") setStatus(status);
  else setStatus("pending");
}());
