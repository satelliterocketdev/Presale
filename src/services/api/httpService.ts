import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const IS_LOCAL = false; // window.location.hostname === 'localhost';
const API_URL = IS_LOCAL
  ? 'http://localhost:3000'
  : 'https://api.joystickgames.com';

class HttpService {
  private apiUrl: string;
  private axios = {} as AxiosInstance;

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl ? apiUrl : '';
    this.createAxiosInstance();
  }

  private createAxiosInstance() {
    this.axios = axios.create();
  }

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.axios.get<T>(this.apiUrl + url, config);
  }

  put<T>(url: string, payload?: object, config?: AxiosRequestConfig) {
    return this.axios.put<T>(this.apiUrl + url, payload, config);
  }

  post<T>(url: string, payload?: object, config?: AxiosRequestConfig) {
    return this.axios.post<T>(this.apiUrl + url, payload, config);
  }

  patch<T>(url: string, payload: object, config?: AxiosRequestConfig) {
    return this.axios.patch<T>(this.apiUrl + url, payload, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete<T>(this.apiUrl + url, config);
  }
}

export const http = new HttpService(API_URL);
