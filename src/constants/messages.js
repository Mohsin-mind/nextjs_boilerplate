// Centralised UI strings — avoids magic strings scattered across components

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Welcome back!",
  LOGIN_ERROR: "Invalid email or password.",
  REGISTER_SUCCESS: "Account created successfully.",
  REGISTER_ERROR: "Failed to create account. Please try again.",
  LOGOUT_SUCCESS: "You have been logged out.",
  SESSION_EXPIRED: "Your session has expired. Please log in again.",
};

export const FORM_MESSAGES = {
  REQUIRED: "This field is required.",
  INVALID_EMAIL: "Please enter a valid email address.",
  PASSWORD_MIN: "Password must be at least 8 characters.",
  PASSWORDS_MISMATCH: "Passwords do not match.",
  NAME_MIN: "Name must be at least 2 characters.",
};

export const GENERAL_MESSAGES = {
  LOADING: "Loading...",
  ERROR_GENERIC: "Something went wrong. Please try again.",
  NOT_FOUND: "The page you are looking for does not exist.",
  UNAUTHORIZED: "You are not authorized to view this page.",
};
