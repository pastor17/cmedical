(function () {
  "use strict";

  /* Mobile nav toggle */
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  /* "More" dropdown */
  var ddToggle = document.getElementById("navDropdownToggle");
  var ddMenu = document.getElementById("navDropdownMenu");
  if (ddToggle && ddMenu) {
    ddToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = ddMenu.classList.toggle("is-open");
      ddToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close when clicking outside (desktop)
    document.addEventListener("click", function (e) {
      if (!ddMenu.contains(e.target) && !ddToggle.contains(e.target)) {
        ddMenu.classList.remove("is-open");
        ddToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Reading progress bar (only on article pages) */
  var body = document.getElementById("storyBody") || document.getElementById("articleBody");
  var progressBar = document.getElementById("progressBar");
  if (body && progressBar) {
    var onScroll = function () {
      var rect = body.getBoundingClientRect();
      var total = body.offsetHeight - window.innerHeight;
      var scrolled = -rect.top;
      if (total > 0) {
        var pct = Math.min(100, Math.max(0, (scrolled / total) * 100));
        progressBar.style.width = pct + "%";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
  }

  /* Font size adjust (remembered) */
  var fontDown = document.getElementById("fontDown");
  var fontUp = document.getElementById("fontUp");
  var fontReset = document.getElementById("fontReset");
  if (body && (fontDown || fontUp || fontReset)) {
    var STORAGE_KEY = "articleFontSize";
    var MIN = 0.9, MAX = 1.5, DEFAULT = 1.06, STEP = 0.06;
    var current = parseFloat(localStorage.getItem(STORAGE_KEY)) || DEFAULT;
    var apply = function () {
      body.style.setProperty("--reader-size", current.toFixed(2) + "rem");
      localStorage.setItem(STORAGE_KEY, String(current));
    };
    if (fontDown) fontDown.addEventListener("click", function () { current = Math.max(MIN, current - STEP); apply(); });
    if (fontUp) fontUp.addEventListener("click", function () { current = Math.min(MAX, current + STEP); apply(); });
    if (fontReset) fontReset.addEventListener("click", function () { current = DEFAULT; apply(); });
    apply();
  }

  /* Back to top */
  var backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Personalized journey checklist (pure front-end) */
  var checklistForm = document.getElementById("checklistForm");
  var checklistOut = document.getElementById("checklistOut");
  if (checklistForm && checklistOut) {
    checklistForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var spec = checklistForm.querySelector("select[name='specialty']");
      var stage = checklistForm.querySelector("select[name='stage']");
      var specVal = spec ? spec.value : "";
      var stageVal = stage ? stage.value : "";
      var steps = [];
      var step = function (num, title, desc) { steps.push({ num: num, title: title, desc: desc }); };

      if (stageVal === "choose") {
        step(1, "Pick the right specialty", "Identify which department treats your condition. " + (specVal ? "We recommend the " + specVal.replace(/-/g, " ") + " specialty." : ""));
        step(2, "Shortlist hospitals", "Look for Grade III-A (three-A) hospitals with an international medical department and English-language service.");
        step(3, "Check credentials", "Confirm JCI / Ministry of Health accreditation and the specialist’s case numbers.");
      } else if (stageVal === "register") {
        step(1, "Get a Chinese phone number", "Buy a SIM or eSIM for booking, alerts, and payment.");
        step(2, "Set up WeChat / Alipay", "Link a foreign Visa or Mastercard for hospital payments.");
        step(3, "Book via the international department", "Call or email the hospital’s international desk — easier than the mini-program for foreigners.");
      } else if (stageVal === "consult") {
        step(1, "Gather your records", "Collect past medical records, imaging (DICOM or CD), and a list of current medications.");
        step(2, "Translate if needed", "Have key documents translated into Chinese, or send them as-is for remote consult.");
        step(3, "Prepare your questions", "Bring a short list of the 5–10 questions you most want answered.");
      } else if (stageVal === "pay") {
        step(1, "Confirm the price breakdown", "Ask for what is included and excluded before treatment starts.");
        step(2, "Set up payment", "WeChat/Alipay with a foreign card, or ask about insurance reimbursement paperwork.");
        step(3, "Keep every receipt", "For insurance claims, keep the invoice (fapiao), records, and itemized charges.");
      } else if (stageVal === "visit") {
        step(1, "Arrive early", "Check in 30–60 minutes before your appointment time.");
        step(2, "Bring ID + records", "Passport, appointment confirmation, and any prior medical documents.");
        step(3, "Consider a companion", "A bilingual companion or interpreter helps with communication and logistics.");
      } else if (stageVal === "recover") {
        step(1, "Request English records", "Ask for an English copy of your discharge summary, reports, and test results.");
        step(2, "Plan follow-up", "Arrange cross-border follow-up or a return visit, and refills for medication.");
        step(3, "Hand off to your home doctor", "Send the translated records to your doctor for continuity of care.");
      } else if (stageVal === "prepare") {
        step(1, "Apply for the right visa", "Medical visitors typically use a medical (S2) or visitor visa — check requirements for your nationality.");
        step(2, "Prepare records and translation", "Gather and translate medical history before you travel.");
        step(3, "Arrange travel & stay", "Book flights, accommodation near the hospital, and airport pickup.");
      } else {
        step(1, "Tell us about your journey", "Select a stage above to get a tailored checklist for your trip to China.");
      }

      var html = '<ul class="checklist">';
      steps.forEach(function (s) {
        html += '<li><span class="checklist__num">' + s.num + '</span><div class="checklist__body"><strong>' + s.title + '</strong><br><span style="color:var(--ink-soft);font-size:0.92rem">' + s.desc + '</span></div></li>';
      });
      html += '</ul>';
      checklistOut.innerHTML = html;
      checklistOut.hidden = false;
      checklistOut.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  /* Simple cost estimator (front-end, indicative ranges only) */
  var estForm = document.getElementById("estimatorForm");
  var estOut = document.getElementById("estimatorOut");
  var RANGES = {
    "dental": { label: "Dental (implants/crowns)", min: 300, max: 4000 },
    "ivf": { label: "Reproductive / IVF (per cycle)", min: 3000, max: 8000 },
    "cosmetic": { label: "Cosmetic surgery", min: 500, max: 8000 },
    "ophthalmology": { label: "Eye surgery (LASIK/cataract)", min: 300, max: 2500 },
    "orthopedics": { label: "Orthopedic surgery (joint)", min: 2000, max: 15000 },
    "cardiology": { label: "Cardiac surgery", min: 3000, max: 25000 },
    "oncology": { label: "Cancer treatment (per course)", min: 2000, max: 40000 },
    "transplant": { label: "Organ transplant (total)", min: 20000, max: 90000 },
    "health-checkup": { label: "Comprehensive health checkup", min: 200, max: 3000 }
  };
  if (estForm && estOut) {
    estForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var sel = estForm.querySelector("select[name='treatment']");
      var key = sel ? sel.value : "";
      var r = RANGES[key];
      if (!r) { estOut.hidden = true; return; }
      estOut.innerHTML = '<p><strong>Indicative range for ' + r.label + ':</strong> roughly <strong>US$ ' +
        r.min.toLocaleString() + ' – ' + r.max.toLocaleString() + '</strong> before taxes and add-ons. ' +
        'Actual cost depends on the hospital, complexity, and stay. Get a written quote from the hospital for your specific case.</p>' +
        '<p style="font-size:0.82rem;color:var(--muted)">Estimates are indicative only and for planning. They are not a price guarantee or medical advice.</p>';
      estOut.hidden = false;
      estOut.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
})();
