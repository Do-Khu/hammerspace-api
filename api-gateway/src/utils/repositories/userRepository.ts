import { Repository } from "typeorm";
import { User } from "../../models/entities/user.model";
import { db } from "../database.utils";

export class UserRepository{
    private userRepository!: Repository<User>;
    constructor(){
       this.init()
    }

    private async init(){
        if (!db.isInitialized)
            await db.initialize()
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
            where: {isdeleted: false}
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
            fullname: fullName,
            isactive: true,
            isdeleted: false
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
        await this.init()
        const user :User[] = await this.userRepository.query(`select * from "userClients" where username='${username}' LIMIT 1;`).catch((err) => {
            console.log("Db error on login validation: " + err.message)
            console.log(err.stack)
            return err
        })
        .finally(()=>{db.destroy()})
        
        if (user[0]?.isactive && !user[0]?.isdeleted) {
            if (user[0].password == password) 
                result = true
        }
        
        return result 
    }

    async getUserFromUsername(username: string): Promise<User | Error>{
        await this.init()
        const user = await this.userRepository.findBy({username: username}).catch((err)=>{
            console.log("an error happened while trying to recover user by their username")
            console.log(err)
            return err
        })//.finally(()=>{db.destroy()})

        return user
    }
}
