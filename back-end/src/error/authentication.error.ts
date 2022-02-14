import { HttpStatus } from '@nestjs/common';

export class AuthenticationError extends Error {
  public readonly httpStatus = HttpStatus.FORBIDDEN;
}
