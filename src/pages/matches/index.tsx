import MatchService from "@/services/match";
import { log } from "console";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import MatchCard from "@/components/match";
import MatchesTable from "@/components/match/matchesTable";
import { IMatch } from "@/database/models/match";
import { getService } from "@/container";

export const getServerSideProps: GetServerSideProps<{
    matches: IMatch[]
    scores: [number, number][]
}> = async () => {
    const service = getService(MatchService);
    
    const matches = await service.getMatches();
    const scores = await Promise.all(matches.map(match => match.getScore()));
    return { props: { matches: JSON.parse(JSON.stringify(matches)), scores } };
};
   
export default function Page({
    matches, scores
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    
    return <div className="md:flex md:justify-center">
        <div className="mt-2 md:w-5/6">
            <MatchesTable matches={matches} scores={scores} />
        </div>
    </div>
}