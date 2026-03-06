/**
 * Response helper functions - similar to how auth-error.js handles auth errors.
 * Provides consistent response checking across the app.
 */

/**
 * Check if API response is successful.
 * @param {any} response - The response object from API
 * @returns {boolean} - True if success is true/undefined and data exists
 */
export function isSuccess(response) {
  if (!response) return false;
  if (typeof response !== 'object') return false;
  // success can be true, or undefined (for backward compatibility treat undefined as success if data exists)
  return (
    response.success === true || (response.success === undefined && response.data !== undefined)
  );
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
 * @param {string} [fallback]
 * @returns {string}
 */
export function getErrorMessage(response, fallback = 'An error occurred') {
  if (isError(response)) {
    return response.message || fallback;
  }
  return fallback;
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
 * @param {string} [fallback]
 * @returns {Error}
 */
export function toApiError(response, fallback = 'An error occurred') {
  const err = new Error(getErrorMessage(response, fallback));
  err.status = response?.meta?.status;
  err.code = response?.meta?.code;
  err.response = response;
  return err;
}
