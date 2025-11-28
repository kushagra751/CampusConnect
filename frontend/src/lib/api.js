// API Configuration
// Change this if your backend is running on a different port
export const API_BASE_URL = "http://localhost:3000";

// API endpoints
export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/user/login`,
  signup: `${API_BASE_URL}/user/signup`,
  logout: `${API_BASE_URL}/user/logout`,
  forgetPassword: `${API_BASE_URL}/user/forgetpassword`,
  verifyOtp: `${API_BASE_URL}/user/verifyotp`,
  resetPassword: `${API_BASE_URL}/user/resetpassword`,
  getUserProfile: `${API_BASE_URL}/user/profile`,
  updateProfile: `${API_BASE_URL}/user/profile/update`,
  createEvent: `${API_BASE_URL}/user/events/create`,
  joinEvent: `${API_BASE_URL}/user/events/join`,
  createRoom: `${API_BASE_URL}/user/rooms/create`,
  joinRoom: `${API_BASE_URL}/user/rooms/join`,
  messageMentor: `${API_BASE_URL}/user/mentors/message`,
};

// Helper function to make authenticated API requests
export const apiRequest = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    return null;
  }

  return response;
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  }
  return null;
};

