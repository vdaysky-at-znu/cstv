import { IContextContainer } from "@/baseContext";
import { Model, CreationOptional, NonAttribute, DataTypes, Sequelize, HasOneGetAssociationMixin, BuildOptions } from "sequelize";
import { ITeam } from "./team"
import { IMatch } from "./match"
import { IRound } from "./round";
import { IPlayerStats } from "./playerStats";
import container from "@/container";


export interface GameData {
    id: CreationOptional<number>
    matchId: number
    winnerId?: number
    map: string
    rounds?: NonAttribute<IRound[]>
    stats?: NonAttribute<IPlayerStats[]>
    match?: NonAttribute<IMatch>
}

export interface IGame extends GameData, Model {
    getMatch: HasOneGetAssociationMixin<IMatch>;
    getWinner: HasOneGetAssociationMixin<ITeam>;

    getScore(): Promise<[number, number]>;
}

export type IGameType = typeof Model & IGame & {
    new(values?: object, options?: BuildOptions): IGame;
}

export default ({Team, Round, db}: IContextContainer): IGameType => {
    
    const Game = <IGameType> db.define("Game", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        map: DataTypes.STRING,
        matchId: DataTypes.INTEGER,
        winnerId: DataTypes.INTEGER,
    }, {
        freezeTableName: true,
        timestamps: false,
    })

    Game.getScore = async function () {

        const Match = container.resolve("Match");

        const [score] = await Round.findAll({
            attributes: [
                [Sequelize.fn('sum', Sequelize.literal('case when Round.winnerId = `game->match`.teamAId then 1 else 0 end')), 'teamAWon'],
                [Sequelize.fn('sum', Sequelize.literal('case when Round.winnerId = `game->match`.teamBId then 1 else 0 end')), 'teamBWon'],
            ],
            raw: true,
            include: [
                {   
                    attributes: [],
                    model: Game,
                    as: "game",
                    where: {
                        id: this.id
                    },
                    include: [{
                        attributes: [],
                        model: Match,
                        as: "match",
                    }]
                }
            ]
        });
        return [
            score.teamAWon as number,
            score.teamBWon as number,
        ]
    }

    Team.hasMany(Game, {foreignKey: 'winnerId'});
    Game.belongsTo(Team, {as: 'winner', foreignKey: 'winnerId'});

    Round.belongsTo(Game, {as: "game", foreignKey: 'gameId'})
    Game.hasMany(Round, {as: "rounds", foreignKey: 'gameId'})

    return Game;
}