import BaseContext from "@/baseContext";
import { HTTPException } from "../exceptions";
import { IUser, UserRole } from "@/database/models/user";


export type RegisterBody = {
    username: string,
    password: string,
}


export default class UserService extends BaseContext {
    

    hashPassword(password: string): string {
        return password;
    }
    
    async getUsers() {
        return await this.di.User.findAll();
    }

    async registerUser({username, password}: RegisterBody): Promise<IUser> {
        const userExists = await this.di.User.findOne({where: {username}});
        
        if (userExists !== null) {
            throw new HTTPException("User with this username already exists", 401);
        }
    
        return await this.di.User.create({
            username,
            passwordHash: this.hashPassword(password),
            role: UserRole.User
        })
    }
    
    async getUser(id: number) {
        return await this.di.User.findByPk(id);
    }
    
    async findUserWithEmailAndPassword(username: string, password: string): Promise<IUser | null> {
        return await this.di.User.findOne({where:{
            username, 
            passwordHash: password
        }})
    }
}