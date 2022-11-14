import axios from 'axios';

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


  return axiosService;
};

export const axiosLoggedOutConfig = axios.create({});