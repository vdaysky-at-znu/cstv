import { getGames } from "@/app/services/game";
import { Game } from "@/app/database/models";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps<{
    games: Game[];
}> = async () => {
    const games = await getGames();
    return { props: { games: JSON.parse(JSON.stringify(games)) } };
};
   
export default function Page({
    games,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <div>
        <table>
            <tbody>
                { games.map((game, i) => <tr key={i}><td>{game.id}</td></tr>) }
            </tbody>
            
        </table>
    </div> 
}