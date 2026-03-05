/**
 * Base fetch wrapper — all API calls go through this.
 * Handles base URL, JSON parsing, and standardised error throwing.
 * @param {string} endpoint - Path relative to base URL e.g. "/api/users"
 * @param {RequestInit} [options] - Standard fetch options
 * @returns {Promise<any>} Parsed JSON response
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  // Handle 204 No Content
  if (response.status === 204) return null;

  return response.json();
}

export const api = {
  /**
   * @param {string} endpoint
   * @param {RequestInit} [options]
   */
  get: (endpoint, options) => apiFetch(endpoint, { method: 'GET', ...options }),

  /**
   * @param {string} endpoint
   * @param {any} body
   * @param {RequestInit} [options]
   */
  post: (endpoint, body, options) =>
    apiFetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    }),

  /**
   * @param {string} endpoint
   * @param {any} body
   * @param {RequestInit} [options]
   */
  put: (endpoint, body, options) =>
    apiFetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    }),

  /**
   * @param {string} endpoint
   * @param {any} body
   * @param {RequestInit} [options]
   */
  patch: (endpoint, body, options) =>
    apiFetch(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...options,
    }),

  /**
   * @param {string} endpoint
   * @param {RequestInit} [options]
   */
  delete: (endpoint, options) => apiFetch(endpoint, { method: 'DELETE', ...options }),
};
