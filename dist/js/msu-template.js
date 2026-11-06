/**
 * MSU Website Template Helper Scripts
 * Accessible, lightweight, vanilla JavaScript for MSU HTML/CSS templates.
 * Implements WCAG 2.1 AA keyboard interactions and ARIA state updates.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initAccessibleTabs();
  initModals();
  initCopyButtons();
  initPublicationFilters();
});

/**
 * 1. Accessible Mobile Navigation
 * Controls drawer / hamburger menu, toggling aria-expanded and trapping Esc key.
 */
function initMobileNav() {
  const toggleButtons = document.querySelectorAll('[data-toggle-nav]');
  
  toggleButtons.forEach(btn => {
    const targetId = btn.getAttribute('aria-controls') || btn.getAttribute('data-target');
    const targetNav = document.getElementById(targetId);
    if (!targetNav) return;

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isExpanded));
      targetNav.classList.toggle('hidden');

      // Update mobile menu icon state if exists
      const iconOpen = btn.querySelector('.nav-icon-open');
      const iconClose = btn.querySelector('.nav-icon-close');
      if (iconOpen && iconClose) {
        iconOpen.classList.toggle('hidden', !isExpanded);
        iconClose.classList.toggle('hidden', isExpanded);
      }
    });

    // Close when ESC is pressed while inside menu or button
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        btn.setAttribute('aria-expanded', 'false');
        targetNav.classList.add('hidden');
        btn.focus();
      }
    });
  });
}

/**
 * 2. Accessible Tabs Pattern (WAI-ARIA Tabbed Interfaces)
 */
function initAccessibleTabs() {
  const tablists = document.querySelectorAll('[role="tablist"]');

  tablists.forEach(tablist => {
    const tabs = tablist.querySelectorAll('[role="tab"]');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Deactivate all sibling tabs
        tabs.forEach(t => {
          t.setAttribute('aria-selected', 'false');
          t.classList.remove('tab-active', 'border-b-4', 'border-primary', 'font-bold', 'text-primary');
          t.classList.add('text-slate-600');
          const panelId = t.getAttribute('aria-controls');
          const panel = document.getElementById(panelId);
          if (panel) panel.classList.add('hidden');
        });

        // Activate clicked tab
        tab.setAttribute('aria-selected', 'true');
        tab.classList.add('tab-active', 'border-b-4', 'border-primary', 'font-bold', 'text-primary');
        tab.classList.remove('text-slate-600');
        const activePanelId = tab.getAttribute('aria-controls');
        const activePanel = document.getElementById(activePanelId);
        if (activePanel) activePanel.classList.remove('hidden');
      });

      // Keyboard arrow navigation between tabs
      tab.addEventListener('keydown', (e) => {
        let newTab = null;
        const tabArray = Array.from(tabs);
        const index = tabArray.indexOf(tab);

        if (e.key === 'ArrowRight') {
          newTab = tabArray[(index + 1) % tabArray.length];
        } else if (e.key === 'ArrowLeft') {
          newTab = tabArray[(index - 1 + tabArray.length) % tabArray.length];
        }

        if (newTab) {
          e.preventDefault();
          newTab.focus();
          newTab.click();
        }
      });
    });
  });
}

/**
 * 3. Accessible Dialogs / Modals
 * Supports native HTML5 <dialog> elements and DaisyUI modal wrappers.
 */
function initModals() {
  // Modal open triggers
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-open-modal');
      const dialog = document.getElementById(modalId);
      if (dialog && typeof dialog.showModal === 'function') {
        dialog.showModal();
      }
    });
  });

  // Modal close triggers
  document.querySelectorAll('[data-close-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const dialog = trigger.closest('dialog');
      if (dialog && typeof dialog.close === 'function') {
        dialog.close();
      }
    });
  });
}

/**
 * 4. Copy-to-Clipboard with Live Announcer
 */
function initCopyButtons() {
  document.querySelectorAll('[data-copy-target]').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const textToCopy = targetEl.value || targetEl.textContent || '';
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = `
          <svg class="w-4 h-4 mr-1 text-emerald-600 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg> Copied!
        `;
        
        // Announce to screen readers via aria-live region
        announceToScreenReader('Content copied to clipboard');

        setTimeout(() => {
          button.innerHTML = originalText;
        }, 2500);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  });
}

/**
 * 5. Publication Filter System (Categorized List by Tag/Year)
 */
function initPublicationFilters() {
  const filterButtons = document.querySelectorAll('[data-pub-filter]');
  const pubItems = document.querySelectorAll('[data-pub-item]');
  if (!filterButtons.length || !pubItems.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-pub-filter');

      // Update button active states
      filterButtons.forEach(b => {
        b.classList.remove('bg-msu-green', 'text-white', 'btn-primary');
        b.classList.add('btn-outline');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('bg-msu-green', 'text-white', 'btn-primary');
      btn.classList.remove('btn-outline');
      btn.setAttribute('aria-pressed', 'true');

      let visibleCount = 0;
      pubItems.forEach(item => {
        const categories = (item.getAttribute('data-pub-category') || '').split(' ');
        const matches = (filter === 'all' || categories.includes(filter));
        item.classList.toggle('hidden', !matches);
        if (matches) visibleCount++;
      });

      announceToScreenReader(`Showing ${visibleCount} publications for filter ${btn.textContent.trim()}`);
    });
  });
}

/**
 * Screen Reader Live Announcer helper
 */
function announceToScreenReader(message) {
  let announcer = document.getElementById('sr-announcer');
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'sr-announcer';
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
  }
  announcer.textContent = '';
  setTimeout(() => {
    announcer.textContent = message;
  }, 50);
}
