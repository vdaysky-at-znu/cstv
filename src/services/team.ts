import { Team } from "../database/models"

export async function getTeams(opts: {name?: string} = {}) {

    let additionalOpts = {};

    if (opts.name) {
        additionalOpts = {
            ...additionalOpts,
            where: {
                name: opts.name
            }
        }
    }

    return await Team.findAll(additionalOpts);
}

export async function getTeamById(id: number, opts: any = {}) {
    return await Team.findByPk(id, {...opts})
}
