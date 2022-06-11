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
    await database.connect(process.env.DB_CONN || 'mongodb://localhost:27017/hammerspace', () => { console.log('connected to database')});
}
export async function closeConn() {
    database.disconnect()
}
export default database;
