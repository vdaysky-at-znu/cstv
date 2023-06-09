import { Player } from "@/database/models";
import { getPlayerById } from "@/services/player";
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Link from "next/link";

export default function PlayerPage({player}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <div className='mx-2 rounded-lg shadow-lg bg-gray-100 px-1 py-2 mt-10 px-5'>
        <div className="w-full">
            <h1 className="text-xl font-bold">
                {player.inGameName}
            </h1>

            <div>
                <img src="/player.webp"></img>
            </div>

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
                            {player.team.name}
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
}

export const getServerSideProps: GetServerSideProps<{player: Player}> = async (ctx) => {
    const { id } = ctx.query;

    const player = await getPlayerById(id, {include: ['team']});

    return {
        props: {
            player: JSON.parse(JSON.stringify(player))
        }
    }
    
}