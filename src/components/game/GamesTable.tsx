
import { Game } from "@/database/models";
import GameCard from "@/components/game/GameCard";

import React from "react";

export default function GamesTable({games, scores}: {games: Game[], scores: [number, number][]}) {
    return <div>
        {
            games.map((game, i) => <div className="mt-2">
                <GameCard key={game.id} game={game} score={scores[i]} />
            </div>)
        }
    </div>
}
