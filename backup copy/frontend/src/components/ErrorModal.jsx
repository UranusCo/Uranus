import { useState, useEffect } from "react";
import { X, AlertCircle, RefreshCw, Wifi, WifiOff } from "lucide-react";

const ErrorModal = ({ error, onClose, onRetry }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
    }
  }, [error]);

  if (!error) return null;

  const getErrorDetails = (error) => {
    // Network errors
    if (!navigator.onLine) {
      return {
        title: "Connection Lost",
        message: "You're offline. Please check your internet connection and try again.",
        icon: <WifiOff className="w-8 h-8 text-error" />,
        type: "network",
        suggestions: [
          "Check your internet connection",
          "Try refreshing the page",
          "Wait a moment and try again"
        ]
      };
    }

    // API errors
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400:
          return {
            title: "Invalid Request",
            message: data?.message || "The request contains invalid data. Please check your input.",
            icon: <AlertCircle className="w-8 h-8 text-warning" />,
            type: "validation",
            suggestions: [
              "Check your input data",
              "Make sure all required fields are filled",
              "Try again with corrected information"
            ]
          };
        case 401:
          return {
            title: "Authentication Required",
            message: "You need to log in to continue.",
            icon: <AlertCircle className="w-8 h-8 text-error" />,
            type: "auth",
            suggestions: [
              "Log in to your account",
              "Check if your session has expired"
            ]
          };
        case 403:
          return {
            title: "Access Denied",
            message: data?.message || "You don't have permission to perform this action.",
            icon: <AlertCircle className="w-8 h-8 text-error" />,
            type: "permission",
            suggestions: [
              "Check your account permissions",
              "Contact support if you believe this is an error"
            ]
          };
        case 404:
          return {
            title: "Not Found",
            message: "The requested resource could not be found.",
            icon: <AlertCircle className="w-8 h-8 text-warning" />,
            type: "not_found",
            suggestions: [
              "Check the URL or link",
              "Try refreshing the page",
              "Go back to the previous page"
            ]
          };
        case 429:
          return {
            title: "Too Many Requests",
            message: "You're making requests too quickly. Please wait a moment.",
            icon: <AlertCircle className="w-8 h-8 text-warning" />,
            type: "rate_limit",
            suggestions: [
              "Wait a few seconds before trying again",
              "Reduce the frequency of your actions"
            ]
          };
        case 500:
        case 502:
        case 503:
        case 504:
          return {
            title: "Server Error",
            message: "Something went wrong on our end. We're working to fix it.",
            icon: <AlertCircle className="w-8 h-8 text-error" />,
            type: "server",
            suggestions: [
              "Try again in a few moments",
              "Check our status page for updates",
              "Contact support if the problem persists"
            ]
          };
        default:
          return {
            title: "Something Went Wrong",
            message: data?.message || "An unexpected error occurred.",
            icon: <AlertCircle className="w-8 h-8 text-error" />,
            type: "unknown",
            suggestions: [
              "Try again",
              "Refresh the page",
              "Contact support if the problem continues"
            ]
          };
      }
    }

    // Network errors (no response)
    if (error.request) {
      return {
        title: "Connection Error",
        message: "Unable to connect to the server. Please check your connection.",
        icon: <Wifi className="w-8 h-8 text-warning" />,
        type: "network",
        suggestions: [
          "Check your internet connection",
          "Try again in a moment",
          "Contact support if the problem persists"
        ]
      };
    }

    // Other errors
    return {
      title: "Unexpected Error",
      message: error.message || "An unexpected error occurred.",
      icon: <AlertCircle className="w-8 h-8 text-error" />,
      type: "unknown",
      suggestions: [
        "Try refreshing the page",
        "Clear your browser cache",
        "Contact support for help"
      ]
    };
  };

  const errorDetails = getErrorDetails(error);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Allow animation to complete
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
      handleClose();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className={`relative bg-base-100 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 ${
        isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-300">
          <div className="flex items-center gap-3">
            {errorDetails.icon}
            <h3 className="text-lg font-semibold text-base-content">
              {errorDetails.title}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-base-content/80 mb-4">
            {errorDetails.message}
          </p>

          {/* Suggestions */}
          <div className="mb-6">
            <h4 className="font-medium text-base-content mb-2">What you can try:</h4>
            <ul className="space-y-1">
              {errorDetails.suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-base-content/70 flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>


          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleClose}
              className="btn btn-ghost btn-sm"
            >
              Close
            </button>
            {onRetry && errorDetails.type !== 'auth' && (
              <button
                onClick={handleRetry}
                className="btn btn-primary btn-sm"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;