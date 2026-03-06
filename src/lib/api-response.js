import { NextResponse } from 'next/server';

export const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store',
};

/**
 * Standard success response envelope.
 * @param {number} [status]
 * @param {string} [message]
 * @param {any} [data]
 * @param {Record<string, any>} [meta]
 * @param {{ headers?: Record<string, string> }} [options]
 */
export function success(status = 200, message = 'Success', data = null, meta = {}, options = {}) {
  const { headers = {} } = options;
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      meta,
    },
    { status, headers }
  );
}

/**
 * Standard error response envelope.
 * @param {number} [status]
 * @param {string} [message]
 * @param {Record<string, any>} [meta]
 * @param {{ headers?: Record<string, string> }} [options]
 */
export function error(status = 500, message = 'Error', meta = {}, options = {}) {
  const { headers = {} } = options;
  return NextResponse.json(
    {
      success: false,
      message,
      data: null,
      meta,
    },
    { status, headers }
  );
}

// Backward-compatible aliases.
export function apiSuccess(data, options = {}) {
  const status = options.status ?? 200;
  return success(status, 'Success', data, {}, options);
}

export function apiError(errorInput, options = {}) {
  const status = options.status ?? 400;
  if (typeof errorInput === 'string') {
    return error(status, errorInput, {}, options);
  }

  const message = errorInput?.message || 'Error';
  const meta = {
    ...(errorInput?.code ? { code: errorInput.code } : {}),
    ...(errorInput?.details ? { details: errorInput.details } : {}),
  };
  return error(status, message, meta, options);
}
