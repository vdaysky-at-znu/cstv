import { Match } from "@/database/models"

export async function getMatches(opts: {[key: string]: any}) {
    return await Match.findAll({...opts, include: ['teamA', 'teamB', 'event']});
}

export type MatchBody = {
    teamAId: number
    teamBId: number
    winnerId: number
    eventId: number
    startsAt: Date
    startedAt: Date
}

export async function createMatch(data: MatchBody) {
    return await Match.create({
        teamAId: data.teamAId,
        teamBId: data.teamBId,
        startsAt: data.startsAt,
        startedAt: data.startedAt,
        winnerId: data.winnerId,
        eventId: data.eventId,
    });
}