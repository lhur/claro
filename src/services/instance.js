import axios from 'axios';
import { BASE_API } from "../config/consts";

const http = axios.create ({
  baseURL: BASE_API,
}); 

http.interceptors.request.use (
  function (config) {
    // console.log(config)
    return config;
  },

  function (error) {
    return Promise.reject (error);
  }

);

http.interceptors.response.use(
  function(config){
    // console.log(config)

    return config;
  },
  function(error){
    return Promise.reject(error);
  }
);

export default http
