import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from "@nestjs/common";
import { PassThrough } from "stream";
import { ZodSchema } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    //this is nest js validation error massage
    // try {
    //   const parsedValue = this.schema.parse(value);
    //   return parsedValue;
    // } catch (error) {
    //   throw new BadRequestException("validation failed", error);
    // }

    //it validation error massage specific filed
    const parseValue = this.schema.safeParse(value);
    if (!parseValue.success)
      throw new BadRequestException(parseValue.error.format());
    return parseValue.data;
  }
}
