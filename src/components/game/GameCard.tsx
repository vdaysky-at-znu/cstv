import {Game} from "@/database/models";
import { useRouter } from "next/router";


export default function GameCard({game, score}: {game: Game, score: [number, number]}) {

    const router = useRouter();

    return <div onClick={() => router.push("/games/" + game.id)}>

            <div className="text-xs bg-gray-100 py-6 border-b-4 border-green-600 px-5 rounded-lg">
                <div className="flex justify-between">
                    <span>
                        {game.map || "Mirage"}
                    </span>
                    <div>
                        <span>{score[0]}</span>
                        <span> - </span>
                        <span>{score[1]}</span>
                    </div>
                </div>
            </div>
    </div>
}