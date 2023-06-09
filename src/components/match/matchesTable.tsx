import { Match } from "@/database/models";
import MatchCard from ".";
import { getMatches } from "@/services/match";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function MatchesTable({ matches, scores }: {matches: Match[], scores: [number, number][]}) {
    return <div>
        { matches.map((match, i) => <div className="mt-2"><MatchCard match={match} score={scores[i]} key={i} /></div>) }
    </div>
}
