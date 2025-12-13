// navikid5.js - extracted behavior
// Features tabs active state
document.addEventListener('DOMContentLoaded', () => {
  /* Tab switching for features section */
  const tabs = document.querySelectorAll('.features .tab');
  const panels = {
    parents: document.getElementById('panel-parents'),
    drivers: document.getElementById('panel-drivers')
  };

  function activateTab(key) {
    tabs.forEach(t => t.classList.remove('active'));
    panels.parents.classList.remove('active');
    panels.drivers.classList.remove('active');
    const targetTab = Array.from(tabs).find(t => t.dataset.panel === key);
    if (targetTab) targetTab.classList.add('active');
    if (panels[key]) panels[key].classList.add('active');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activateTab(tab.dataset.panel);
    });
  });

  // Ensure default state (parents) if nothing active
  activateTab('parents');

  /* Pricing button hover effects */
  const freeBtn = document.querySelector('.btn-free');
  const contactBtn = document.querySelector('.btn-contact');

  const hoverIn = (el) => {
    el.style.backgroundColor = '#f59e0b';
    el.style.color = 'white';
    el.style.borderColor = '#f59e0b';
  };
  const hoverOut = (el) => {
    el.style.backgroundColor = 'white';
    el.style.color = '#2563eb';
    el.style.borderColor = '#2563eb';
  };

  if (freeBtn) {
    freeBtn.addEventListener('mouseenter', () => hoverIn(freeBtn));
    freeBtn.addEventListener('mouseleave', () => hoverOut(freeBtn));
  }
  if (contactBtn) {
    contactBtn.addEventListener('mouseenter', () => hoverIn(contactBtn));
    contactBtn.addEventListener('mouseleave', () => hoverOut(contactBtn));
  }

  /* Developers modal interactions */
  const devCards = document.querySelectorAll('.dev-card');
  const modal = document.getElementById('devModal');
  const modalName = modal?.querySelector('.dev-modal-name');
  const modalRole = modal?.querySelector('.dev-modal-role');
  const modalBio = modal?.querySelector('.dev-modal-bio');
  const modalClose = modal?.querySelector('.dev-modal-close');
  const modalLinkWrapper = modal?.querySelector('.dev-modal-link-wrapper');
  const modalLink = modal?.querySelector('.dev-modal-link');
  const modalLinkLabel = modal?.querySelector('.dev-modal-link-label');
  const modalContactSpan = document.createElement('span');
  modalContactSpan.className = 'dev-modal-contact';
  modalLinkWrapper?.appendChild(modalContactSpan);
  let lastFocusedElement = null;

  function openModal(data) {
    if (!modal) return;
    if (modalName) modalName.textContent = data.name;
    if (modalRole) modalRole.textContent = data.role;
    if (modalBio) {
      const bioText = data.bio || '';
      modalBio.textContent = bioText;
      // Hide bio paragraph entirely if no bio provided
      modalBio.style.display = bioText ? '' : 'none';
    }
    if (modalContactSpan) {
      if (data.contact) {
        modalContactSpan.textContent = data.linkedin ? ` | Contact: ${data.contact}` : `Contact: ${data.contact}`;
        modalContactSpan.style.display = '';
      } else {
        modalContactSpan.textContent = '';
        modalContactSpan.style.display = 'none';
      }
    }
    if (modalLinkWrapper && modalLink && modalLinkLabel) {
      if (data.linkedin) {
        modalLink.href = data.linkedin;
        modalLink.style.display = '';
        modalLinkLabel.style.display = '';
        modalLink.textContent = 'View profile';
      } else {
        modalLink.removeAttribute('href');
        modalLink.style.display = 'none';
        modalLinkLabel.style.display = 'none';
      }
      modalLinkWrapper.style.display = (data.linkedin || data.contact) ? '' : 'none';
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    lastFocusedElement = document.activeElement;
    // Focus heading for screen readers
    modalName?.focus({ preventScroll: true });
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement && lastFocusedElement.focus) {
      lastFocusedElement.focus();
    }
  }

  devCards.forEach(card => {
    function gather() {
      return {
        name: card.getAttribute('data-name') || '',
        role: 'Developer',
        bio: '',
        contact: card.getAttribute('data-contact') || '',
        linkedin: card.getAttribute('data-linkedin') || ''
      };
    }
    card.addEventListener('click', () => openModal(gather()));
    card.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(gather());
      }
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) {
      closeModal();
    }
  });
});
