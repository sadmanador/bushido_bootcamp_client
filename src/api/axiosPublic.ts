import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://server-five-lemon.vercel.app/",
});

export default axiosPublic;
