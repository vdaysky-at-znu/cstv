import { User, UserRole } from "../database/models"
import { HTTPException } from "../exceptions";

export async function getUsers() {
    return await User.findAll();
}

export type RegisterBody = {
    username: string,
    password: string,
}

function hashPassword(password: string): string {
    return password;
}

export async function registerUser({username, password}: RegisterBody): Promise<User> {
    const userExists = await User.findOne({where: {username}});
    
    if (userExists !== null) {
        throw new HTTPException("User with this username already exists", 401);
    }

    return await User.create({
        username,
        passwordHash: hashPassword(password),
        role: UserRole.User
    })
}

export async function getUser(id: number) {
    return await User.findByPk(id);
}

export async function findUserWithEmailAndPassword(username: string, password: string): Promise<User | null> {
    return await User.findOne({where:{
        username, 
        passwordHash: password
    }})
}