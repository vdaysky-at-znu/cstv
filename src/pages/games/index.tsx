import { getGames } from "@/services/game";
import { Game } from "@/database/models";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps<{
    games: Game[] | null;
    isError: boolean;
}> = async () => {

    let games = null;
    let isError = true;
    
    try {
        const gameModels = await getGames();
        games = JSON.parse(JSON.stringify(gameModels));
        isError = false;
    } catch (e) {
        console.error("Error fetching games:", e);
    }

    return { props: { games, isError } };
    
};
   
export default function Page({
    games, isError
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if (isError) {
        return <div>Error fetching games</div>
    }

    return <div>
        <table>
            <tbody>
                { games?.map((game, i) => <tr key={i}><td>{game.id}</td></tr>) }
            </tbody>
        </table>
    </div> 
}