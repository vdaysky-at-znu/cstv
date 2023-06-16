import { IContextContainer } from "@/baseContext";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, DataTypes, BuildOptions } from "sequelize";
import { ITeam } from "./team"


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

export type IPlayerType = typeof Model & IPlayer & {
    new(values?: object, options?: BuildOptions): IPlayer;
}

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

    Player.belongsTo(Team, {as: "team", foreignKey: "teamId"});
    Team.hasMany(Player, {as: "players", foreignKey: "teamId"});

    return Player;
}