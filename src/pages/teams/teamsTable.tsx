import Button from "@/components/form/elements/button";
import Link from "next/link";

export default function TeamsTable({teams}: {teams: Team[]}) {

    return <div>
        <table className="bg-gray-100 w-full rounded-lg">
            <tbody>
                {teams.map((team, i) => <tr key={i} className="border-b border-gray-400 last:border-b-0" >
                    <td className="px-4 py-4 w-0.5 text-gray-800 font-semibold">{i + 1}.</td>
                    <td className="px-4 py-4 font-semibold text-sm lg:text-lg text-blue-700">
                        <Link className="flex" href={"/teams/" + team.id}>
                            <img className="w-4 lg:w-6 me-1" src={team.logoUrl} /> 
                            { team.name }
                        </Link>
                    </td>
                    <td className="text-xs text-gray-700 text-right px-4">{team.rating} Points</td>
                </tr>)}
            </tbody>
        </table>
    </div>
}