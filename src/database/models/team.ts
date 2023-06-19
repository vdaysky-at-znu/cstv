import BaseContext, { IContextContainer } from "@/baseContext";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, HasManyGetAssociationsMixin, NonAttribute, DataTypes, BuildOptions } from "sequelize";
import { IModelType } from ".";
import { IPlayer } from "./player";
import container from "@/container";


export interface TeamData {
    id: CreationOptional<number>
    name: string
    rating: number
    createdAt: CreationOptional<Date>
    updatedAt: CreationOptional<Date>
    players: NonAttribute<IPlayer[]>
    logoUrl: string
}

export interface ITeam extends TeamData, Model {
    getPlayers: HasManyGetAssociationsMixin<IPlayer>
    getWonEvents(): Promise<Event[]>;
}

export type ITeamType = IModelType<ITeam>

export default ({db}: IContextContainer): ITeamType => {

    const Team = <ITeamType> db.define("Team", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        logoUrl: DataTypes.STRING,
        rating: DataTypes.INTEGER,
        name: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        freezeTableName: true,
        timestamps: true,
    })

    Team.initRels = function () {
        const Player = container.resolve("Player");
        const Event = container.resolve("Event")

        Team.hasMany(Player, {as: 'players', foreignKey: 'teamId'})
        Team.hasMany(Event, {as: 'wonEvents', foreignKey: 'winnerId'})
    }

    return Team;
}