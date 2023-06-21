import Button from "../form/elements/button";
import { createReply, loadReplies } from "@/services/client/api";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { log } from "console";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faCheck, faComment, faEnvelope, faStar, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Input from "../form/elements/input";
import { DiscussionData, IDiscussion } from "@/database/models/discussion";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "@/store/authSlice";
import { selectReplies } from "@/store/discussionSlice";
import { addComment, createComment, loadComments } from "@/store/actions";
import Link from "next/link";

export default function DiscussionView({discussion}: {discussion:  DiscussionData & {replyCount: number}}) {


    const [isExpanded, setExpanded] = useState(false);
    
    const inputRef = useRef<HTMLInputElement>();

    const user = useSelector(selectAuthState);

    const replies = useSelector(selectReplies(discussion.id));

    const dispatch = useDispatch();

    async function addReplies(replyId: number) {
        (await loadComments(replyId))(dispatch)
        setExpanded(!isExpanded);
    }

    async function reply(to: number, content: string) {
        dispatch(createComment(to, content));

        if (inputRef.current) 
            inputRef.current.value = "";
    }

    return <ul className={
        !discussion.title ? " before:absolute before:left-[-15px] before:h-[calc(100%-150px)] before:border-l " + 
        " before:border-gray-400 before:last:border-0": ""
        }>
        { discussion.title && <h1 className="font-bold text-2xl text-blue-800  text-center py-1"> {discussion.title}</h1> }
        <li className={
            " box-border "  + (discussion.title ? "" : " before:border-b before:border-l ") + 
            " before:box-border before:absolute before:w-[23px] before:left-[-15px] before:rounded-bl-md " + 
            " before:h-full before:last:h-[50px] before:top-[-13px] before:border-gray-400 " +
            " relative pl-2"
        }>
            <div className="mt-2">
                <h1 className="flex justify-between rounded-t-sm text-blue-800 text-sm font-semibold bg-gray-300 py-2 px-3 border-b border-gray-400">
                    <div>
                    {
                        discussion?.author?.player?.inGameName ? 
                        <Link href={"/players/" + discussion?.author?.player?.id}>
                            <span className="me-1">{discussion?.author?.player?.inGameName}</span>
                            <FontAwesomeIcon className="text-green-700" icon={faCheck}></FontAwesomeIcon>
                        </Link> : 
                        <span>
                            {discussion?.author?.username}
                        </span>
                    }
                    </div>
                    <div>
                        #{ discussion.id }
                    </div>
                    
                </h1>
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
                isExpanded && 
                <li className="relative ml-5">
                    <div className={
                        "flex justify-between ml-2 mt-2 relative before:border-l before:last:border-0 before:border-gray-400 before:left-[-23px]" +
                        " before:top-[-8px] before:absolute before:h-[calc(100%+23px)]"
                    }>
                        <Input readonly={user == null} innerRef={inputRef} className="text-sm" placeholder="Write your reply..." block></Input>
                        
                        <Button disabled={user == null} dense className="ml-1" onClick={() => reply(discussion.id, inputRef?.current?.value)}> 
                            <FontAwesomeIcon icon={faEnvelope} />
                        </Button>
                    </div>
                    {
                        replies.map((reply, i) => <DiscussionView key={i} discussion={reply} />)
                    }
                </li>
                }
            </ul>
        </li>
        
        
    </ul>
}