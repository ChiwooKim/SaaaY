import { HttpStatus } from '@nestjs/common';

export class ResourceError extends Error {
  public readonly httpStatus = HttpStatus.NO_CONTENT;
}
