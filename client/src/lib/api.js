const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(payload.error ?? 'Could not reach the server');
    error.details = payload.details ?? null;
    throw error;
  }

  return payload;
}

export const api = {
  getRates: (rateType = 'currency') => request(`/rates?type=${rateType}`),
  getCurrencies: () => request('/rates/currencies'),
  getNews: () => request('/news'),
  getFaqs: (category) => request(`/faqs${category ? `?category=${category}` : ''}`),
  getBranches: () => request('/contact/branches'),

  sendOtp: (body) =>
    request('/otp/send', { method: 'POST', body: JSON.stringify(body) }),

  submitQuote: (body) =>
    request('/quotes', { method: 'POST', body: JSON.stringify(body) }),

  submitContactMessage: (body) =>
    request('/contact', { method: 'POST', body: JSON.stringify(body) }),
};