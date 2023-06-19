import { DiscussionData } from "@/database/models/discussion"
import { createReply, loadReplies } from "@/services/client/api"

export function setUser(user: any) {
    return {
        type: "SET_USER",
        payload: user,
    }
}
export function addComment(comment: DiscussionData & {replyCount: number}, created=false) {
    return {
        type: "ADD_DISCUSSION",
        payload: {
            id: comment.id,
            discussion: comment,
            created
        },
    }
}

export async function loadComments(replyTo: number) {

    const replies = await loadReplies(replyTo)

    return (dispatch: any) => {
        for (const reply of replies) {
            dispatch(addComment(reply))
        }
    }
    
}

export function createComment(replyTo: number, content: string, title: string | null = null) {
    console.log("createcomment", replyTo, content, title);
    return async (dispatch, getState) => {
        const reply = await createReply(replyTo, content, title);
        dispatch(addComment(reply, true))
    }
}
