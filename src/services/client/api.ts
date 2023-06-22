import {Discussion, Event, Player, Team} from "@/database/models";
import { PlayerStatsData } from "@/database/models/playerStats";

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

export async function createMatch(teamAId: number, teamBId: number, winnerId: number, eventId: number, startsAt: string) {

    const response = await fetch("/api/matches", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            teamAId,
            teamBId,
            winnerId,
            eventId,
            startsAt
        })
    })

    const data = await response.json();
    return data.match;
}

export async function createGame(matchId: number, winnerId: number, map: string) {
    const response = await fetch("/api/games", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            matchId,
            winnerId,
            map
        })
    })
    const { game } = await response.json();

    return game;
}

export async function createStat(gameId: number, playerId: number, kills: number, deaths: number, assists: number): Promise<PlayerStatsData> {
    const response = await fetch("/api/stats", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            gameId, playerId, kills, deaths, assists
        })
    })
    const {stat} = await response.json();
    return stat;
}

export async function createEvent(
    name: string,
    startsAt: string,
    winnerId: number,
    trophyUrl: string,
    bannerUrl: string,
) {
    const response = await fetch("/api/events", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, startsAt, winnerId, trophyUrl, bannerUrl
        })   
    })

    const { event } = await response.json();

    return event;
}

export async function createTeam(name: string, rating: number, logoUrl: string) {
    const response = await fetch("api/teams", {
        method: "PUT", headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            name, rating, logoUrl
        })
    })
    const { team } = await response.json();
    return team;
}

export async function saveRounds(gameId: number, data: {number: number, winnerId: number}[]) {
    const response = await fetch("/api/games/rounds", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            gameId,
            rounds: data
        })
    })

    const { rounds } = await response.json();

    return rounds;
}
