import { Player } from "../database/models"

export async function getPlayers() {
    return await Player.findAll();
}

export async function getPlayerById(id: number, opts: any = {}) {
    return await Player.findByPk(id, {...opts});
}
