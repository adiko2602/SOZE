export class ServerFunctionResponse<T> {
  constructor(
    public success: boolean,
    public message: string,
    public data?: T
  ) {}
}

export class SuccessServerFunctionResponse<
  T
> extends ServerFunctionResponse<T> {
  constructor(message: string, data: T) {
    super(true, message, data);
  }
}

export class ErrorServerFunctionResponse extends ServerFunctionResponse<undefined> {
  constructor(message: string) {
    super(false, message, undefined);
  }
}
