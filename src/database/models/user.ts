import { IContextContainer } from "@/baseContext";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, DataTypes, HasOneGetAssociationMixin, BuildOptions } from "sequelize";
import { IPlayer } from "./player";
import { IModelType } from ".";

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
    player?: IPlayer
    readonly createdAt: CreationOptional<Date>;
    readonly updatedAt: CreationOptional<Date>;
    getPlayer: HasOneGetAssociationMixin<IPlayer>;
}

export interface IUser extends UserData, Model {
    
}

export type IUserType = IModelType<IUser>

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

    User.initRels = function () {
        User.belongsTo(Player, {as: 'player'});
        Player.hasOne(User);
    }

    return User;
}
