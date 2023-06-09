import BaseContext from "@/baseContext";


export type GameBody = {
    matchId: number
    winnerId: number
    map: string
}




export default class GameService extends BaseContext {

     async getGames() {
        return await this.di.Game.findAll();
    }

    
     async  createGame(data: GameBody) {
        return await this.di.Game.create(data);
    }

     async  getGameById(id: number, opts: {[key: string]: any}) {
        return await this.di.Game.findByPk(id, opts);
    }

    async createRounds({gameId, rounds}: {gameId: number, rounds: {number: number, winnerId: number, gameId: number}[]}) {
        const data = rounds.map(
            r => (r.gameId = gameId, r)
        );
        return await this.di.Round.bulkCreate(
            data
        )
    }
}
