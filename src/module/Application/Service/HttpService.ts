import { notifications } from '@mantine/notifications';
import axios from 'axios';

import { SERVICE_GLOBAL_ERROR } from '@/Application/Constant';
import { isBrowser } from '@/Application/Helper';
import { CookieService } from '@/Application/Service';

export const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  failedRequest => Promise.reject(failedRequest),
);
axiosInstance.interceptors.response.use(
  config => {
    return config;
  },
  failedRequest => {
    const { response, config, code } = failedRequest;
    if (isBrowser() && !config?.extraMap?.disabledAutoError && code !== 'ERR_CANCELED') {
      const message = response?.data?.error || SERVICE_GLOBAL_ERROR;
      notifications.show({
        message,
        variant: 'error',
      });
    }
    return Promise.reject(failedRequest);
  },
);

axiosInstance.interceptors.request.use(
  config => {
    // for client side
    if (isBrowser()) {
      const token = CookieService.getAccessToken();
      // @ts-ignore
      if (token && !config.guestMode) config.headers.Authorization = `Bearer ${token}`;
    }
    // for ssr
    if (config.headers?.serverAuthorization) {
      config.headers.Authorization = `Bearer ${config.headers.serverAuthorization}`;
    }
    return config;
  },
  error => Promise.reject(error),
);
