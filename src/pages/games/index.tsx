import { getService } from "@/container";
import { IGame } from "@/database/models/game";
import GameService from "@/services/game";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps<{
    games: IGame[] | null;
    isError: boolean;
}> = async () => {

    let games = null;
    let isError = true;
    
    const service = getService(GameService);

    try {
        const gameModels = await service.getGames();
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