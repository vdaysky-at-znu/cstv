import { IContextContainer } from "@/baseContext";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, DataTypes, HasManyGetAssociationsMixin, HasOneGetAssociationMixin, BelongsToGetAssociationMixin, BuildOptions } from "sequelize";
import { ITeam } from "./team"
import { IGame } from "./game";
import { IModelType } from ".";
import container from "@/container";


export interface MatchData {
    id: CreationOptional<number>
    startsAt: Date
    startedAt: Date
    teamAId: number
    teamBId: number
    eventId: number
    winnerId: number
    teamA?: NonAttribute<ITeam>
    teamB?: NonAttribute<ITeam>
    event?: NonAttribute<Event>
    games?: NonAttribute<IGame[]>
}    

export interface IMatch extends MatchData, Model<InferAttributes<IMatch>, InferCreationAttributes<IMatch>> {
    getTeamA: BelongsToGetAssociationMixin<ITeam>;
    getTeamB: BelongsToGetAssociationMixin<ITeam>;
    getWinner: HasOneGetAssociationMixin<ITeam>;
    getGames: HasManyGetAssociationsMixin<IGame>;
    getScore(): Promise<[number, number]>;
    getMapCount(): Promise<number>;
}

export type IMatchType = IModelType<IMatch>



export default ({Team, Event, db}: IContextContainer): IMatchType => {
    
    const Match = <IMatchType> db.define<IMatch>('Match',  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        teamAId: DataTypes.INTEGER,
        teamBId: DataTypes.INTEGER,
        eventId: DataTypes.INTEGER,
        startsAt: DataTypes.TIME,
        startedAt: DataTypes.TIME,
        winnerId: DataTypes.INTEGER,
    }, {
        timestamps: false,
        freezeTableName: true,
    });

    Match.prototype.getScore = async function() {
        console.log("GetScore called, this:", this);
        
        let winCount: [number, number] = [0, 0];
            for (let game of await this.getGames()) {
                const gameWinner = await game.getWinner();
                const teamA = await this.getTeamA();
                winCount[0] += (gameWinner.id == teamA.id ? 1 : 0);
                winCount[1] += (gameWinner.id == teamA.id ? 0 : 1);
            }
            return winCount;
    };

    Match.prototype.getMapCount = async function () {
        return (await this.getGames()).length; 
    }

    Match.initRels = function () {
        const Game = container.resolve("Game");
        
        Team.hasMany(Match, {as: 'matchesAsTeamOne', foreignKey: 'teamAId'});
        Match.belongsTo(Team, {as: 'teamA', foreignKey: 'teamAId'})
    
        Team.hasMany(Match, {as: 'matchesAsTeamTwo', foreignKey: 'teamBId'});
        Match.belongsTo(Team, {as: 'teamB', foreignKey: 'teamBId'})
    
        Team.hasMany(Match, {foreignKey: 'winnerId'});
        Match.belongsTo(Team, {as: 'winner', foreignKey: 'winnerId'})
    
        Game.belongsTo(Match, {as: "match", foreignKey: 'matchId'});
        Match.hasMany(Game, {as: "games", foreignKey: 'matchId'});
    
        Event.hasMany(Match, {as: 'matches', foreignKey: 'eventId'});
        Match.belongsTo(Event, {as: 'event', foreignKey: 'eventId'});
    }

    return Match;
}