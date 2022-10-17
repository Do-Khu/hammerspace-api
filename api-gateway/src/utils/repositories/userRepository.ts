// import { StringifyOptions } from "querystring";
import { Repository } from "typeorm";
import { User } from "../../models/entities/user.model";
// import UserInfo from "../../models/userInfo.dto";
// import { closeConn, openConn, db } from "../database.utils";
import { db } from "../database.utils";

// export async function getAll(): Promise<Error | UserInfo[]> {
//     await openConn()
    
//     const users = await User.find({isDeleted: false}).catch((err) => {
//         console.log("Db error while getting user list: " + err.message)
//         console.log(err.stack)
//         return err
//     })
    
//     await closeConn()
//     return users || []
// }

// export async function create(username: string, password: string, fullName: string): Promise<Error | null> {
//     await openConn()
//     const user = new User({
//         username: username,
//         password: password,
//         fullName: fullName,
//         isActive: true,
//         isDeleted: false
//     })
//     await user.save().catch((err) => {
//         console.log("Db error on user creation: " + err.message)
//         console.log(err.stack)
//         return err
//     })
//     await closeConn()
//     return null
// }

// export async function validatePassword(username: string, password: string): Promise<boolean | Error> {

//     await openConn()

//     let result = false

//     const user = await User.findOne({
//         username: username
//     }).catch((err) => {
//         console.log("Db error on login validation: " + err.message)
//         console.log(err.stack)
//         return err
//     })

//     if (user) {
//         if (user.password == password) result = true
//     }

//     await closeConn()

//     return result
// }
export class UserRepository{
    private userRepository!: Repository<User>;
    constructor(){
        this.init()
    }

    private async init(){
        db.initialize()
        .then(()=>{
            this.userRepository = db.getRepository(User)
        }).catch((error) => {
            console.log("Error on db conn: " + error.message)
            console.log(error.stack)
        })
    }

    // list all users
    async getAll() : Promise<User[] | Error> {
        await this.init()
        const users = await this.userRepository.find({
            where: {isDeleted: false}
        })
        .catch((err) => {
            console.log("Db error while getting user list: " + err.message)
            console.log(err.stack)
            return err
        })
        .finally(()=>{db.destroy()})
        return users || [];
    }

    // create user
    async create(username: string, password: string, fullName: string) {
        await this.init()
        let user = this.userRepository.create({
            username: username,
            password: password,
            fullName: fullName,
            isActive: true,
            isDeleted: false
        })
        await this.userRepository.save(user).catch((err)=>{
            console.log("Db error on user creation: " + err.message)
            console.log(err.stack)
            return err
        }).finally(()=>{db.destroy()})
        
    }

    // check user password
    async validatePassword(username:string, password:string) : Promise<boolean | Error> {
        this.init()
        let result = false
        const user = await this.userRepository.findOne({
            where:{
                username: username
            }
        }).catch((err) => {
            console.log("Db error on login validation: " + err.message)
            console.log(err.stack)
            return err
        })
        .finally(()=>{db.destroy()})
    
        if (user) {
            if (user.password == password) result = true
        }

        return result 
    }
}