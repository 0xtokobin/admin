import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:4000/api", // 基础URL
  timeout: 10000, // 请求超时
  withCredentials: true, // 跨域请求时是否需要使用凭证
});

// 请求拦截
http.interceptors.request.use(
  (config) => {
    // 如果有token，可以在这里设置请求头
    // config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  },
  (error) => {
    // 请求错误处理
    console.error(error);
    return Promise.reject(error);
  }
);

// 响应拦截
http.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 根据返回的code值来做不同的处理（和后端约定）
    return res;
  },
  (error) => {
    // 错误处理
    console.error("Error:", error.response);
    return Promise.reject(error);
  }
);

export default http;
