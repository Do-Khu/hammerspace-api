import { User } from "../../models/entities/user.model";
import UserInfo from "../../models/userInfo.dto";
import { closeConn, openConn } from "../database.utils";

export async function getAll(): Promise<Error | UserInfo[]> {
    await openConn()
    
    const users = await User.find({isDeleted: false}).catch((err) => {
        console.log("Db error while getting user list: " + err.message)
        console.log(err.stack)
        return err
    })
    
    await closeConn()
    return users || []
}

export async function create(username: string, password: string, fullName: string): Promise<Error | null> {
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

export async function validatePassword(username: string, password: string): Promise<boolean | Error> {

    await openConn()

    let result = false

    const user = await User.findOne({
        username: username
    }).catch((err) => {
        console.log("Db error on login validation: " + err.message)
        console.log(err.stack)
        return err
    })

    if (user) {
        if (user.password == password) result = true
    }

    await closeConn()

    return result
}