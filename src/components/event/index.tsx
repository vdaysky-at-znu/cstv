import { IEvent } from "@/database/models/event"
import { ITeam } from "@/database/models/team"
import Link from "next/link"

export default function EventCard({event, teams}: {event: IEvent, teams?: ITeam[]}) {

    return <div className="text-xs sm:text-sm  lg:text-lg bg-gray-100 rounded-lg">
    <div className="relative lg:h-64 w-full">
        <img className="h-full object-cover absolute w-full" src={event.bannerUrl}></img>
        <div className="relative z-10 h-full">
            <div className="bg-gray-100 p-4 bg-opacity-90 lg:bg-opacity-50 pb-12 lg:pb-0">
                <p className="text-black text-2xl font-bold">
                    <Link href={"/events/" + event.id}>
                        { event.name }
                    </Link>
                </p>
                <div className="text-left">
                    Starts at: <span className="whitespace-nowrap"> { "" + event.startsAt }</span>
                </div>
            </div>
           
            <div className="absolute right-0 bottom-0 flex justify-end lg:bg-gray-100 px-3 py-3">
                { teams && teams.map((team, i) =><div key={i}> <img className="w-8" src={team.logoUrl}></img> </div> ) }
            </div>
        </div>
        
       
    </div>
   
    
    
</div>

}