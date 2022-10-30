import dotenv from "dotenv";
import { DataSource } from "typeorm"
import { User } from "../models/entities/user.model"

dotenv.config();

export const db = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    entities: [User],
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
})
