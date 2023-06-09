import { getMatches } from "@/services/match";
import { Match } from "@/database/models";
import { log } from "console";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import MatchCard from "@/components/match";
import MatchesTable from "@/components/match/matchesTable";

export const getServerSideProps: GetServerSideProps<{
    matches: Match[]
    scores: [number, number][]
}> = async () => {
    const matches = await getMatches();
    const scores = await Promise.all(matches.map(match => match.getScore()));
    return { props: { matches: JSON.parse(JSON.stringify(matches)), scores } };
};
   
export default function Page({
    matches, scores
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
        
    return <div className="mt-10 mx-2">
        <MatchesTable matches={matches} scores={scores} />
    </div> 
}