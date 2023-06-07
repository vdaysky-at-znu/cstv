import {Discussion, User} from "../database/models";

export type CreateDiscussionBody = {
    title: string
    content: string
    replyTo?: number
}

export async function createDiscussion(author: User, data: CreateDiscussionBody) {
    return await Discussion.create({
        title: data.title,
        content: data.content,
        replyToId: data.replyTo,
        authorId: author.id,
    });
}


