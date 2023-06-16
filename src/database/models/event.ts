import { IContextContainer } from "@/baseContext";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, DataTypes, HasManyGetAssociationsMixin, BuildOptions } from "sequelize";
import { ITeam } from "./team"
import { IMatch } from "./match";


export interface EventData {
    id: CreationOptional<number>
    name: string
    startsAt: Date 
    teams?: ITeam[];
    winnerId: number;
    winner: NonAttribute<ITeam>;
    trophyUrl: string;
    bannerUrl: string;
}

export interface IEvent extends EventData, Model {
    getTeamOnes: HasManyGetAssociationsMixin<ITeam>;
    getTeamTwos: HasManyGetAssociationsMixin<ITeam>;
    getMatches: HasManyGetAssociationsMixin<IMatch>;
    loadTeams(): Promise<ITeam[]>;
}

export type IEventType = typeof Model & IEvent & {
    new(values?: object, options?: BuildOptions): IEvent;
};

export default ({db, Team, Match}: IContextContainer): IEventType => {


    const Event = <IEventType> db.define<IEvent>('Event', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        winnerId: DataTypes.NUMBER,
        trophyUrl: DataTypes.STRING,
        bannerUrl: DataTypes.STRING,
        startsAt: DataTypes.TIME,
    }, {
        freezeTableName: true,
    });

    console.log(" ===================== Add relationships on Event");

    Event.prototype.loadTeams = async function () {
        let intersect: {[key: number]: ITeam} = {};
        for (let match of await this.getMatches()) {

            const teamA = await match.getTeamA()
            const teamB = await match.getTeamB();

            intersect[teamA.id] = teamA;
            intersect[teamB.id] = teamB;
        }
        return Object.values(intersect);
    }

    Event.belongsTo(Team, {as: "winner", foreignKey: "winnerId"})
    Team.hasMany(Event, {as: "wonEvents", foreignKey: "winnerId"})

    return Event;
}