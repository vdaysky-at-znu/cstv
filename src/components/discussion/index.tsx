import { Discussion } from "@/database/models";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DiscussionCard({discussion}: {discussion: Discussion}) {

    const [daysAgo, setDaysAgo] = useState(0);

    useEffect(
        () => {
            const timeAgo =  new Date().getTime() - new Date(discussion.createdAt).getTime();
            setDaysAgo(Math.trunc(timeAgo / 1000 / 60 / 60 / 24));
        }
    )
    
    return  <div className="bg-gray-100 py-4 px-5 rounded-lg border-b-4 border-blue-600">
    <div className="flex justify-between">
        <h1 className="text-blue-800 font-bold"><Link href={"/discussions/" + discussion.id}>{ discussion.title }</Link></h1>
        <div>
            <p className="text-xs">{ daysAgo } days ago</p>
            <p className="text-xs">author: {discussion?.author?.username}</p>
        </div>
    </div>
</div>
}