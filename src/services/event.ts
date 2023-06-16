import BaseContext from "@/baseContext";
import {Op} from "sequelize";

export type EventBody = {
    name: string,
    startsAt: Date
    winnerId: number
    trophyUrl: string
    bannerUrl: string
}


export default class EventService extends BaseContext {
     async  getEvents({name}: {name?: string | null} = {}, additionalOpts = {}) {
        let opts: {[key: string]: any} = {...additionalOpts}
    
        if (name != null) {
            opts.where = {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        }
    
        return await this.di.Event.findAll(opts);
    }
    
     async  createEvent(data: EventBody) {
        return await this.di.Event.create({
            name: data.name,
            trophyUrl: data.trophyUrl,
            winnerId: data.winnerId,
            bannerUrl: data.bannerUrl,
            startsAt: data.startsAt
        });
    }
    
     async  getEventById(id: number, opts: {[key: string]: any}) {
        const event = await this.di.Event.findByPk(id, {...opts});
        return event;
    }
}
