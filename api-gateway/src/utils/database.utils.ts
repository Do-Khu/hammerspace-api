import dotenv from "dotenv";
import mongoose from "mongoose";
import { DataSource } from "typeorm"
import { User } from "../models/entities/user.model"

dotenv.config();

// const database = mongoose

export const db = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    entities: [User],
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
})

// export async function openConn() {
//     const aux = process.env.DB_CONN || 'mongodb://hammerspace:hammerspace@localhost:27017/hammerspace';
//     await database.connect(aux)
//         .then(()=>{console.log("connected to database")})
//         .catch((err)=>{
//             console.log("failed to connect to database: \n "+ err )
//         });
// }
// export async function closeConn() {
//    await database.disconnect()
// }
// export default database;
