import { Controller, Get,Post,Put, Req, Res,Next} from '@nestjs/common';
import { AppService } from './app.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/usernest')
  async getUser(): Promise<any> {
    return await this.appService.getAllUser();
  }
  @Post('/register')
  async registerUser(@Req() req: any, @Res() res: any, @Next() next: any): Promise<any> {
    return await this.appService.register(req,res,next);
  }
  @Post('/login')
  async loginUser(@Req() req: any, @Res() res: any, @Next() next: any): Promise<any> {
    return await this.appService.login(req,res,next);
  }
  @Put('/forgetpass/:email')
  async update(@Req() req: any, @Res() res: any, @Next() next: any): Promise<any> {
    return await this.appService.update(req,res,next);
  }
}
