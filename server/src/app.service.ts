import { Injectable } from '@nestjs/common';
const { User, Product, Category, sequelize } = require("../models");
const { Op } = require("sequelize");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jsonwebtoken");

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
  async register(req,res,next): Promise<any>{
    try {
        const { firstName,lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) throw { code: 1 };

        const [createResponse, created] = await User.findOrCreate({
            where: { firstName, lastName, email },
            defaults: { firstName,lastName , email, password: hashPassword(password), role:"Customer" },
        });
        if (!created) throw { code: 2 };

        res.status(201).json(created);
    } catch (error) {
        next(error);
    }
  }
  async login(req, res, next) {
    try {
        //able to accept username / email (since both of them are unique)
        const { email, password } = req.body;
        if (!email || !password) throw { code: 3 };

        const loginResponse = await User.findOne({
            where: {
                [Op.or]: [{ email: email }],
                role: "Customer"
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        if (!loginResponse || !comparePassword(password, loginResponse.password)) throw { code: 4 };

        //!TODO : need to adjust the information what to send as the token
        const token = createToken({
            username: loginResponse.username,
            email: loginResponse.email,
            id: loginResponse.id,
            role: loginResponse.role,
        });

        res
            .status(200)
            .json({ login: Boolean(loginResponse), access_token: token, username: loginResponse.username, role: loginResponse.role });
    } catch (error) {
        next(error);
    }
}
async update(req, res, next) {
    //update only accept password change for now (even admin cant change anything other than password)
    const t = await sequelize.transaction();
    try {
        // const {id} = req.user //from authentication
        const { email } = req.params;
console.log(email)
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) throw { code: 1 };

        //check oldPass
        const oldData = await User.findOne({ where: { email }, transaction: t });
        let dataCorrect = false,
            newData = null;

        //compare oldPassword with the password on database
        comparePassword(oldPassword, oldData.password) ? (dataCorrect = true) : (dataCorrect = false);

        //if correct, proceed to update the newPassword into database

        if (dataCorrect)
            newData = await User.update(
                { password: newPassword },
                { where: { email }, returning: true, individualHooks: true, transaction: t },
            );

        //check newData
        if (!newData) throw { code: 8 };

        await t.commit();
        res.status(200).json({ email, message: "password has been changed" });
    } catch (error) {
        await t.rollback();
        next(error);
    }
}
  
}
