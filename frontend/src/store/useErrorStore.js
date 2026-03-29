import { create } from "zustand";

export const useErrorStore = create((set, get) => ({
  currentError: null,
  errorQueue: [],

  // Show an error modal
  showError: (error, onRetry = null) => {
    const errorWithRetry = { error, onRetry, id: Date.now() };
    set({ currentError: errorWithRetry });
  },

  // Clear current error
  clearError: () => {
    set({ currentError: null });
  },

  // Retry the current error's action
  retryCurrentError: () => {
    const { currentError } = get();
    if (currentError?.onRetry) {
      currentError.onRetry();
      set({ currentError: null });
    }
  },

  // Enhanced error handler that replaces toast.error
  handleError: (error, customMessage = null, onRetry = null) => {
    console.error("Error handled:", error);

    // If it's already an error object with response, use it directly
    if (error?.response || error?.request) {
      get().showError(error, onRetry);
      return;
    }

    // If it's a string, create a simple error object
    if (typeof error === 'string') {
      const simpleError = {
        message: customMessage || error,
        isSimpleError: true
      };
      get().showError(simpleError, onRetry);
      return;
    }

    // For other cases, create a generic error
    const genericError = {
      message: customMessage || "An unexpected error occurred",
      originalError: error,
      isSimpleError: true
    };
    get().showError(genericError, onRetry);
  },

  // Helper to handle API errors with user-friendly messages
  handleApiError: (error, action = "perform this action", onRetry = null) => {
    const message = error?.response?.data?.message || `Failed to ${action}`;
    get().handleError(error, message, onRetry);
  }
}));