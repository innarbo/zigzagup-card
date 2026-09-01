// Version 18 direct Save PDF flow.
// Version 17 mobile one-pager + safe original PDF viewer.
// Version 16 original one-pager hosting.
// Version 14 icon spacing + vCard photo.
// Version 13 Home Screen owner-mode and external-link fix.
// Version 11 supporting-text CSS fix.
// Version 10 supporting text line-break refinement.
// Version 9 headline line-break refinement.
// Version 8 headline line-lock refresh.
// Version 7 supporting line refresh.
// Version 6 headline highlight refresh.
// Version 5 layout refresh.
(() => {
  'use strict';

  const CARD_URL = 'https://innarbo.github.io/zigzagup-card/';
  const modal = document.getElementById('qrModal');
  const modalCard = modal?.querySelector('.modal-card');
  const openButtons = document.querySelectorAll('[data-open-qr]');
  const profileButtons = document.querySelectorAll('[data-show-profile]');
  const externalLinks = document.querySelectorAll('[data-external-link]');
  const closeButtons = document.querySelectorAll('[data-close-qr]');
  const shareButton = document.getElementById('shareButton');
  const copyLinkButton = document.getElementById('copyLinkButton');
  const walletButton = document.getElementById('walletButton');
  const toast = document.getElementById('toast');
  let previousFocus = null;
  let toastTimer = null;

  const params = new URLSearchParams(location.search);
  const isStandalone =
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;
  const isOwnerMode =
    isStandalone ||
    params.get('source') === 'home-screen' ||
    params.get('owner') === '1';
  const isMobileCard = () => window.matchMedia('(max-width: 860px)').matches;

  function setAppView(view) {
    if (!isOwnerMode || !isMobileCard()) return;
    const nextView = view === 'profile' ? 'profile' : 'qr';
    document.documentElement.classList.toggle('app-view-profile', nextView === 'profile');
    document.documentElement.classList.toggle('app-view-qr', nextView === 'qr');
    document.body.dataset.appView = nextView;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  if (isOwnerMode) {
    document.documentElement.classList.add('is-standalone', 'is-owner-mode');
    setAppView(params.get('view') === 'profile' ? 'profile' : 'qr');
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2200);
  }

  function openQr() {
    if (!modal) return;
    previousFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => modalCard?.focus());
    history.replaceState(null, '', '#qr');
  }

  function closeQr(updateUrl = true) {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (updateUrl && location.hash === '#qr') {
      history.replaceState(null, '', location.pathname + location.search);
    }
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  }

  openButtons.forEach(button => button.addEventListener('click', () => {
    if (isOwnerMode && isMobileCard()) {
      setAppView('qr');
      return;
    }
    openQr();
  }));
  profileButtons.forEach(button => button.addEventListener('click', () => setAppView('profile')));

  // Leave the owner app on its QR screen while LinkedIn, Drive, or Mail opens externally.
  externalLinks.forEach(link => link.addEventListener('click', () => {
    if (isOwnerMode && isMobileCard()) setAppView('qr');
  }));
  closeButtons.forEach(button => button.addEventListener('click', () => closeQr()));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeQr();
  });

  async function copyCardLink() {
    try {
      await navigator.clipboard.writeText(CARD_URL);
      showToast('Card link copied');
    } catch (_) {
      const input = document.createElement('textarea');
      input.value = CARD_URL;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
      showToast('Card link copied');
    }
  }

  copyLinkButton?.addEventListener('click', copyCardLink);

  shareButton?.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Inna Arbo | ZigZagUp',
          text: 'Build judgment in the age of answers.',
          url: CARD_URL
        });
        return;
      } catch (error) {
        if (error?.name === 'AbortError') return;
      }
    }
    await copyCardLink();
  });

  // A real Wallet pass must be signed. Keep the action hidden until the signed
  // file is added to /wallet/inna-arbo.pkpass.
  if (walletButton) {
    fetch('./wallet/inna-arbo.pkpass', { method: 'HEAD', cache: 'no-store' })
      .then(response => { if (response.ok) walletButton.hidden = false; })
      .catch(() => { /* Keep hidden when no signed pass is present. */ });
  }

  if (location.hash === '#qr' || params.get('qr') === '1') {
    if (isOwnerMode && isMobileCard()) setAppView('qr');
    else openQr();
  }

  window.addEventListener('hashchange', () => {
    if (location.hash !== '#qr') closeQr(false);
  });

  // iOS can resume a Home Screen web app where it was left. Return the owner's app
  // to the dark QR screen whenever it comes back from another app or the Home Screen.
  let wasHidden = false;
  document.addEventListener('visibilitychange', () => {
    if (!isOwnerMode || !isMobileCard()) return;
    if (document.hidden) {
      wasHidden = true;
      return;
    }
    if (wasHidden) {
      setAppView('qr');
      wasHidden = false;
    }
  });
  window.addEventListener('pageshow', () => {
    if (isOwnerMode && isMobileCard()) setAppView('qr');
  });

  // Version 4 cache fix: this card is small and does not need an offline service worker.
  // Remove any older ZigZagUp service worker and stale caches so updates appear immediately.
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map(registration => registration.unregister()));
        if ('caches' in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map(key => caches.delete(key)));
        }
      } catch (_) {
        // The page remains fully functional if cleanup is unavailable.
      }
    });
  }
})();
