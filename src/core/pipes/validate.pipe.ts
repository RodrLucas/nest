import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      const response: string[] = e.getResponse().message;
      if (e instanceof BadRequestException) {
        throw new UnprocessableEntityException(this.handleError(response));
      }
    }
  }

  private handleError(errors: string[]) {
    return errors.map((error) => error);
  }
}
