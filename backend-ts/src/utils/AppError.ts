import {ValidationErrors} from "validatorjs";

export class AppError extends Error {
  public status: number;
  public errors: ValidationErrors;

  constructor(message: string | { errors: ValidationErrors }, status: number = 500) {
    super(typeof message === 'string' ? message : 'Validation error');

    if(typeof message !== 'string' ) {
      this.errors = message.errors;
    }

    this.status = status;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
