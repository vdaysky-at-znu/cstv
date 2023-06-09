import { Team } from '@/database/models';
import { getTeamById } from '@/services/team';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function TeamPage({team}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const router = useRouter();
    return <div className='mx-2 rounded-lg shadow-lg bg-gray-100 px-1 py-2 mt-10'>
        <div className='flex'>
            <img className='w-10' src="/teamlogo.svg"></img>
            <h1 className='text-xl py-3 px-2 font-bold'>{ team.name }</h1>
        </div>
        
        <div className='flex bg-gray-800 rounded-sm'>
            {
                team.players.map(
                    (player) => <div style={ {"width": "20%", "max-width": "20%"} } className='px-3 py-3 text-center text-white text-xs'> 
                        <Link href={"/players/" + player.id}>
                            <img src="/player.webp"></img>
                        </Link>
                        
                        <div className='mt-2'>
                            { player.inGameName } 
                        </div>
                    </div>
                )
            }
        </div>
        <div className='mx-2'>
            <div className=''>
                <p className='text-lg fond-semibold pt-2'>Achievments</p>
                <div className='flex overflow-y-scroll'>
                    <img className='w-14 border p-1 border-gray-300' src="/trophy.webp"></img>
                    <img className='w-14 border p-1 border-gray-300' src="/trophy.webp"></img>
                    <img className='w-14 border p-1 border-gray-300' src="/trophy.webp"></img>
                    <img className='w-14 border p-1 border-gray-300' src="/trophy.webp"></img>
                    <img className='w-14 border p-1 border-gray-300' src="/trophy.webp"></img>
                    <img className='w-14 border p-1 border-gray-300' src="/trophy.webp"></img>
                    <img className='w-14 border p-1 border-gray-300' src="/trophy.webp"></img>
                    <img className='w-14 border p-1 border-gray-300' src="/trophy.webp"></img>
                    <img className='w-14 border p-1 border-gray-300' src="/trophy.webp"></img>
                    <img className='w-14 border p-1 border-gray-300' src="/trophy.webp"></img>
                </div>
            </div>
            <div className='flex justify-between mt-2'>
                <p className='text-gray-600'>World Ranking:</p>
                <p className='text-gray-600'>#1</p>
            </div>
        </div>
        
    </div>
}

export const getServerSideProps: GetServerSideProps<{team: Team}> = async (ctx) => {
    const { id } = ctx.query;
    const team = await getTeamById(id, {include: ['players']})
    return {
        props: {
            team: JSON.parse(JSON.stringify(team))
        }
    }
}