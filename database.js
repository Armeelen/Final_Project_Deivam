//connecting database(using postgress)
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgresql://class143_owner:BThOV0lZb3YU@ep-holy-lab-a2xm39f8.eu-central-1.aws.neon.tech/inventory?sslmode=require',{logging:false});  

module.exports=sequelize;