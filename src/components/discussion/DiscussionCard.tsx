import Button from "../form/elements/button";
import { loadReplies } from "@/services/client/api";
import { useState } from "react";
import { log } from "console";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEnvelope, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Input from "../form/elements/input";
import { IDiscussion } from "@/database/models/discussion";

export default function DiscussionView({discussion}: {discussion: IDiscussion}) {

    const [repliesToIds, setReplies] = useState(
        {}
    );

    async function addReplies(replyId: number) {
        const replies = await loadReplies(replyId)
        console.log(replies);
        setReplies({...repliesToIds, [replyId]: replies});
    }

    return <ul className={
        !discussion.title ? " before:absolute before:left-[-15px] before:h-[calc(100%-80px)] before:border-l " + 
        " before:border-gray-400 before:last:border-0": ""
        }>
        { discussion.title && <h1 className="font-bold text-2xl text-blue-800  text-center py-1"> {discussion.title}</h1> }
        <li className={
            " box-border "  + (discussion.title ? "" : " before:border-b before:border-l ") + 
            " before:box-border before:absolute before:w-[23px] before:left-[-15px] before:rounded-bl-md " + 
            " before:h-full before:top-[-8px] before:last:h-[49px] before:top-[20px] before:border-gray-400 " +
            " relative pl-2"
        }>
            <div className="mt-2">
                <h1 className="rounded-t-sm text-black bg-gray-300 py-2 px-3 border-b border-gray-400">{discussion.authorId}</h1>
                <div className="bg-gray-200">
                    <div className="px-3 py-2 text-gray-700 text-sm ">{discussion.content}</div>
                    <div className="border-t border-gray-400 text-xs px-3 py-2 text-gray-600">
                        <div className="flex justify-between">
                            <div className="flex">
                                <div className="px-1">
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                    <span className="ms-1">1</span>
                                </div>
                                <div className="px-1">
                                    <FontAwesomeIcon icon={faThumbsDown} />
                                    <span className="ms-1">5</span>
                                </div>
                                <div className="px-1" onClick={
                                    () => addReplies(discussion.id)
                                }>
                                    <FontAwesomeIcon icon={faComment} />
                                    <span className="ms-1">{discussion.replyCount}</span>
                                </div>
                            </div>
                            <div>
                                {"" + discussion.createdAt}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <ul>
                {
                !!repliesToIds[discussion.id]?.length && 
                <li className="relative ml-5">
                    <div className="flex justify-between ml-2 mt-2 relative before:border-l before:border-gray-400 before:left-[-23px] before:top-[-8px] before:absolute before:h-[calc(100%+23px)]">
                        <Input className="text-sm" placeholder="Write your reply..." block></Input>
                        <Button dense> 
                            <FontAwesomeIcon icon={faEnvelope} />
                        </Button>
                    </div>
                    {
                        repliesToIds[discussion.id].map(i => <DiscussionView discussion={i} />)
                        // repliesToIds[discussion.id].map((reply, i) => {
                        //     <DiscussionView discussion={reply} />
                        // })
                    }
                </li>
                }
            </ul>
        </li>
        
        
    </ul>
}