import { PlayerStats, Team } from "@/database/models";
import Link from "next/link";

export default function StatsCard({stats, forTeam}: {stats: PlayerStats[], forTeam: Team}) {
    return  <div className="bg-gray-100 rounded-lg shadow-lg">
    <h1 className="text-lg lg:text-xl text-blue-800 font-bold text-center py-2 bg-gray-200 border-b border-gray-400">
     <Link href={"/teams/" + forTeam.id}>
         <img className="w-6 inline" src={forTeam.logoUrl}></img>
        <span className="ml-1">{forTeam.name}</span>  
        </Link>
    </h1>
    <table className="w-full">
        <thead>
        <tr className="border-b border-gray-300">
            <th className="py-2 px-2 text-left lg:text-xl">Player</th>
            <th className="py-2 px-2 text-left lg:text-xl">Kills</th>
            <th className="py-2 px-2 text-left lg:text-xl">Deaths</th>
            <th className="py-2 px-2 text-left lg:text-xl">Assists</th>
        </tr>
        </thead>
        <tbody>
        {
            stats?.sort?.((a, b) => b.kills - a.kills)?.map?.(stat => (stat?.player?.teamId == forTeam.id) && <tr className="border-b border-gray-300">
                <td className="px-2 py-2 text-blue-800 lg:text-xl"><Link href={"/players/" + stat.player.id}>{stat.player?.inGameName}</Link></td>
                <td className="px-2 lg:text-xl">{stat.kills}</td>
                <td className="px-2 lg:text-xl">{stat.deaths}</td>
                <td className="px-2 lg:text-xl">{stat.assists}</td>
            </tr>)
        }
        </tbody>
    
    </table>
    
</div>

}