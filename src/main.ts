import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './seed/seed.service';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module:any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService= app.get(ConfigService)
  
  app.useGlobalPipes(new ValidationPipe())
  /**
   * You can enable the seeding here
  */
 // const seedService = app.get(SeedService)
 // await seedService.seed()

 const config = new DocumentBuilder()
 .setTitle('Spotify Clone')
 .setDescription('The Spotify Clone API description')
 .setVersion('1.0')
 .addBearerAuth(
  // Enable Bearer Auth here
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter JWT token',
    in: 'header',
  },
  'JWT-auth', // We will use this Bearer Auth with JWT-auth name on the controller function
  )
 .build()
 
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

 const PORT = configService.get<number>('port')
  await app.listen(PORT)
  // console.log(configService.get<string>('NODE_ENV'));


  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap();
