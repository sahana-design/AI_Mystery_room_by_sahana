const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
export async function request(path, options = {}) {
  let response;
  try { response = await fetch(`${API}${path}`, { credentials: 'include', headers: { 'Content-Type': 'application/json', ...options.headers }, ...options }); }
  catch { throw new Error('Could not reach the case server. Check your connection and try again.'); }
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body?.error?.message || 'Something went wrong. Please try again.');
  return body.data;
}
