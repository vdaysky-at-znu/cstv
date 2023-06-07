import { Match } from "../database/models"

export async function getMatches() {
    return await Match.findAll({include: ['teamA', 'teamB']});
}

export type MatchBody = {
    teamAId: number
    teamBId: number
    startsAt: Date
    startedAt: Date
}

export async function createMatch(data: MatchBody) {
    return await Match.create({
        teamAId: data.teamAId,
        teamBId: data.teamBId,
        startsAt: data.startsAt,
        startedAt: data.startedAt
    });
}