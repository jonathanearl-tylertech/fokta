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
        console.error(err);
        return response.status(409).json({
          // keys: Object.keys(exception.keyValue),
          // values: Object.values(exception.keyValue),
          msg: "One or more keys are in use",
        });
      default:
        throw new InternalServerErrorException(
          "Something went wrong, please try again later"
        );
    }
  }
}
