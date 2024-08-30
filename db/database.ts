import { Sequelize } from 'sequelize';
import path from 'path';
const db_dir = path.join(__dirname,'database.sqlite');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: db_dir
  });


 async function conn(){
    try {
        await sequelize.authenticate();
       
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
 }

 export {db_dir};