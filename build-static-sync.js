import fs from 'fs';
import path from 'path';

const SCREENS = [
  { id: 'home', group: 'Storefront', label: 'Curated Home', file: 'xadboom_curated_interior_architecture_homepage_harmonized/code.html' },
  { id: 'catalog', group: 'Storefront', label: 'Typologies Catalog', file: 'curated_architectural_assets_physical_typologies_xadboom/code.html' },
  { id: 'product', group: 'Storefront', label: 'Lumen Void Chair', file: 'lumen_void_lounge_chair_product_detail_xadboom/code.html' },
  { id: 'designers', group: 'Storefront', label: 'Visionaries (1)', file: 'designers_collaborating_visionaries_xadboom_1/code.html' },
  { id: 'designers-2', group: 'Storefront', label: 'Visionaries (2)', file: 'designers_collaborating_visionaries_xadboom_2/code.html' },
  { id: 'contact', group: 'Storefront', label: 'Curatorial Inquiries', file: 'contact_curatorial_inquiries_xadboom/code.html' },
  { id: 'admin-overview', group: 'Atelier Admin', label: 'Operations & Ledger', file: 'xadboom_atelier_admin_operations_inventory_lock_harmonized/code.html' },
  { id: 'admin-pieces', group: 'Atelier Admin', label: 'Pieces Catalog', file: 'pieces_catalog_xadboom_atelier_admin/code.html' },
  { id: 'admin-add-piece', group: 'Atelier Admin', label: '+ Add Piece', file: 'add_new_piece_xadboom_atelier_admin/code.html' },
  { id: 'admin-categories', group: 'Atelier Admin', label: 'Categories', file: 'categories_typologies_xadboom_atelier_admin/code.html' },
  { id: 'admin-designers', group: 'Atelier Admin', label: 'Collaborators', file: 'designers_collaborators_xadboom_atelier_admin/code.html' },
  { id: 'admin-orders', group: 'Atelier Admin', label: 'Orders & Dispatches', file: 'orders_dispatches_xadboom_atelier_admin/code.html' },
  { id: 'admin-inquiries', group: 'Atelier Admin', label: 'Inquiries & Forms', file: 'inquiries_forms_xadboom_atelier_admin/code.html' },
  { id: 'admin-users', group: 'Atelier Admin', label: 'Users & Accounts', file: 'users_accounts_xadboom_atelier_admin/code.html' },
];

function generateComponent(currentId, isRoot) {
  const current = SCREENS.find(s => s.id === currentId) || SCREENS[0];
  const relPrefix = isRoot ? './' : '../';

  const storefrontLinks = SCREENS.filter(s => s.group === 'Storefront').map(s => {
    const isActive = s.id === current.id;
    const target = isRoot
      ? (s.id === 'home' ? './index.html' : `./${s.file}`)
      : (s.id === 'home' ? '../index.html' : `../${s.file}`);
    return `<a href="${target}" style="padding:3px 8px;border-radius:4px;font-size:10.5px;font-family:'Space Grotesk',monospace;letter-spacing:0.04em;text-decoration:none;transition:all 0.2s;white-space:nowrap;${
      isActive
        ? 'background:#0A0A0A;color:#FFF8F6;font-weight:700;'
        : 'color:#4D4540;background:transparent;'
    }">${s.label}</a>`;
  }).join('');

  const adminLinks = SCREENS.filter(s => s.group === 'Atelier Admin').map(s => {
    const isActive = s.id === current.id;
    const target = isRoot
      ? `./${s.file}`
      : `../${s.file}`;
    return `<a href="${target}" style="padding:3px 8px;border-radius:4px;font-size:10.5px;font-family:'Space Grotesk',monospace;letter-spacing:0.04em;text-decoration:none;transition:all 0.2s;white-space:nowrap;${
      isActive
        ? 'background:#0A0A0A;color:#FFF8F6;font-weight:700;'
        : 'color:#4D4540;background:transparent;'
    }">${s.label}</a>`;
  }).join('');

  return `
<!-- BEGIN: Xadboom Unified Navigation & Cart Lock Engine -->
<div id="xadboom-cart-drawer" style="display:none;position:fixed;top:0;right:0;bottom:0;width:100%;max-width:440px;background:#FFF8F6;box-shadow:-12px 0 40px rgba(35,26,22,0.2);z-index:100000;border-left:1px solid #D8C3BC;font-family:'DM Sans',sans-serif;color:#1C1917;flex-direction:column;">
  <!-- Drawer Header -->
  <div style="padding:18px 24px;border-bottom:1px solid #D8C3BC;display:flex;align-items:center;justify-content:space-between;background:#ECDAD4;">
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="width:8px;height:8px;border-radius:50%;background:#0A0A0A;"></span>
      <h3 style="margin:0;font-family:'Space Grotesk',monospace;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Allocation Bag &amp; Reservation</h3>
    </div>
    <button id="xadboom-cart-close" style="background:transparent;border:0;font-size:18px;cursor:pointer;color:#1C1917;padding:4px 8px;font-family:monospace;" aria-label="Close Bag">✕</button>
  </div>

  <!-- 15-Minute Reservation Lock Banner -->
  <div id="xadboom-lock-banner" style="background:#FFF1EC;border-bottom:1px solid #E2CECB;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;">
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#844C38;animation:pulse 1.5s infinite;"></span>
      <span style="font-family:'Space Grotesk',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:#844C38;font-weight:600;">15-MIN LOCK ACTIVE</span>
    </div>
    <div id="xadboom-countdown" style="font-family:'Space Grotesk',monospace;font-size:12px;font-weight:700;color:#0A0A0A;letter-spacing:0.08em;">
      14:45
    </div>
  </div>

  <!-- Drawer Body -->
  <div id="xadboom-cart-items" style="flex:1;overflow-y:auto;padding:24px;">
    <div style="border:1px solid #E2CECB;border-radius:12px;padding:16px;background:#FFF1EC;margin-bottom:16px;">
      <div style="display:flex;gap:14px;align-items:start;">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwnCJLKLvhum3BMndM9-PH1frfIJppinysZwrLcPhUH0AV8GsVaqmZzF_M8GR6ESpCju6fnmTN7DFWKy-DiVCqZTxDLyhEPeC_IK_4w1soWZTFD96uhfpWmYlACXw6RMIu_Ap3-uZEyc31P9IHs_fpfl-sHnMMRmb6sBFJmXzGKlrdhEMF1NJT0AXLqQslhbsDqWiBXrgLGrfsPHfnJUGqunRKntyorrnZb5qlDbMt" style="width:72px;height:72px;object-fit:cover;border-radius:8px;border:1px solid #D8C3BC;">
        <div style="flex:1;">
          <span style="font-family:Space Grotesk,monospace;font-size:9px;color:#844C38;text-transform:uppercase;letter-spacing:0.1em;font-weight:700;display:block;">EDITION ALLOCATION</span>
          <h4 style="margin:2px 0 4px;font-size:14px;font-weight:700;">Lumen Void Lounge Chair</h4>
          <p style="margin:0;font-size:11px;color:#7A6E69;">Alireza Taghaboni · Solid Walnut &amp; Bouclé</p>
          <div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center;">
            <span style="font-family:Space Grotesk,monospace;font-size:10px;background:#0A0A0A;color:#fff;padding:2px 6px;border-radius:4px;">Ed. 03 / 12</span>
            <span style="font-family:Space Grotesk,monospace;font-size:13px;font-weight:700;">$9,400</span>
          </div>
        </div>
      </div>
      <div style="margin-top:12px;padding-top:10px;border-top:1px dashed #D8C3BC;font-size:10.5px;color:#554B47;display:flex;align-items:center;gap:6px;">
        <span>🛡️</span>
        <span>Cryptographic Provenance Token: <strong>XB-PROV-LV-0312</strong></span>
      </div>
    </div>
  </div>

  <!-- Drawer Footer -->
  <div style="padding:20px 24px;border-top:1px solid #D8C3BC;background:#FFF1EC;">
    <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:11px;font-family:'Space Grotesk',monospace;text-transform:uppercase;letter-spacing:0.06em;color:#7A6E69;">
      <span>Atelier White-Glove Crate</span>
      <span style="color:#0A0A0A;font-weight:600;">COMPLIMENTARY</span>
    </div>
    <div style="display:flex;justify-content:space-between;margin-bottom:16px;font-size:14px;font-weight:700;">
      <span style="font-family:'Space Grotesk',monospace;text-transform:uppercase;letter-spacing:0.06em;">Total Acquisition</span>
      <span id="xadboom-cart-total" style="font-family:'Space Grotesk',monospace;">$9,400</span>
    </div>
    <button id="xadboom-checkout-btn" style="width:100%;padding:14px;background:#0A0A0A;color:#FFF8F6;border:0;border-radius:9999px;font-family:'Space Grotesk',monospace;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;cursor:pointer;margin-bottom:8px;transition:opacity 0.2s;">
      PROCEED TO ALLOCATION CHECKOUT ↗
    </button>
    <button id="xadboom-release-btn" style="width:100%;padding:8px;background:transparent;color:#7A6E69;border:0;font-family:'Space Grotesk',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;cursor:pointer;">
      Release Vault Lock Back to Inventory
    </button>
  </div>
</div>
<div id="xadboom-cart-backdrop" style="display:none;position:fixed;inset:0;background:rgba(28,25,23,0.4);backdrop-filter:blur(2px);z-index:99999;"></div>

<!-- Quick Architectural Switcher Pill (Beneath Container Showing All 14 Pages) -->
<div id="xadboom-quick-nav" style="position:fixed;bottom:14px;left:50%;transform:translateX(-50%);z-index:99998;font-family:'Space Grotesk',sans-serif;-webkit-font-smoothing:antialiased;max-width:96vw;">
  <div style="box-shadow:0 8px 32px rgba(35,26,22,0.22);border:1px solid #D8C3BC;background:rgba(255,248,246,0.97);backdrop-filter:blur(16px);border-radius:9999px;padding:6px 14px;display:flex;align-items:center;gap:10px;overflow-x:auto;">
    
    <div style="display:flex;align-items:center;gap:7px;flex-shrink:0;">
      <span style="width:7px;height:7px;border-radius:50%;background:#844C38;display:inline-block;"></span>
      <span style="font-size:10.5px;font-family:'Space Grotesk',monospace;text-transform:uppercase;letter-spacing:0.12em;font-weight:700;color:#1C1917;">Xadboom</span>
      <span style="font-size:9.5px;color:#7A6E69;font-family:monospace;background:#ECDAD4;padding:1px 6px;border-radius:4px;">${current.label}</span>
    </div>

    <div id="xadboom-nav-expanded" style="display:flex;align-items:center;gap:8px;border-left:1px solid #D8C3BC;padding-left:10px;flex-shrink:0;">
      <div style="display:flex;align-items:center;gap:3px;">
        <span style="font-size:9px;text-transform:uppercase;letter-spacing:0.08em;color:#7A6E69;font-family:monospace;margin-right:2px;">Store:</span>
        ${storefrontLinks}
      </div>
      <div style="height:14px;width:1px;background:#D8C3BC;"></div>
      <div style="display:flex;align-items:center;gap:3px;">
        <span style="font-size:9px;text-transform:uppercase;letter-spacing:0.08em;color:#844C38;font-family:monospace;margin-right:2px;">Admin:</span>
        ${adminLinks}
      </div>
    </div>

    <!-- Bag Opener Pill -->
    <button id="xadboom-open-cart-pill" style="background:#0A0A0A;color:#FFF8F6;border:0;border-radius:9999px;padding:3px 10px;font-size:10px;font-family:monospace;font-weight:700;letter-spacing:0.06em;cursor:pointer;display:flex;align-items:center;gap:4px;flex-shrink:0;">
      <span>BAG</span>
      <span id="xadboom-pill-cart-count" style="background:#844C38;border-radius:50%;padding:1px 5px;font-size:9px;">1</span>
    </button>

    <button id="xadboom-nav-toggle" style="background:#ECDAD4;border:1px solid #D8C3BC;border-radius:9999px;padding:3px 8px;font-size:10px;font-family:monospace;cursor:pointer;color:#1C1917;font-weight:600;flex-shrink:0;" title="Toggle Bar">
      ▾
    </button>
  </div>
</div>

<script>
(function() {
  // Navigation Bar Collapse Toggle
  var expanded = document.getElementById('xadboom-nav-expanded');
  var toggle = document.getElementById('xadboom-nav-toggle');
  if (toggle && expanded) {
    var isCollapsed = localStorage.getItem('xadboom_nav_collapsed') === 'true';
    if (isCollapsed) {
      expanded.style.display = 'none';
      toggle.innerText = '▴ All Pages';
    }
    toggle.addEventListener('click', function() {
      if (expanded.style.display === 'none') {
        expanded.style.display = 'flex';
        toggle.innerText = '▾';
        localStorage.setItem('xadboom_nav_collapsed', 'false');
      } else {
        expanded.style.display = 'none';
        toggle.innerText = '▴ All Pages';
        localStorage.setItem('xadboom_nav_collapsed', 'true');
      }
    });
  }

  // Cart Drawer Logic
  var drawer = document.getElementById('xadboom-cart-drawer');
  var backdrop = document.getElementById('xadboom-cart-backdrop');
  var closeBtn = document.getElementById('xadboom-cart-close');
  var openPill = document.getElementById('xadboom-open-cart-pill');
  var countdownEl = document.getElementById('xadboom-countdown');
  var itemsContainer = document.getElementById('xadboom-cart-items');
  var totalEl = document.getElementById('xadboom-cart-total');
  var pillCount = document.getElementById('xadboom-pill-cart-count');
  var checkoutBtn = document.getElementById('xadboom-checkout-btn');
  var releaseBtn = document.getElementById('xadboom-release-btn');

  function openCart() {
    if (drawer && backdrop) {
      drawer.style.display = 'flex';
      backdrop.style.display = 'block';
    }
  }

  function closeCart() {
    if (drawer && backdrop) {
      drawer.style.display = 'none';
      backdrop.style.display = 'none';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  if (backdrop) backdrop.addEventListener('click', closeCart);
  if (openPill) openPill.addEventListener('click', openCart);

  // Hook all existing "Bag" buttons in headers
  document.querySelectorAll('button, a').forEach(function(el) {
    var txt = (el.innerText || '').toLowerCase();
    if (txt.includes('bag') && !el.id.includes('xadboom')) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        openCart();
      });
    }
  });

  // 15-Minute Countdown Timer
  var remainingSeconds = 885;
  setInterval(function() {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      var m = Math.floor(remainingSeconds / 60);
      var s = remainingSeconds % 60;
      if (countdownEl) {
        countdownEl.innerText = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
      }
    } else {
      if (countdownEl) countdownEl.innerText = '00:00 (EXPIRED)';
    }
  }, 1000);

  // Release lock
  if (releaseBtn) {
    releaseBtn.addEventListener('click', function() {
      if (itemsContainer) {
        itemsContainer.innerHTML = '<div style="text-align:center;padding:40px 10px;color:#7A6E69;font-family:monospace;font-size:12px;">ALLOCATION HOLD RELEASED BACK TO VAULT.<br><br><button onclick="location.reload()" style="padding:8px 16px;background:#0A0A0A;color:#fff;border-radius:9999px;border:0;font-size:11px;cursor:pointer;">RESERVE ANOTHER PIECE ↗</button></div>';
      }
      if (totalEl) totalEl.innerText = '$0';
      if (pillCount) pillCount.innerText = '0';
    });
  }

  // Checkout action
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      checkoutBtn.innerText = 'DISPATCHING TO LEDGER...';
      setTimeout(function() {
        if (itemsContainer) {
          itemsContainer.innerHTML = 
            '<div style="text-align:center;padding:30px 10px;">' +
              '<div style="width:48px;height:48px;border-radius:50%;background:#0A0A0A;color:#fff;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:22px;">✓</div>' +
              '<h4 style="font-family:Space Grotesk,monospace;font-size:15px;margin:0 0 8px;text-transform:uppercase;">ACQUISITION CONFIRMED</h4>' +
              '<p style="font-size:12px;color:#7A6E69;line-height:1.5;">Order: XB-DISPATCH-948210<br>Certificate: PROV-CERT-LV0312</p>' +
              '<p style="font-size:11px;background:#FFF1EC;padding:10px;border-radius:8px;border:1px solid #D8C3BC;margin-top:16px;">Curatorial crate scheduled for dual-signed courier dispatch. Provenance ledger synchronized.</p>' +
            '</div>';
        }
        if (totalEl) totalEl.innerText = '$0';
        if (pillCount) pillCount.innerText = '0';
        checkoutBtn.style.display = 'none';
        if (releaseBtn) releaseBtn.style.display = 'none';
      }, 500);
    });
  }

  // Hook "ACQUIRE / RESERVE" buttons
  document.querySelectorAll('button, a').forEach(function(el) {
    var txt = (el.innerText || '').toLowerCase();
    if (txt.includes('acquire') || txt.includes('reserve') || txt.includes('the collection') || txt.includes('take allocation')) {
      if (el.getAttribute('href') && (el.getAttribute('href').includes('catalog') || el.getAttribute('href').startsWith('#'))) return;
      el.addEventListener('click', function(e) {
        e.preventDefault();
        openCart();
      });
    }
  });

  // Client-side Architectural Spec Download (CSV & OBJ generator)
  function downloadFile(content, fileName, mimeType) {
    var blob = new Blob([content], { type: mimeType });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  document.querySelectorAll('button, a').forEach(function(el) {
    var txt = (el.innerText || '').toLowerCase();
    if (txt.includes('spec') || txt.includes('3d') || txt.includes('tear sheet')) {
      if (!el.getAttribute('href') || el.getAttribute('href') === '#' || el.getAttribute('href').startsWith('#spec')) {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          var csv = "XADBOOM CURATED INTERIOR ARCHITECTURE — SPECIFICATION SHEET\\n" +
            "Archive ID,LV-0312\\n" +
            "Piece Title,Lumen Void Lounge Chair\\n" +
            "Collaborating Architect,Alireza Taghaboni\\n" +
            "Affiliated Studio,NextOffice\\n" +
            "Typology,Seating & Lounges\\n" +
            "Materials / Substrates,Solid Carved Iranian Walnut & Bouclé Wool\\n" +
            "Standard Dimensions,840 × 920 × 760 mm\\n" +
            "Net Weight,28 kg\\n" +
            "Textile Martindale Rating,65000 Cycles\\n" +
            "Edition Run,03 / 12 (3 Available)\\n" +
            "Atelier Crate Logistics,Rigid Plywood Museum Crate / Shockwatch Monitored\\n" +
            "Provenance Node,Tehran Atelier / Zurich Vault\\n" +
            "Standards,ISO 9001 / BIM 3D Lightweight Compatible (.OBJ / .GLB)\\n";
          downloadFile(csv, "Xadboom_Spec_LV0312_Lumen_Void.csv", "text/csv");
        });
      }
    }
  });

  // Client-side Contact & Inquiry form submission with feedback
  document.querySelectorAll('form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      var emailInput = form.querySelector('input[type="email"]');
      if (emailInput && !form.getAttribute('action')) {
        e.preventDefault();
        var submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');
        var originalText = submitBtn ? submitBtn.innerText : 'Submit';
        if (submitBtn) submitBtn.innerText = 'REGISTERING INQUIRY...';
        setTimeout(function() {
          if (submitBtn) submitBtn.innerText = '✓ INQUIRY REGISTERED (SLA: 3H)';
          alert('Your curatorial inquiry has been registered with the Xadboom Atelier desk. Reference: INQ-2026. Curator SLA response time: 3 hours.');
          if (submitBtn) submitBtn.innerText = originalText;
        }, 400);
      }
    });
  });

  // Wire Admin Sidebar relative links so they work on GitHub Pages
  var rootRel = '${relPrefix}';
  document.querySelectorAll('nav [data-path]').forEach(function(el) {
    var p = el.getAttribute('data-path');
    var map = {
      'overview': rootRel + 'xadboom_atelier_admin_operations_inventory_lock_harmonized/code.html',
      'pieces-catalog': rootRel + 'pieces_catalog_xadboom_atelier_admin/code.html',
      'curatorial-archives': rootRel + 'categories_typologies_xadboom_atelier_admin/code.html',
      'acquisitions': rootRel + 'orders_dispatches_xadboom_atelier_admin/code.html',
      'provenance-records': rootRel + 'inquiries_forms_xadboom_atelier_admin/code.html',
      'settings': rootRel + 'users_accounts_xadboom_atelier_admin/code.html'
    };
    if (map[p]) el.setAttribute('href', map[p]);
  });

  document.querySelectorAll('aside a, nav a').forEach(function(a) {
    var txt = (a.innerText || '').trim();
    if (txt.includes('Overview & Dashboard')) a.setAttribute('href', rootRel + 'xadboom_atelier_admin_operations_inventory_lock_harmonized/code.html');
    else if (txt.includes('Pieces Catalog')) a.setAttribute('href', rootRel + 'pieces_catalog_xadboom_atelier_admin/code.html');
    else if (txt.includes('Categories')) a.setAttribute('href', rootRel + 'categories_typologies_xadboom_atelier_admin/code.html');
    else if (txt.includes('Designers & Collaborators')) a.setAttribute('href', rootRel + 'designers_collaborators_xadboom_atelier_admin/code.html');
    else if (txt.includes('Orders & Dispatches')) a.setAttribute('href', rootRel + 'orders_dispatches_xadboom_atelier_admin/code.html');
    else if (txt.includes('Users & Accounts')) a.setAttribute('href', rootRel + 'users_accounts_xadboom_atelier_admin/code.html');
    else if (txt.includes('Inquiries & Forms')) a.setAttribute('href', rootRel + 'inquiries_forms_xadboom_atelier_admin/code.html');
  });

  // Wire "+ Add New Piece" button
  document.querySelectorAll('button, a').forEach(function(btn) {
    var txt = (btn.innerText || '').trim();
    if (txt.includes('Add New Piece')) {
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = rootRel + 'add_new_piece_xadboom_atelier_admin/code.html';
      });
    }
  });

  // Direct piece card clicks to product detail page
  document.querySelectorAll('[data-purpose="product-card"], article').forEach(function(card) {
    var txt = card.innerText || '';
    if (txt.includes('Lumen Void Lounge Chair')) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function(e) {
        if (!e.target.closest('a') && !e.target.closest('button')) {
          window.location.href = rootRel + 'lumen_void_lounge_chair_product_detail_xadboom/code.html';
        }
      });
    }
  });
})();
</script>
<!-- END: Xadboom Unified Navigation & Cart Lock Engine -->
`;
}

// Strip previous injection if exists
function cleanHtml(html) {
  const startMarker = '<!-- BEGIN: Xadboom';
  const endMarker = '<!-- END: Xadboom';
  const startIndex = html.indexOf(startMarker);
  if (startIndex !== -1) {
    const endIndex = html.indexOf('-->', html.indexOf(endMarker));
    if (endIndex !== -1) {
      return html.slice(0, startIndex) + html.slice(endIndex + 3);
    }
  }
  return html;
}

// 1. Process root index.html
let indexHtml = fs.readFileSync('index.html', 'utf-8');
indexHtml = cleanHtml(indexHtml);
const rootComponent = generateComponent('home', true);
if (indexHtml.includes('</body>')) {
  indexHtml = indexHtml.replace('</body>', `${rootComponent}</body>`);
} else {
  indexHtml += rootComponent;
}
fs.writeFileSync('index.html', indexHtml, 'utf-8');
console.log('✓ Injected navigation into root index.html');

// 2. Process all 14 screens code.html
SCREENS.forEach(screen => {
  const filePath = screen.file;
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }
  let screenHtml = fs.readFileSync(filePath, 'utf-8');
  screenHtml = cleanHtml(screenHtml);
  const component = generateComponent(screen.id, false);
  if (screenHtml.includes('</body>')) {
    screenHtml = screenHtml.replace('</body>', `${component}</body>`);
  } else {
    screenHtml += component;
  }
  fs.writeFileSync(filePath, screenHtml, 'utf-8');
  console.log(`✓ Injected navigation into ${filePath}`);
});

console.log('All 14 screens and root index.html have been synchronized with the beneath container and cart engine!');
