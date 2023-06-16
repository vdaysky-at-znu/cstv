import { IEvent } from "@/database/models/event"
import { ITeam } from "@/database/models/team"
import Link from "next/link"

export default function EventCard({event, teams}: {event: IEvent, teams?: ITeam[]}) {

    return <div className="text-xs bg-gray-100 py-4 px-5 rounded-lg">
    <div className=" w-full flex justify-between">
        <p>
            <Link href={"/events/" + event.id}>
                { event.name }
            </Link>
        </p>
        <div className="text-right">
            Starts at: <span className="whitespace-nowrap"> { "" + event.startsAt }</span>
        </div>
       
    </div>
   
    <div className="flex justify-end">
        { teams && teams.map((team, i) =><div key={i}> <img className="w-8" src={team.logoUrl}></img> </div> ) }
    </div>
    
</div>

}