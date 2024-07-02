// src/RequestError.ts

class RequestError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.name = 'RequestError';
  }
}

export default RequestError;
