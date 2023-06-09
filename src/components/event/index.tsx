import { Event } from "@/database/models"
import Link from "next/link"

export default function EventCard({event}: {event: Event}) {

    return <div className="text-xs bg-gray-100 py-4 px-5 rounded-lg">
    <div className=" w-full flex justify-between">
        <p>
            <Link href={"/events/" + event.id}>
                { event.name }
            </Link>
        </p>
        <p>
            Starts at: { "" + event.startsAt }
        </p>
       
    </div>
</div>

}