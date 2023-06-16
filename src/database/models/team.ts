import BaseContext, { IContextContainer } from "@/baseContext";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, HasManyGetAssociationsMixin, NonAttribute, DataTypes, BuildOptions } from "sequelize";
import { Player } from ".";


export interface TeamData {
    id: CreationOptional<number>
    name: string
    rating: number
    createdAt: CreationOptional<Date>
    updatedAt: CreationOptional<Date>
    players: NonAttribute<Player[]>
    logoUrl: string
}

export interface ITeam extends TeamData, Model {
    getPlayers: HasManyGetAssociationsMixin<Player>
    getWonEvents(): Promise<Event[]>;
}

export type ITeamType = typeof Model & ITeam & { 
    new(values?: object, options?: BuildOptions): ITeam;
}

export default (ctx: IContextContainer): ITeamType => {

    const Team = <ITeamType> ctx.db.define("Team", {
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

    Team.getWonEvents = async function() {
        return await ctx.Event.findAll({
            include: [
                {
                    model: Team,
                    where: {
                        "$winner.id$": this.id
                    }
                }
            ]
        })
    }

    return Team;
}