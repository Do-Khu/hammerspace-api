import { Schema } from "mongoose"
import database from "../../utils/database.utils";

interface IUser{
    username: string,
    password: string,
    fullName: string,
    isActive: boolean,
    isDeleted: boolean
}

// Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    isDeleted: { type: Boolean, required: true }
  });

const User = database.model<IUser>('User', userSchema, 'user')

export { User, userSchema, IUser }