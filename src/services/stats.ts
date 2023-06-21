import BaseContext from "@/baseContext";

export default class StatService extends BaseContext {

    async createStat(data: {playerId: number, gameId: number, kills: number, deaths: number, assists: number}) {
        return await this.di.PlayerStats.create(data)
    }
    async getStat(playerId: number, gameId: number) {
        return await this.di.PlayerStats.findOne({
            where: {
                playerId: playerId,
                gameId: gameId
            },
            include: ['player']
        })
    }
}