import axiosInstance from "./axiosInstance";

export const signupUser = async (userData: {
  email: string;
  password: string;
  name: string
}) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    // console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error("Signup API Error:", error.response?.data || error.message);
    throw error;
  }
};


export const loginUser = async (userData: {
  email: string;
  password: string;
  // role: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/login", userData);

    return response.data;
  } catch (error: any) {
    console.error("LogIn API Error:", error.response?.data || error.message);
    throw error;
  }
};


export const verifyEmailOTP = async (params: {
  email: string;
  otp: string;
  role: string;
}) => {
  try {
    // console.log(params);
    const response = await axiosInstance.post("/user/auth/otp/verify", params);

    return response.data;
  } catch (error: any) {
    console.error("Verify Email OTP Error:", error.response?.data || error.message);
    throw error;
  }
};



export const sendEmailOTP = async (params: {
  email: string;
  
}) => {
  try {
    const response = await axiosInstance.post("user/auth/otp/send", params);

    return response.data;
  } catch (error: any) {
    console.error("Send Email OTP Error:", error.response?.data || error.message);
    throw error;
  }
};