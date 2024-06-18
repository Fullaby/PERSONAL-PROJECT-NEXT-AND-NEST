import { Injectable } from '@nestjs/common';
const { User, Product, Category, sequelize } = require("../models");

@Injectable()
export class AppService {
 async getAllUser(): Promise<any>{
      try {
          const fetchResponse = await User.findAll();
         return fetchResponse || { message: "there is no data" };
      } catch (error) {
          console.log(error);
          throw new Error('Failed to fetch users');
      }
  }
  
}
