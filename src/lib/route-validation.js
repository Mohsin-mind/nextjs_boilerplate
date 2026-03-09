import { error } from '@/lib/api-response';
import { API_ERROR_CODES, API_ERROR_MESSAGES } from '@/constants/api';

/**
 * Validate query params with a Zod schema and return either parsed data or an error response.
 * @param {Request} request
 * @param {import('zod').ZodSchema<any>} schema
 * @param {{
 *   headers?: Record<string, string>
 * }} [options]
 * @returns {{ data: any | null, response: Response | null }}
 */
export function validateQuery(request, schema, options = {}) {
  const { headers = {} } = options;

  const { searchParams } = new URL(request.url);
  const payload = Object.fromEntries(searchParams.entries());
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    return {
      data: null,
      response: error(
        422,
        API_ERROR_MESSAGES.VALIDATION_FAILED,
        {
          code: API_ERROR_CODES.VALIDATION_ERROR,
          validationErrors: parsed.error.issues,
        },
        { headers }
      ),
    };
  }

  return {
    data: parsed.data,
    response: null,
  };
}
