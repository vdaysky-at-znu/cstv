import { Event } from "../database/models"

export async function getEvents() {
    return await Event.findAll();
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
