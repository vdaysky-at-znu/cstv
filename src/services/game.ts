import { Game } from "../database/models"

export async function getGames() {
    return await Game.findAll();
}

export type GameBody = {
    teamAId: number
    teamBId: number
    matchId: number
}

export async function createGame(data: GameBody) {
    return await Game.create({
        teamAId: data.teamAId,
        teamBId: data.teamBId,
        matchId: data.matchId
    });
}