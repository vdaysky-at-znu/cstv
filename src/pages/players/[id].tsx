import { getService } from "@/container";
import { IPlayer } from "@/database/models/player";
import PlayerService from "@/services/player";
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Link from "next/link";

export default function PlayerPage({player}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <div className='mx-2 rounded-lg shadow-lg bg-gray-100 mt-10 border-gray-500 border'>

        <div className="flex justify-between px-5 bg-gray-300 rounded-t-lg py-3 border-b border-gray-500">
            <h1 className="text-xl font-bold text-blue-800">
                {player.inGameName}
            </h1>
            <span>#1</span>
        </div>

        <div className="py-2 px-5">
            <div className="w-full">
                <div className="bg-gray-200 p-2 rounded-lg border border-gray-300">
                    <div className="relative">
                        <img className="relative z-10" src={player.photoUrl}></img>
                        <img className="absolute opacity-50 top-0" src={player?.team?.logoUrl}></img>
                    </div>
                </div>
            </div>
        </div>

        <div className="px-5 pb-4">
            <table className="w-full mt-5">
                <tbody>
                    <tr>
                        <td className="font-semibold text-gray-700">Age</td>
                        <td className="text-right">32 years</td>
                    </tr>
                    <tr>
                        <td className="font-semibold text-gray-700">Ranking</td>
                        <td className="text-right">#1</td>
                    </tr>
                    <tr>
                        <td className="font-semibold text-gray-700">Team</td>
                        <td className="text-right">
                            <Link href={"/teams/" + player.teamId} className="font-bold text-blue-800">
                                <img className="w-6 pe-1 inline" src={player.team?.logoUrl}></img>
                                {player?.team?.name}
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}

export const getServerSideProps: GetServerSideProps<{player: IPlayer}> = async (ctx) => {
    const { id } = ctx.query;
    
    const service = getService(PlayerService);

    const player = await service.getPlayerById(id, {include: ['team']});

    return {
        props: {
            player: JSON.parse(JSON.stringify(player))
        }
    }
    
}