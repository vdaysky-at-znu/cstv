import BaseContext from "@/baseContext";



export default class TeamService extends BaseContext {
    async getTeams(opts: {name?: string} = {}) {

        let additionalOpts = {};
    
        if (opts.name) {
            additionalOpts = {
                ...additionalOpts,
                where: {
                    name: opts.name
                }
            }
        }
    
        return await this.di.Team.findAll(additionalOpts);
    }
    
    async getTeamById(id: number, opts: any = {}) {
        return await this.di.Team.findByPk(id, {...opts})
    }
}
