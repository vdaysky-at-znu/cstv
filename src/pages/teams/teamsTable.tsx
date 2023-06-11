import Button from "@/components/form/elements/button";
import { Team } from "@/database/models";
import Link from "next/link";

export default function TeamsTable({teams}: {teams: Team[]}) {

    return <div>
        <table className="bg-gray-100 w-full rounded-lg">
            <tbody>
                {teams.map((team, i) => <tr key={i} className="border-b-4 border-green-600" >
                    <td className="px-4 py-4 w-0.5 text-gray-800 font-semibold">{i + 1}.</td>
                    <td className="px-4 py-4 font-semibold text-sm text-blue-700">
                        <Link href={"/teams/" + team.id}>{ team.name }</Link></td>
                    <td className="text-xs text-gray-700 text-right px-4">123 Points</td>
                </tr>)}
            </tbody>
        </table>
    </div>
}