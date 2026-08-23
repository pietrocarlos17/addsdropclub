(function () {
  // Pixels always fire immediately, regardless of consent
  window.__initPixels && window.__initPixels();

  // Don't show banner if already answered
  if (localStorage.getItem('adds_cookie_consent')) return;

  const style = document.createElement('style');
  style.textContent = `
    #cookie-banner {
      position: fixed; bottom: 0; left: 0; right: 0;
      background: #fff; border-top: 1px solid #e0e0e0;
      padding: 10px 16px; z-index: 9999;
      box-shadow: 0 -2px 12px rgba(0,0,0,0.07);
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
      animation: slideUp .3s ease;
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to   { transform: translateY(0); }
    }
    #cookie-banner p {
      font-size: 11px; color: #666; line-height: 1.4;
      margin: 0; flex: 1; min-width: 180px;
    }
    #cookie-banner p a { color: #000; text-decoration: underline; }
    #cookie-banner-btns { display: flex; gap: 6px; flex-shrink: 0; }
    .cb-btn {
      padding: 7px 14px;
      font-size: 10px; font-weight: 700;
      letter-spacing: 0.6px; text-transform: uppercase;
      border: none; cursor: pointer;
      font-family: inherit; white-space: nowrap;
    }
    .cb-accept { background: #000; color: #fff; }
    .cb-reject { background: #fff; color: #000; border: 1px solid #ccc; }
    .cb-accept:hover { background: #222; }
    .cb-reject:hover { background: #f5f5f5; }
  `;
  document.head.appendChild(style);

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML = `
    <p>We use cookies to personalise content and analyse traffic. <a href="/privacy-policy">Learn more</a>.</p>
    <div id="cookie-banner-btns">
      <button class="cb-btn cb-accept" id="cb-accept">Accept</button>
      <button class="cb-btn cb-reject" id="cb-reject">Reject</button>
    </div>
  `;
  document.body.appendChild(banner);

  function dismiss(choice) {
    localStorage.setItem('adds_cookie_consent', choice);
    banner.style.transition = 'transform .25s ease, opacity .25s ease';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(100%)';
    setTimeout(() => banner.remove(), 280);
  }

  document.getElementById('cb-accept').addEventListener('click', () => dismiss('accepted'));
  document.getElementById('cb-reject').addEventListener('click', () => dismiss('rejected'));
})();
