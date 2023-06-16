import { IContextContainer } from "@/baseContext";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, DataTypes, HasOneGetAssociationMixin, BuildOptions } from "sequelize";
import { ITeam } from "./team"
import { IGame } from "./game";
import { IPlayer } from "./player";


export interface PlayerStatsData {
    id: CreationOptional<number>
    inGameName: string
    elo: number
    createdAt: CreationOptional<Date>
    updatedAt: CreationOptional<Date>
    team?: NonAttribute<ITeam>
    teamId: number
    photoUrl: string
    player?: NonAttribute<IPlayer>
    game?: NonAttribute<IGame>
}

export interface IPlayerStats extends PlayerStatsData, Model {
    getGame: HasOneGetAssociationMixin<IGame>;
    getPlayer: HasOneGetAssociationMixin<IPlayer>;
}

export type IPlayerStatsType = typeof Model & IPlayerStats & {
    new(values?: object, options?: BuildOptions): IPlayerStats;
}

export default ({Game, Player, db}: IContextContainer): IPlayerStatsType => {
    

    const PlayerStats = <IPlayerStatsType> db.define("PlayerStats", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        kills: DataTypes.NUMBER,
        deaths: DataTypes.NUMBER,
        assists: DataTypes.NUMBER,
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    Game.hasMany(PlayerStats, {as: "stats", foreignKey: "gameId"});
    Player.hasMany(PlayerStats, {as: "game", foreignKey: "gameId"});

    PlayerStats.belongsTo(Game, {as: "game", foreignKey: "gameId"});
    PlayerStats.belongsTo(Player, {as: "player", foreignKey: "playerId"});

    return PlayerStats;
}