import { Repository } from "typeorm";
import { User } from "../../models/entities/user.model";
import { db } from "../database.utils";

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
        let result = false
        //select * from "userClients" where username='+"'bruh'"+' LIMIT 1;
        const user = await this.userRepository.query(`select * from "userClients" where username='${username}' LIMIT 1;`).catch((err) => {
            console.log("Db error on login validation: " + err.message)
            console.log(err.stack)
            return err
        })
        .finally(()=>{db.destroy()})
        console.log(user[0].isactive)
        if (user[0].isactive) {
            if (user[0].password == password) result = true
        }

        return result 
    }
}