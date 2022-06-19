import { IUser, User } from "../../models/entities/user.model";
import { closeConn, openConn } from "../database.utils";
export async function getAll() {
    await openConn()
    const users = await User.find((err: any, result: IUser[]) =>{
        if (err!= null || err != undefined)
            return result
        else console.log(err)
    })
    closeConn()
    return users
}

export async function create(username:string, password: string, fullName:string): Promise<Error | null> {
    await openConn()
    const user = new User({
        username: username,
        password: password,
        fullName: fullName,
        isActive: true,
        isDeleted: false
    })
    await user.save().catch((err) => {
        console.log("Db error on user creation: " + err.message)
        console.log(err.stack)
        return err
    })
    await closeConn()
    return null
}

export async function validatePassword(username: string, password:string) : Promise<boolean | Error> {
  
    await openConn()
    
    let result = false

    const user = await User.findOne({
        username: username
    }).catch((err)=>{
        console.log("error on login validation: " + err)
        return err
    })

    if (user) {
        if(user.password == password) result = true
    }

    await closeConn()

    return result   
}