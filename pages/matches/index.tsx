import { getMatches } from "@/app/services/match";
import { Match } from "@/app/database/models";
import { log } from "console";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps<{
    matches: Match[];
}> = async () => {
    const matches = await getMatches();
    console.log("matches", matches);
    return { props: { matches: JSON.parse(JSON.stringify(matches)) } };
};
   
export default function Page({
    matches,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    
    console.log(matches);
    
    return <div>
        <table>
            <tbody>
                { matches.map((match, i) => <tr key={i}><td>{match.teamA?.name}</td><td>{match.teamB?.name}</td></tr>) }
            </tbody>
            
        </table>
    </div> 
}