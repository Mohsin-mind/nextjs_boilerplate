/**
 * Response helper functions - similar to how auth-error.js handles auth errors.
 * Provides consistent response checking across the app.
 */

/**
 * Check if API response is successful.
 * @param {any} response - The response object from API
 * @returns {boolean} - True only when response.success is explicitly true
 */
export function isSuccess(response) {
  if (!response) return false;
  if (typeof response !== 'object') return false;
  return response.success === true;
}

/**
 * Check if API response is an error.
 * @param {any} response
 * @returns {boolean}
 */
export function isError(response) {
  return !isSuccess(response);
}

/**
 * Get data from response safely.
 * @param {any} response
 * @returns {any} - The data or null if error
 */
export function getData(response) {
  return isSuccess(response) ? response.data : null;
}

/**
 * Get error message from response.
 * @param {any} response
 * @returns {string}
 */
export function getErrorMessage(response) {
  if (isError(response)) {
    return response?.error?.message || '';
  }
  return '';
}

/**
 * Get metadata from response.
 * @param {any} response
 * @returns {any}
 */
export function getMeta(response) {
  return response?.meta || null;
}

/**
 * Build a throwable Error from an API envelope response.
 * Useful when you want TanStack Query's error state to work with envelope responses.
 * @param {any} response
 * @returns {Error}
 */
export function toApiError(response) {
  const err = new Error(getErrorMessage(response));
  err.status = response?.error?.status;
  err.code = response?.error?.code;
  err.validationErrors = response?.error?.validationErrors ?? null;
  err.response = response;
  return err;
}
