import {Discussion, Event, Player, Team} from "@/database/models";

export async function findEvents(prompt: string): Promise<Event[]> {
    const response = await fetch(`/api/events?name=${prompt}`);
    const { events } = await response.json();
    return events;
}

export async function findTeams(prompt: string): Promise<Team[]> {
    const response = await fetch(`/api/teams?name=${prompt}`);
    const { teams } = await response.json();
    return teams;
}

export async function findPlayers(prompt: string): Promise<Player[]> {
    const response = await fetch(`/api/players?name=${prompt}`)
    const {players} = await response.json();
    return players;
}

export async function loadReplies(discussionId: number): Promise<Discussion[]> {
    const response = await fetch("/api/discussions/replies/" + discussionId);
    const { replies } = await response.json();
    return replies;
}


export async function createReply(replyTo: number, content: string, title: string | null = null) {

    const response = await fetch("/api/discussions/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            replyTo,
            content,
            title
        })
    })

    const {discussion} = await response.json()

    return discussion;

}