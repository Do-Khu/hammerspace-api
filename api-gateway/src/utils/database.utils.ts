import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const database = mongoose

export async function openConn() {
    const aux = process.env.DB_CONN || 'mongodb://hammerspace:hammerspace@localhost:27017/hammerspace';
    await database.connect(aux)
        .then(()=>{console.log("connected to database")})
        .catch((err)=>{
            console.log("failed to connect to database: \n "+ err )
        });
}
export async function closeConn() {
   await database.disconnect()
}
export default database;
