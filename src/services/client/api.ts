import {Event} from "@/database/models";

export async function findEvents(prompt: string): Promise<Event[]> {
    const response = await fetch(`/api/events?name=${prompt}`);
    const { events } = await response.json();
    return events;
}

export async function findTeams(prompt: string): Promise<Event[]> {
    const response = await fetch(`/api/teams?name=${prompt}`);
    const { teams } = await response.json();
    return teams;
}

