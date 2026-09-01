/** Formats a number as Indian rupees, e.g. 95.96 -> "₹95.96". */
export function formatRupees(value, { decimals = 2 } = {}) {
  return `₹${Number(value).toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

/** Formats a timestamp the way the rates table shows it. */
export function formatUpdatedAt(value) {
  if (!value) return '';

  return new Date(value).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/** Formats a publish date, e.g. "18 Jun 2026". */
export function formatDate(value) {
  if (!value) return '';

  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
