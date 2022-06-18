import { Model, model, Schema } from "mongoose"

// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
interface IUser{
    username: string,
    password: string,
    fullName: string,
    isActive: boolean,
    isDeleted: boolean
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    isDeleted: { type: Boolean, required: true }
  });

const User = model<IUser>('User', userSchema)

export { User, userSchema, IUser }

// @Entity()
// export class User{
//     @PrimaryGeneratedColumn()
//     id!: number;

//     @Column()
//     username!: string;

//     @Column()
//     password!: string;

//     @Column()
//     fullName!: string;

//     @Column()
//     isActive!: boolean;

//     @Column()
//     isDeleted!: boolean;
// }