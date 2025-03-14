import { getStorageItemAsync } from "@/hooks/useStorageState";
import axios from "axios";

const axiosInstance = axios.create();


axiosInstance.defaults.baseURL = "http://192.168.15.182:5000/";
// axiosInstance.defaults.baseURL = "https://harmonia-flask.onrender.com/";


axiosInstance.interceptors.request.use(
  async (config: any) => {
    const session = await getStorageItemAsync('session');
    const token = session


    console.log("Token:", token);

   
    if (config.headers["Authorization"]) {
      config.headers["Authorization"] = null;
    }

  
    config.headers["Authorization"] = `Bearer ${token}`;

   
    if (config.params) {
      for (const key of Object.keys(config.params)) {
        if (config.params[key] === "") {
          delete config.params[key]; 
        } else if (typeof config.params[key] === "string") {
          config.params[key] = config.params[key].trim();
        }
      }
    }

    return config; 
  },
  (error: any) => {
   
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  function (response: any) {
    return response; 
  },
  function (error: any) {
    console.error("Error Status:", error.response?.status);
    console.error("Error Data:", error.response?.data);

   
    if (error.response?.status === 401) {
     
      console.log("Token expired or unauthorized. Trigger logout or refresh.");
    }

    return Promise.reject(error); 
  }
);

export default axiosInstance;
