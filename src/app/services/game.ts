import { Game } from "../database/models"

export async function getGames() {
    return await Game.findAll();
}
