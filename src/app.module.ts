import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'public'),
        }),
        ConfigModule
      ],
      useFactory: async (configService: ConfigService) => ({
        // uri: configService.get<string>('ReMonster.DATABASE.URL')
        uri: `mongodb://127.0.0.1:27017/hpmobile`,
      }),
      inject: [ConfigService],
    }),
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
