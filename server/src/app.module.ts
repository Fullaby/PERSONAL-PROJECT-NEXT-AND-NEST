import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthenticationMiddleware)
//       .forRoutes({ path: '*', method: RequestMethod.ALL });
//   }
// }
export class AppModule {}
