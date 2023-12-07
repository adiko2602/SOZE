import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import {
  ErrorServerFunctionResponse,
  ServerFunctionResponse,
} from "./serverFunctionResponse";

export class ApiResponse<T> extends ServerFunctionResponse<T> {}

export function serverFunctionToApiResponse<T>(
  serverFunctionResponse: ServerFunctionResponse<any>
): ApiResponse<any> {
  return new ApiResponse<T>(
    serverFunctionResponse.success,
    serverFunctionResponse.message,
    serverFunctionResponse.data
  );
}

function handleResponse<T>(
  serverFunctionResponse: ServerFunctionResponse<T>,
  status: HttpStatusCode
): NextResponse {
  const response = serverFunctionToApiResponse<T>(serverFunctionResponse);

  if (serverFunctionResponse instanceof ErrorServerFunctionResponse) {
    return NextResponse.json(response, {
      status: HttpStatusCode.BadRequest,
    });
  }

  return NextResponse.json(response, { status });
}

export function Get<T>(
  serverFunctionResponse: ServerFunctionResponse<T>
): NextResponse {
  return handleResponse(serverFunctionResponse, HttpStatusCode.Ok);
}

export function Post<T>(
  serverFunctionResponse: ServerFunctionResponse<T>
): NextResponse {
  return handleResponse(serverFunctionResponse, HttpStatusCode.Created);
}

export function Put<T>(
  serverFunctionResponse: ServerFunctionResponse<T>
): NextResponse {
  return handleResponse(serverFunctionResponse, HttpStatusCode.Ok);
}

export function Delete<T>(
  serverFunctionResponse: ServerFunctionResponse<T>
): NextResponse {
  return handleResponse<T>(serverFunctionResponse, HttpStatusCode.NoContent);
}

export function Patch<T>(
  serverFunctionResponse: ServerFunctionResponse<T>
): NextResponse {
  return handleResponse(serverFunctionResponse, HttpStatusCode.Ok);
}
