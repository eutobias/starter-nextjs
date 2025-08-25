import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { NextApiResponse } from "next";

export interface HttpConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface HttpResponse<T = any> {
  data?: T;
  status: number;
  statusText: string;
  headers?: any;
}

export class HttpService {
  private instance: AxiosInstance;

  constructor(config: HttpConfig = {}) {
    this.instance = axios.create({
      baseURL: config.baseURL || process.env.NEXT_PUBLIC_API_URL || "/api",
      timeout: config.timeout || 10000,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - clear token and redirect
          this.clearAuthToken();
          if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
          }
        }
        return Promise.reject(
          new HttpError(
            error.response?.status || 0,
            error.response?.statusText || "Network Error",
            error.response?.data
          )
        );
      }
    );
  }

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth-token");
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    const response = await this.instance.get<T>(url, config);
    return this.transformResponse(response);
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    const response = await this.instance.post<T>(url, data, config);
    return this.transformResponse(response);
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    const response = await this.instance.put<T>(url, data, config);
    return this.transformResponse(response);
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    const response = await this.instance.patch<T>(url, data, config);
    return this.transformResponse(response);
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    const response = await this.instance.delete<T>(url, config);
    return this.transformResponse(response);
  }

  private transformResponse<T>(response: AxiosResponse<T>): HttpResponse<T> {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  // Set default header
  setHeader(key: string, value: string): void {
    this.instance.defaults.headers.common[key] = value;
  }

  // Remove header
  removeHeader(key: string): void {
    delete this.instance.defaults.headers.common[key];
  }

  // Set auth token
  setAuthToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth-token", token);
    }
    this.setHeader("Authorization", `Bearer ${token}`);
  }

  // Clear auth token
  clearAuthToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth-token");
    }
    this.removeHeader("Authorization");
  }

  // Get axios instance for advanced usage
  getInstance(): AxiosInstance {
    return this.instance;
  }
}

export class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: any
  ) {
    super(`HTTP Error ${status}: ${statusText}`);
    this.name = "HttpError";
  }
}

// Default instance
export const httpService = new HttpService();

// Factory for creating custom instances
export const createHttpService = (config: HttpConfig) =>
  new HttpService(config);

// Factory for creating error responses
export const createHttpResponse = (res:NextApiResponse ,{
  status,
  data,
}: {
  status: 200 | 201 | 204 | 400 | 401 | 404 | 405 | 500;
  data?: any;
}) => {
  const statusText: Record<number, string> = {
    200: "OK",
    201: "Created",
    204: "No Content",
    400: "Bad Request",
    404: "Not Found",
    401: "Unauthorized",
    405: "Method Not Allowed",
    500: "Internal Server Error",
  };

  return res.status(status).json({
    data,
    status,
    statusText: statusText[status],
  });
};
