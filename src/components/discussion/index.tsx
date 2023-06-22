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
    
    return  <div className="bg-gray-200 py-4 px-5 border border-gray-400 ">
    <div className="flex justify-between">
        <h1 className="text-blue-800 font-bold text-xs lg:text-sm"><Link href={"/discussions/" + discussion.id}>{ discussion.title }</Link></h1>
        <div>
            <p className="text-xs text-gray-500">{ daysAgo } days ago</p>
            <p className="text-xs text-gray-500">{discussion?.author?.username}</p>
        </div>
    </div>
</div>
}