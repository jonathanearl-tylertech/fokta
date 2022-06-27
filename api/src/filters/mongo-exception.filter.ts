import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from "@nestjs/common";
import { Response } from "express";
import { MongoError } from "mongodb";

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(err: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    switch (err.code) {
      case 11000:
        return response.status(409).send(err.message);
      default:
        throw new InternalServerErrorException(
          "Something went wrong, please try again later"
        );
    }
  }
}
