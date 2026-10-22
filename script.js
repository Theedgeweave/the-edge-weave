'use strict';
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('open', !expanded);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-product]').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#product-select').value = link.dataset.product;
}));
document.querySelector('#quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const get = key => String(data.get(key) || '').trim();
  const subject = `Wholesale enquiry — ${get('product')} — ${get('company') || get('name')}`;
  const body = [
    'Hello The Edge Weave,', '', 'I would like to request a wholesale quotation.', '',
    `Name: ${get('name')}`, `Company / brand: ${get('company') || 'Not provided'}`,
    `Email: ${get('email')}`, `Country: ${get('country')}`,
    `Product: ${get('product')}`, `Estimated quantity: ${get('quantity') || 'To be discussed'}`,
    '', 'Project details:', get('details'), '', 'Please advise on availability, MOQ, pricing, sample options and estimated lead time.', '', 'Thank you.'
  ].join('\n');
  const mailto = `mailto:edgeweave@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#form-status').textContent = 'Your email application should open. Please press Send there to submit your enquiry. If it does not open, email edgeweave@gmail.com directly.';
  window.location.href = mailto;
});
