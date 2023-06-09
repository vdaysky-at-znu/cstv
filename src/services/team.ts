import { Team } from "../database/models"

export async function getTeams() {
    return await Team.findAll();
}

export async function getTeamById(id: number, opts: any = {}) {
    return await Team.findByPk(id, {...opts})
}
