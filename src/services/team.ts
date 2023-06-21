import BaseContext from "@/baseContext";
import { Op } from "sequelize";



export default class TeamService extends BaseContext {
    async getTeams(opts: {name?: string} = {}) {

        let additionalOpts = {};
    
        if (opts.name) {
            additionalOpts = {
                ...additionalOpts,
                where: {
                    name: {
                        [Op.like]: "%%" + opts.name + "%%"
                    }
                }
            }
        }
    
        return await this.di.Team.findAll(additionalOpts);
    }
    
    async getTeamById(id: number, opts: any = {}) {
        return await this.di.Team.findByPk(id, {...opts})
    }

    async createTeam({name, rating, logoUrl}: {name: string, rating: number, logoUrl: string}) {
        console.log("create team", name, rating), logoUrl;
        
        return await this.di.Team.create({
            name, rating, logoUrl
        });
    }
}
