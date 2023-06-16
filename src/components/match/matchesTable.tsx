import { IMatch } from "@/database/models/match";
import MatchCard from ".";

export default function MatchesTable({ matches, scores }: {matches: IMatch[], scores: [number, number][]}) {
    return <div>
        { 
        matches.map((match, i) => <div key={i} className="border-b border-gray-400 last:border-b-0">
            <MatchCard tile={false} match={match} score={scores[i]} key={i} />
        </div>) 
        }
    </div>
}
