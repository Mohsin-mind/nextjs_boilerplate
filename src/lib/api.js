/**
 * Base fetch wrapper — all API calls go through this.
 * Handles base URL, JSON parsing, and standardised error throwing.
 *
 * IMPORTANT: Returns the FULL response envelope { success, message, data, meta }
 * so callers can access all properties, not just data.
 *
 * @param {string} endpoint - Path relative to base URL e.g. "/api/users"
 * @param {RequestInit} [options] - Standard fetch options
 * @returns {Promise<{ success: boolean, message: string, data: any, meta: any }>}
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

  // Handle 204 No Content
  if (response.status === 204) {
    return {
      success: true,
      message: 'No content',
      data: null,
      meta: { status: 204 },
    };
  }

  const payload = await response.json().catch(() => null);

  // If error response (4xx, 5xx), return error envelope
  if (!response.ok) {
    return {
      success: false,
      message:
        payload?.message ||
        payload?.error?.message ||
        response.statusText ||
        `HTTP ${response.status}`,
      data: null,
      meta: {
        status: response.status,
        ...(payload?.error?.code ? { code: payload.error.code } : {}),
      },
    };
  }

  // Return full envelope for successful responses
  // Handles both wrapped { success, data, meta } and unwrapped responses
  if (payload && typeof payload === 'object') {
    // Already has envelope format
    if ('success' in payload || 'data' in payload) {
      return {
        success: payload.success ?? true,
        message: payload.message ?? 'Success',
        data: payload.data ?? null,
        meta: {
          ...(payload.meta ?? {}),
          status: response.status,
        },
      };
    }
    // Plain data - wrap it
    return {
      success: true,
      message: 'Success',
      data: payload,
      meta: { status: response.status },
    };
  }

  // Non-object response
  return {
    success: true,
    message: 'Success',
    data: payload,
    meta: { status: response.status },
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
