import { IContextContainer } from "@/baseContext";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, DataTypes, HasOneGetAssociationMixin, BuildOptions } from "sequelize";
import { IPlayer } from "./player";

export enum UserRole {
    User = 1,
    Player = 10,
    Admin = 20,
}

export interface UserData {
    id: CreationOptional<number>;
    role: number;
    username: string;
    passwordHash: string;
    readonly createdAt: CreationOptional<Date>;
    readonly updatedAt: CreationOptional<Date>;
    getPlayer: HasOneGetAssociationMixin<IPlayer>;
}

export interface IUser extends UserData, Model {
    
}

export type IUserType = typeof Model & IUser & {
    new(values?: object, options?: BuildOptions): IUser;
}

export default ({db, Player}: IContextContainer): IUserType => {
    
    const User = <IUserType> db.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: UserRole.User,
        },
        username: DataTypes.STRING,
        passwordHash: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        timestamps: true,
        freezeTableName: true,
    })

    console.log("======================= Load user relations");
    

    User.belongsTo(Player);
    Player.hasOne(User);

    return User;
}
