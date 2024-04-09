import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: object) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    console.log(metadata);

    try {
      if (this.schema[metadata.type]) {
        const parsedValue = this.schema[metadata.type].parse(value);
        return parsedValue;
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
