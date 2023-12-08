"use client";

import { AxiosError } from "axios";
import { ApiResponse } from "../api/serverFunctionResponseToApiResponse";

export function getMessageOnError(err: Error) {
  if (err instanceof AxiosError) {
    const res = err.response?.data as ApiResponse<undefined>;
    return res.message;
  }
}

export function getMessageOnSuccess(data: unknown) {
  if (data instanceof Object && "message" in data) {
    const res = data;
    if (typeof res.message === "string") {
      return res.message;
    }
  }
}
