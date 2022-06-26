import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import { AppModule } from "./app.module";
import "reflect-metadata";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle("OpenidProvider")
    .setDescription("An identity abstraction")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);
  await app.listen(process.env.PORT, () => {
    console.log(`now running on http://localhost:${process.env.PORT}`);
    console.log(`now running on http://localhost:${process.env.PORT}/swagger`);
  });
}
bootstrap();
