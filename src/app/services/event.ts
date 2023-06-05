import { Event } from "../database/models"

export async function getEvents() {
    return await Event.findAll();
}
