import { IContextContainer } from "@/baseContext"
import { BelongsToGetAssociationMixin, BuildOptions, CreationOptional, DataTypes, Model } from "sequelize"
import { ITeam } from "./team"
import { IModelType } from "."


export interface RoundData {
    id: CreationOptional<number>
    number: number
    winnerId: number
    gameId: number
}

export interface IRound extends Model, RoundData {
    getWinner: BelongsToGetAssociationMixin<ITeam>
}

export type IRoundType = IModelType<IRound>

export default ({db}: IContextContainer): IRoundType => {
    const Round = <IRoundType> db.define("Round", {
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true,
        },
        number: DataTypes.NUMBER,
        winnerId: DataTypes.NUMBER,
        gameId: DataTypes.NUMBER
    }, {
        timestamps: false,
        freezeTableName: true,
    });

    Round.initRels = function () {
        
    }

    return Round;
}
