import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { BASE_URL } from "./urls";

export const axiosLoggedInConfig = () => {
  const axiosService = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('lgac')}`
    }
  });

  axiosService.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('lgac');

    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosService.interceptors.response.use(
    (res) => Promise.resolve(res),
    (err) => Promise.reject(err)
  );

  const refreshAuthLogic = async (failedRequest) => {
    const refreshToken = localStorage.getItem('lgrf');
    if (refreshToken !== null) {
      return axios
        .post(
          'refreshtoken/',
          {
            refresh: refreshToken
          },
          {
            baseURL: BASE_URL
          }
        )
        .then((resp) => {
          const { access } = resp.data;
          failedRequest.response.config.headers.Authorization = `Bearer ${access}`;
          localStorage.setItem('lgac', access);
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            localStorage.setItem('lgac', 'null');
            localStorage.setItem('lgrf', 'null');
          }
        });
    }
  };

  createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

  return axiosService;
};

export const axiosLoggedOutConfig = axios.create({});