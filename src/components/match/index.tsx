import { Match } from "@/database/models";
import Link from "next/link";

export default function MatchCard({match, score}: {match: Match, score: number[]}) {
    const teamAWon = match?.winnerId == match?.teamA?.id

    return <div className="text-xs bg-gray-100 py-4 px-5 rounded-lg">
            <div className="flex justify-between">
                <p>
                    <Link href={"/teams/" + match.teamAId} className="font-semibold">{match.teamA?.name}</Link> 
                    <span className={"font-bold " + (teamAWon ? "text-green-900": "text-red-800")} > { score[0] } </span> 
                    <Link href={"/matches/" + match.id}>-</Link>
                    <span className={"font-bold " + (!teamAWon ? "text-green-900": "text-red-800")}> { score[1] } </span> 
                    <Link href={"/teams/" + match.teamBId} className="font-semibold">{match.teamB?.name}</Link>
                </p>
                <Link href={"/events/" + match?.event?.id} >{match?.event?.name}</Link>
            </div>
        </div>
    
}
