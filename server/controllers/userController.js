const { User, Product, Category, sequelize } = require("../models");

class userController{
    static async getAllUser(req,res,next){
        try {
            const fetchResponse = await User.findAll();
            res.status(200).json(fetchResponse || { message: "there is no data" });
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports= userController