import { Match } from "../database/models"

export async function getMatches() {
    return await Match.findAll({include: ['teamA', 'teamB']});
}
