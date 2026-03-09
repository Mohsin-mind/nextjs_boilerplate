import { NextResponse } from 'next/server';
import { API_ERROR_CODES } from '@/constants/api';

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
  const code = meta?.code || API_ERROR_CODES.INTERNAL_ERROR;
  const validationErrors = meta?.validationErrors ?? null;

  return NextResponse.json(
    {
      success: false,
      error: {
        status,
        code,
        message,
        validationErrors,
      },
    },
    { status, headers }
  );
}
