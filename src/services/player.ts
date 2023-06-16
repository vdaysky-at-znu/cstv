import BaseContext from "@/baseContext";
import { Op } from "sequelize";

export default class PlayerService extends BaseContext {
     async getPlayers({name}: {name?: string} = {}) {

        const opts = {where: {}};
    
        if (name != null) {
            opts.where = {
                inGameName: {
                    [Op.like]: `%${name}%`
                }
            }
        }
    
        return await  this.di.Player.findAll(opts);
    }
    
     async  getPlayerById(id: number, opts: any = {}) {
        return await this.di.Player.findByPk(id, {...opts});
    }
}