import BaseContext from "@/baseContext";
import { IPlayer } from "@/database/models/player";
import { Op, Sequelize } from "sequelize";



export type MatchBody = {
    teamAId: number
    teamBId: number
    winnerId: number
    eventId: number
    startsAt: Date
    startedAt: Date
}



export default class MatchService extends BaseContext {

   async  getMatches(opts: {[key: string]: any} = {}) {
    return await this.di.Match.findAll({...opts, include: ['teamA', 'teamB', 'event']});
}

   async  createMatch(data: MatchBody) {
    return await this.di.Match.create({
        teamAId: data.teamAId,
        teamBId: data.teamBId,
        startsAt: data.startsAt,
        startedAt: data.startedAt,
        winnerId: data.winnerId,
        eventId: data.eventId,
    });
}

 async  getMatchById(id: number, opts: {[key: string]: any} = {}) {
    return await this.di.Match.findByPk(id, opts);
}

 async  getParticipantsAtMatch(id: number): Promise<IPlayer[]> {
    
    const players = await this.di.Player.findAll({
        attributes: ["id", "inGameName"],
        include: [
          {
            attributes: ["id", "name"],
            model: this.di.Team,
            where: {
                id: {
                    [Op.ne]: null
                }
            },
            as: 'team',
            include: [
              {
                attributes: [],
                model: this.di.Match,
               where: {
                 id: 1, 
               },
               on: Sequelize.literal("`team`.id = `team->Matches`.`teamAId` OR `team`.id = `team->Matches`.`teamBId`") 
              },
            ],
          },
        ],
      });
    return players;
}
}