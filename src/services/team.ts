import { Team } from "../database/models"

export async function getTeams() {
    return await Team.findAll();
}
