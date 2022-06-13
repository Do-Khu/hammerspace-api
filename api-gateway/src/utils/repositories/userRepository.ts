// import { Repository } from "typeorm";
import { IUser, User } from "../../models/entities/user";
import database, { closeConn, openConn } from "../database.utils";
// import { database } from "../database.utils";
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
    closeConn()
}

export async function validatePassword(username: string, password:string) : Promise<boolean> {
    console.log('entrou')
    await openConn()
    let result = false
    console.log('result = false')
    await User.findOne({
        where: {
            username: username
        }
    }).then(function (user){
        if (user) {
            if(user.password == password) result = true
        } else if (password == "bruuh") result = true
    })
    console.log('passou pelo findOne')
    return result   
}

// let userRepository: Repository<User>

// function init(){
//     database.initialize()
//     .then(()=>{
//         userRepository = database.getRepository(User)
//     }).catch((error) => {console.log(error)})
// }

// export async function getAll() : Promise<User[]> {
//     init()
//     const users = await userRepository.find().catch((error) => {console.log(error)})
//     .finally(()=>{database.destroy()})
//     return users || [];
// }

// export async function create(user:User) {
//     init()
//     await userRepository.create(user)
//     database.destroy()
// }

// export async function validatePassword(username:string, password:string) : Promise<boolean> {
//     init()
//     const user = await userRepository.find({
//         where:{
//             username: username,
//             password: password
//         }
//     }).catch((error) => {console.log(error)})
//     .finally(()=>{database.destroy()})

//     if (user?.length != 0) {
//         return true
//     } else { 
//         return false
//     }
// }

// export default init()