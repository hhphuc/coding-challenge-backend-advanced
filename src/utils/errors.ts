export enum SuccessStatus {
  OK = 200,
  CREATED = 201,
}

export enum ErrorStatus {
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}

export class ErrorWithStatus extends Error {
  status: number;
  constructor(message: string, status: ErrorStatus) {
    super(message);
    this.status = status;
  }
}

export class NotFoundError extends ErrorWithStatus {
  constructor(message: string) {
    super(message, ErrorStatus.NOT_FOUND);
  }
}

export class BadRequestError extends ErrorWithStatus {
  constructor(message: string) {
    super(message, ErrorStatus.BAD_REQUEST);
  }
}

export class InternalServerError extends ErrorWithStatus {
  constructor(message: string) {
    super(message, ErrorStatus.INTERNAL_SERVER_ERROR);
  }
}
