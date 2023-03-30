import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IHttpRequest {
  get<ResponseType = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseType>>;
  post<ResponseType = any>(
    url: string,
    payload?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseType>>;
  delete<ResponseType = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseType>>;
  put<ResponseType = any>(
    url: string,
    payload?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseType>>;
}

export class HttpRequest implements IHttpRequest {
  private instance: AxiosInstance;

  constructor(baseURL?: string) {
    this.instance = axios.create({ baseURL });
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.instance.get(url, config);
  }

  post(url: string, payload?: any, config?: AxiosRequestConfig) {
    return this.instance.post(url, payload, config);
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete(url, config);
  }

  put(url: string, payload?: any, config?: AxiosRequestConfig) {
    return this.instance.put(url, payload, config);
  }
}
