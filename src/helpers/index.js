export const handleApiError = (error) => {
  let errorMessage = "Something went wrong. Please try again.";

  if (error.response) {
    const { status, data } = error.response;
    errorMessage = data?.message || `Request failed with status ${status}`;
  } else if (error.request) {
    errorMessage =
      "No response from server. Please check your internet connection.";
  } else {
    errorMessage = error.message || errorMessage;
  }

  console.error("API Error:", errorMessage);
  return { success: false, message: errorMessage };
};
