import { IContextContainer } from "@/baseContext";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, DataTypes, BuildOptions } from "sequelize";
import { ITeam } from "./team"
import { IModelType } from ".";


export interface PlayerData {
    id: CreationOptional<number>
    inGameName: string
    elo: number
    createdAt: CreationOptional<Date>
    updatedAt: CreationOptional<Date>
    team?: NonAttribute<ITeam>
    teamId: number
    photoUrl: string
}

export interface IPlayer extends PlayerData, Model {
   
}

export type IPlayerType = IModelType<IPlayer>

export default ({db, Team}: IContextContainer): IPlayerType => {
    
    const Player = <IPlayerType> db.define(
        "Player", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            photoUrl: DataTypes.STRING,
            inGameName: DataTypes.STRING,
            teamId: DataTypes.NUMBER,
            elo: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            freezeTableName: true,
            timestamps: true,
        }
    )
    
    Player.initRels = function () {
        Player.belongsTo(Team, {as: "team", foreignKey: "teamId"});
        console.log("Add team.hasmany as players");
    }

    return Player;
}