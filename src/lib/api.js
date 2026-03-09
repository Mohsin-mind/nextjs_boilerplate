import { API_ERROR_CODES, API_ERROR_MESSAGES } from '@/constants/api';

/**
 * Base fetch wrapper — all API calls go through this.
 * Handles base URL and JSON parsing.
 *
 * IMPORTANT: Returns backend response payload as-is.
 *
 * @param {string} endpoint - Path relative to base URL e.g. "/api/users"
 * @param {RequestInit} [options] - Standard fetch options
 * @returns {Promise<any>}
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL?.trim()}${endpoint}`;

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  const payload = await response.json().catch(() => null);
  if (payload) return payload;

  if (!response.ok) {
    return {
      success: false,
      error: {
        status: response.status,
        code: API_ERROR_CODES.HTTP_ERROR,
        message: response.statusText,
        validationErrors: null,
      },
    };
  }

  return {
    success: false,
    error: {
      status: response.status,
      code: API_ERROR_CODES.INVALID_RESPONSE,
      message: API_ERROR_MESSAGES.INVALID_RESPONSE,
      validationErrors: null,
    },
  };
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
