(() => {
  'use strict';

  const CARD_URL = 'https://innarbo.github.io/zigzagup-card/';
  const modal = document.getElementById('qrModal');
  const modalCard = modal?.querySelector('.modal-card');
  const openButtons = document.querySelectorAll('[data-open-qr]');
  const closeButtons = document.querySelectorAll('[data-close-qr]');
  const shareButton = document.getElementById('shareButton');
  const copyLinkButton = document.getElementById('copyLinkButton');
  const walletButton = document.getElementById('walletButton');
  const toast = document.getElementById('toast');
  let previousFocus = null;
  let toastTimer = null;

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

  openButtons.forEach(button => button.addEventListener('click', openQr));
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

  if (location.hash === '#qr' || new URLSearchParams(location.search).get('qr') === '1') {
    openQr();
  }

  window.addEventListener('hashchange', () => {
    if (location.hash !== '#qr') closeQr(false);
  });

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js', { scope: './' }).catch(() => {});
    });
  }
})();
