import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "./serverFunctionResponseToApiResponse";

function responseBody<T>(res: AxiosResponse<T>) {
  return res.data;
}

function get<T>(url: string) {
  return axios
    .get<ApiResponse<T>>(url)
    .then((res) => responseBody<ApiResponse<T>>(res));
}

function post<T, V>(url: string, body: V) {
  return axios
    .post<ApiResponse<T>>(url, body)
    .then((res) => responseBody<ApiResponse<T>>(res));
}

function put<T, V>(url: string, body: V) {
  return axios
    .put<ApiResponse<T>>(url, body)
    .then((res) => responseBody<ApiResponse<T>>(res));
}

function patch<T, V>(url: string, body: V) {
  return axios
    .patch<ApiResponse<T>>(url, body)
    .then((res) => responseBody<ApiResponse<T>>(res));
}

function del<T>(url: string) {
  return axios
    .delete<ApiResponse<T>>(url)
    .then((res) => responseBody<ApiResponse<T>>(res));
}

export const requests = {
  get,
  post,
  put,
  patch,
  del,
};
