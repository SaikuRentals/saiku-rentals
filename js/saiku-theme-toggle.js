(function () {
  const storageKey = "saiku-rentals-theme";
  const root = document.documentElement;

  function readTheme() {
    try { return localStorage.getItem(storageKey) === "dark" ? "dark" : "light"; }
    catch (error) { return "light"; }
  }

  function setTheme(theme) {
    const isDark = theme === "dark";
    root.setAttribute("data-saiku-theme", isDark ? "dark" : "light");
    const button = document.querySelector(".saiku-theme-toggle");
    if (!button) return;
    button.setAttribute("aria-pressed", isDark ? "true" : "false");
    button.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    button.title = isDark ? "Switch to light theme" : "Switch to dark theme";
    button.innerHTML = isDark
      ? '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.6 8.6 0 1 0 20.4 15.2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
  }

  const darkOverrides = document.createElement("style");
  darkOverrides.id = "saiku-dark-theme-final-overrides";
  darkOverrides.textContent = `
    html[data-saiku-theme="dark"] body .dashboard-content .active-rentals-dashboard.liquid-glass-panel {
      background:#111f32!important; background-image:none!important; color:#e7effa!important;
      border:1px solid #30445e!important; border-top:4px solid #f06449!important;
      box-shadow:0 12px 30px rgba(0,0,0,.24)!important;
    }
    html[data-saiku-theme="dark"] body .dashboard-content .active-rentals-dashboard .active-rentals-heading h2 { color:#f1f6ff!important; }
    html[data-saiku-theme="dark"] body .dashboard-content .active-rentals-dashboard .active-rentals-heading p { color:#afc0d5!important; }
    html[data-saiku-theme="dark"] body .dashboard-content .active-rentals-dashboard .live-section-eyebrow { color:#72d5ed!important; }
    html[data-saiku-theme="dark"] body .dashboard-content .active-rentals-dashboard .fleet-summary-row span { background:#1c3048!important; border-color:#354d67!important; color:#d4e2f3!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-rental-card,
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-rental-card:not(.is-overdue):not(.fleet-available-card) {
      background:#192b42!important; background-image:none!important; border:1px solid #354c67!important;
      color:#e6eef9!important; box-shadow:0 8px 20px rgba(0,0,0,.2)!important;
    }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-rental-card.is-overdue { background:#302433!important; background-image:none!important; border-color:#865263!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-rental-card.fleet-available-card { background:#152d31!important; background-image:none!important; border-color:#35685e!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-card-heading .fleet-cycle-plate { color:#f2f6fc!important; -webkit-text-fill-color:#f2f6fc!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-rental-card .fleet-customer-row .active-rental-person h3 { color:#edf3fc!important; -webkit-text-fill-color:#edf3fc!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-rental-card .fleet-customer-row .active-rental-phone,
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-rental-card .fleet-customer-id { color:#afc1d8!important; -webkit-text-fill-color:#afc1d8!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-rental-meta>div { background:#101e30!important; border-color:#30445e!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-time-line,
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-time-box { background:#101e30!important; background-image:none!important; border-color:#30445e!important; color:#d5e1f0!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-time-line *,
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-time-box * { color:#d5e1f0!important; -webkit-text-fill-color:#d5e1f0!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-time-line .rental-time-track { background:#091525!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-rental-meta span,
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-time-label span,
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-payment span { color:#a9bbd1!important; -webkit-text-fill-color:#a9bbd1!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-rental-meta strong,
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-time-label strong { color:#e1ebf8!important; -webkit-text-fill-color:#e1ebf8!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-time-line .rental-time-track { background:#0b1727!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-payment { border-color:#354b65!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-payment strong.paid,
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-payment strong.fleet-payment-status.paid { background:#174d3a!important; color:#a9f2cd!important; -webkit-text-fill-color:#a9f2cd!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-payment strong.due,
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-payment strong.fleet-payment-status.due { background:#542b37!important; color:#ffd1d9!important; -webkit-text-fill-color:#ffd1d9!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-pill.rented { background:#294666!important; color:#d5e9ff!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-pill.available { background:#174d3a!important; color:#b3f2d1!important; }
    html[data-saiku-theme="dark"] body #activeRentalCards .fleet-pill.expired { background:#542b37!important; color:#ffd1d9!important; }
    html[data-saiku-theme="dark"] body .dashboard-page-switcher {
      background:#111f32!important; background-image:none!important; border-color:#354b65!important;
      box-shadow:0 8px 24px rgba(0,0,0,.34)!important; backdrop-filter:none!important;
    }
    html[data-saiku-theme="dark"] body .dashboard-page-switcher a { color:#c8d6e8!important; }
    html[data-saiku-theme="dark"] body .dashboard-page-switcher a:hover { background:#203650!important; color:#fff!important; }
    html[data-saiku-theme="dark"] body .dashboard-page-switcher a[aria-current="page"] { background:#294966!important; color:#fff!important; box-shadow:none!important; }
    html[data-saiku-theme="dark"] body #loansContainer .loan-card,
    html[data-saiku-theme="dark"] body #loansContainer .loan-card .stat-card { background:#142238!important; background-image:none!important; border-color:#2a3e59!important; color:#e4edf8!important; }
    html[data-saiku-theme="dark"] body #financeOverview .finance-card,
    html[data-saiku-theme="dark"] body #cashManagement .finance-card { background:#142238!important; background-image:none!important; border-color:#2a3e59!important; color:#e4edf8!important; }
    html[data-saiku-theme="dark"] body .dashboard-content .dashboard-key-metrics .key-metric-card,
    html[data-saiku-theme="dark"] body .dashboard-content .monthly-summary-section .stat-card { background:#142238!important; background-image:none!important; border-color:#2a3e59!important; color:#e4edf8!important; }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance.staff-performance-section {
      background:#111f32!important; background-image:none!important; border:1px solid #354961!important;
      border-top:4px solid #9b83e8!important; color:#e6edf7!important;
      box-shadow:0 12px 28px rgba(0,0,0,.25)!important;
    }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-performance-header,
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-performance-header>div { background:transparent!important; }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-performance-header h2,
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-performance-header p,
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-performance-caption { color:#d5e1f0!important; }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-total-pill { background:#203650!important; border-color:#3a526e!important; color:#d9e8fb!important; }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-performance-card,
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-podium-card {
      background:#182b42!important; background-image:none!important; border:1px solid #354b65!important;
      border-left:4px solid #a98be9!important; color:#e3edf9!important;
      box-shadow:0 8px 20px rgba(0,0,0,.2)!important;
    }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-card-name-wrap h3,
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-performance-name,
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-performance-card strong { color:#f1f6ff!important; -webkit-text-fill-color:#f1f6ff!important; }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-card-status { color:#b9c9dd!important; }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-card-chart-row { background:#101e30!important; background-image:none!important; border-color:#354961!important; }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-card-chart { background:#14243a!important; }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-card-chart-label,
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-card-chart-label span { color:#e5eef9!important; }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-card-chart-label svg { stroke:#79b9ff!important; }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-card-chart:nth-child(2) .staff-card-chart-label svg { stroke:#47d3b4!important; }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-card-chart small { color:#a5b8d0!important; }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-card-active-rentals { border-top-color:#354961!important; color:#aebfd3!important; }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-card-active-rentals b { color:#f1f6ff!important; }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-performance-metric { background:#14243a!important; border-color:#354961!important; }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-performance-metric strong { color:#f1f6ff!important; }
    html[data-saiku-theme="dark"] body .dashboard-content #staffPerformance .staff-performance-metric span { color:#aebfd3!important; }
    html[data-saiku-theme="dark"] body .rental-record-panel,
    html[data-saiku-theme="dark"] body .rental-history-panel,
    html[data-saiku-theme="dark"] body #customerRentalHistoryModal .customer-rental-history-panel {
      background:#111f32!important; background-image:none!important; border-color:#354961!important;
      color:#e4edf8!important; box-shadow:0 18px 54px rgba(0,0,0,.48)!important;
    }
    html[data-saiku-theme="dark"] body .rental-record-popup-heading,
    html[data-saiku-theme="dark"] body .rental-history-popup-heading,
    html[data-saiku-theme="dark"] body #customerRentalHistoryModal .customer-rental-history-head { border-color:#354961!important; }
    html[data-saiku-theme="dark"] body .rental-record-popup-heading h2,
    html[data-saiku-theme="dark"] body .rental-history-popup-heading h2,
    html[data-saiku-theme="dark"] body #customerRentalHistoryModal .customer-rental-history-head h2 { color:#f1f6ff!important; }
    html[data-saiku-theme="dark"] body .rental-record-popup-heading p,
    html[data-saiku-theme="dark"] body .rental-history-popup-heading p,
    html[data-saiku-theme="dark"] body #customerRentalHistoryModal .customer-rental-history-head p { color:#aebfd3!important; }
    html[data-saiku-theme="dark"] body .rental-history-summary-item,
    html[data-saiku-theme="dark"] body .rental-history-payment,
    html[data-saiku-theme="dark"] body .rental-history-empty,
    html[data-saiku-theme="dark"] body #customerRentalHistoryModal .customer-rental-history-stat,
    html[data-saiku-theme="dark"] body #customerRentalHistoryModal .customer-rental-history-table-wrap { background:#182b42!important; background-image:none!important; border-color:#354b65!important; color:#e4edf8!important; }
    html[data-saiku-theme="dark"] body .rental-history-summary-item span,
    html[data-saiku-theme="dark"] body .rental-history-payment-info small,
    html[data-saiku-theme="dark"] body .rental-history-empty,
    html[data-saiku-theme="dark"] body #customerRentalHistoryModal .customer-rental-history-stat span,
    html[data-saiku-theme="dark"] body #customerRentalHistoryModal .customer-rental-history-empty { color:#aebfd3!important; }
    html[data-saiku-theme="dark"] body .rental-history-summary-item strong,
    html[data-saiku-theme="dark"] body .rental-history-payment-info strong,
    html[data-saiku-theme="dark"] body #customerRentalHistoryModal .customer-rental-history-stat strong { color:#f1f6ff!important; }
    html[data-saiku-theme="dark"] body #customerRentalHistoryModal .customer-rental-history-table th { background:#203650!important; color:#d9e8fb!important; }
    html[data-saiku-theme="dark"] body #customerRentalHistoryModal .customer-rental-history-table td { border-color:#354961!important; color:#d5e1f0!important; }
    html[data-saiku-theme="dark"] body .rental-history-popup-footer { border-color:#354961!important; }
    html[data-saiku-theme="dark"] body .rental-history-popup-footer button,
    html[data-saiku-theme="dark"] body .rental-record-popup-close,
    html[data-saiku-theme="dark"] body .rental-history-popup-close,
    html[data-saiku-theme="dark"] body #customerRentalHistoryModal .customer-rental-history-close { background:#203650!important; border-color:#405875!important; color:#e3edf9!important; }
    html[data-saiku-theme="dark"] body .table-container { background:#111f32!important; border-color:#354961!important; }
    html[data-saiku-theme="dark"] body .table-container table { background:#111f32!important; color:#e4edf8!important; }
    html[data-saiku-theme="dark"] body .table-container thead th { background:#203650!important; border-color:#354961!important; color:#d9e8fb!important; }
    html[data-saiku-theme="dark"] body .table-container tbody#rentalsTableBody tr,
    html[data-saiku-theme="dark"] body .table-container tbody#rentalsTableBody tr:nth-child(even),
    html[data-saiku-theme="dark"] body .table-container tbody#rentalsTableBody tr:hover { background:#14243a!important; }
    html[data-saiku-theme="dark"] body .table-container tbody#rentalsTableBody tr:nth-child(even) { background:#192b42!important; }
    html[data-saiku-theme="dark"] body .table-container tbody#rentalsTableBody tr>td { background:#14243a!important; border-color:#354961!important; color:#dce7f5!important; }
    html[data-saiku-theme="dark"] body .table-container tbody#rentalsTableBody tr:nth-child(even)>td { background:#192b42!important; }
    html[data-saiku-theme="dark"] body .table-container tbody#rentalsTableBody tr:hover>td { background:#223a56!important; }
    html[data-saiku-theme="dark"] body #rentalsTableBody a { color:#82bdff!important; }
    html[data-saiku-theme="dark"] body #rentalsTableBody .status-badge.paid { background:#174d3a!important; color:#a9f2cd!important; }
    html[data-saiku-theme="dark"] body #rentalsTableBody .status-badge.unpaid { background:#542b37!important; color:#ffd1d9!important; }
    html[data-saiku-theme="dark"] body #rentalsTableBody .status-badge.partial { background:#58431f!important; color:#ffe4a8!important; }
    html[data-saiku-theme="dark"] body #rentalsTableBody .record-manage-button { background:#203d5b!important; border-color:#466585!important; color:#e6f1ff!important; }
    html[data-saiku-theme="dark"] body #rentalsTableBody .record-manage-button:hover { background:#2a4d70!important; }
    html[data-saiku-theme="dark"] body .mobile-rental-table-scroll { background:#111f32!important; border-color:#354961!important; }
    html[data-saiku-theme="dark"] body .mobile-rental-log-table thead th,
    html[data-saiku-theme="dark"] body .mobile-rental-log-table thead th:last-child { background:#203650!important; border-color:#354961!important; color:#d9e8fb!important; }
    html[data-saiku-theme="dark"] body .mobile-rental-log-table tbody td,
    html[data-saiku-theme="dark"] body .mobile-rental-log-table tbody tr:nth-child(even) td { background:#14243a!important; border-color:#354961!important; color:#dce7f5!important; }
    html[data-saiku-theme="dark"] body .mobile-rental-log-table tbody tr:nth-child(even) td { background:#192b42!important; }
    html[data-saiku-theme="dark"] body .mobile-rental-log-table .mobile-rental-actions-cell { background:#14243a!important; }
    html[data-saiku-theme="dark"] body .mobile-rental-log-table .mobile-rental-customer strong,
    html[data-saiku-theme="dark"] body .mobile-rental-log-table .mobile-rental-cycle strong,
    html[data-saiku-theme="dark"] body .mobile-rental-log-table .mobile-rental-total strong { color:#e6f1ff!important; }
    html[data-saiku-theme="dark"] body .mobile-rental-log-table .mobile-rental-customer small { color:#aebfd3!important; }
    html[data-saiku-theme="dark"] body .mobile-rental-log-table .record-manage-button { background:#203d5b!important; border-color:#466585!important; color:#e6f1ff!important; }
  `;
  document.body.appendChild(darkOverrides);

  root.setAttribute("data-saiku-theme", readTheme());
  const topbar = document.querySelector("header.topbar, .topbar");
  if (!topbar || topbar.querySelector(".saiku-theme-toggle")) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "saiku-theme-toggle";
  button.addEventListener("click", function () {
    const nextTheme = root.getAttribute("data-saiku-theme") === "dark" ? "light" : "dark";
    try { localStorage.setItem(storageKey, nextTheme); } catch (error) {}
    setTheme(nextTheme);
  });

  const actionArea = topbar.querySelector(".saiku-banner-actions,.topbar-right,.top-actions,.topbar-actions");
  (actionArea || topbar).appendChild(button);
  setTheme(root.getAttribute("data-saiku-theme"));
})();
