import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx support.
 * Use this everywhere instead of string concatenation for class names.
 * @param {...(string|undefined|null|boolean|object)} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
