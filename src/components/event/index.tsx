import { Event } from "@/database/models"

export default function EventCard({event}: {event: Event}) {

    return <div className="text-xs bg-gray-100 py-4 px-5 rounded-lg">
    <div className=" w-full flex justify-between">
        <p>
            { event.name }
        </p>
        <p>
            Starts at: { "" + event.startsAt }
        </p>
       
    </div>
</div>

}