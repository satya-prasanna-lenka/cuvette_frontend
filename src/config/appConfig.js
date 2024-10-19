export const API_URL = "http://localhost:5000/api";

export const endPoints = () => ({
  signupUrl: `${API_URL}/users/register`,
  sendOtpUrl: `${API_URL}/users/send-otp`,
  verifyOtpUrl: `${API_URL}/users/verify-otp`,
  testUrl: `${API_URL}/users/test`,
  addInterviewUrl: `${API_URL}/users/addInterview`,
});