/**
 * Inline feedback under a form. `type` is 'success' or 'error'.
 * Announced to screen readers because it appears after an action.
 */
export default function FormStatus({ type, message }) {
  if (!message) return null;

  const styles =
    type === 'success'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
      : 'border-red-200 bg-red-50 text-red-700';

  return (
    <p role="status" className={`mt-4 rounded-md border px-4 py-3 text-sm ${styles}`}>
      {message}
    </p>
  );
}
