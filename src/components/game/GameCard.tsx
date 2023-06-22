import {Game} from "@/database/models";
import { useRouter } from "next/router";


export default function GameCard({game, score}: {game: Game, score: [number, number]}) {

    const router = useRouter();

    return <div onClick={() => router.push("/games/" + game.id)}>
        <div className="relative shadow-lg">
            <img className="relative h-[50px]" src={"/" + game.map.toLowerCase() + ".webp"}>
                
            </img>

            <div className="absolute top-0 left-0 right-0 z-10 py-2 h-full text-xs lg:text-lg px-5 rounded-lg">
                <div className="flex text-white justify-center">
                    <span className="me-4">
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
        <div className="h-[50px] bg-gray-100 rounded-b-lg">
            
        </div>
    </div>
}