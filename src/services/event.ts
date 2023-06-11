import { Event } from "../database/models"
import {Op} from "sequelize";

export async function getEvents({name}: {name?: string} = {}) {
    let opts: {[key: string]: any} = {}

    if (name != null) {
        opts.where = {
            name: {
                [Op.like]: `%${name}%`
            }
        }
    }

    return await Event.findAll(opts);
}

export type EventBody = {
    name: string,
    startsAt: Date
}

export async function createEvent(data: EventBody) {
    return await Event.create({
        name: data.name,
        startsAt: data.startsAt
    });
}

export async function getEventById(id: number, opts: {[key: string]: any}) {
    const event = await Event.findByPk(id, {...opts});
    return event;
}
