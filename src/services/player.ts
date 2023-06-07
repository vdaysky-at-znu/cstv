import { Player } from "../database/models"

export async function getPlayers() {
    return await Player.findAll();
}
