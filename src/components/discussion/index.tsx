import { DiscussionData } from "@/database/models/discussion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DiscussionCard({discussion}: {discussion: DiscussionData}) {

    const [daysAgo, setDaysAgo] = useState(0);

    useEffect(
        () => {
            const timeAgo =  new Date().getTime() - new Date(discussion.createdAt).getTime();
            setDaysAgo(Math.trunc(timeAgo / 1000 / 60 / 60 / 24));
        }
    )
    
    return <div className="bg-gray-100 py-4 px-5 border border-gray-200 ">
        <div className="">
            <div className="text-blue-800 flex justify-between font-bold text-xs lg:text-xs">
                <Link className="whitespace-nowrap text-ellipsis overflow-hidden" href={"/discussions/" + discussion.id}>
                    { discussion.title }
                
                </Link>
                <span className="text-gray-500"> ({discussion.replyCount}) </span>
            </div>
            <div className="flex">
                <span className="py-1 text-xs text-gray-500">{ daysAgo } days ago</span>
                <span className="px-1 py-1 text-xs text-gray-500">&bull;</span>
                <span className="py-1 text-xs text-gray-500">{discussion?.author?.username}</span>
            </div>
        </div>
    </div>
}