import dotenv from "dotenv";
import mongoose from "mongoose";
// import { DataSource } from "typeorm";
// import { User } from "../models/entities/user";

dotenv.config();

// export const database = new DataSource({
//     type: "postgres",
//     host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT || "5432"),
//     entities: [User],
//     database: process.env.DB_DATABASE,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     synchronize: true,
//     logging: true
// });
const database = mongoose

export async function openConn() {
    const aux = process.env.DB_CONN || 'mongodb://hammerspace:hammerspace@localhost:27017/hammerspace';
    database.connect(aux)
        .then(()=>{console.log("connected to database")})
        .catch((err)=>{
            console.log("essa merda e o connection string: "+aux)
            console.log("failed to connect to database: \n "+ err )});
}
export async function closeConn() {
    database.disconnect()
}
export default database;
