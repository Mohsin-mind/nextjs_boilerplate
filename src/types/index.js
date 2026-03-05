/**
 * JSDoc type definitions for the application.
 * These provide IDE autocomplete and type safety without TypeScript.
 * Import types using: @param {import("@/types").User} user
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {boolean} emailVerified
 * @property {string|null} image
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {any} [data]
 * @property {string} [message]
 * @property {string} [error]
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {any[]} data
 * @property {number} total
 * @property {number} page
 * @property {number} pageSize
 * @property {boolean} hasNextPage
 */

/**
 * @typedef {Object} PaginationParams
 * @property {number} [page=1]
 * @property {number} [pageSize=10]
 */

export {};
