import {Post, User} from "../database/models";

export async function getPosts() {
    return await Post.findAll({
        order: [['createdAt', 'DESC']]
    })
}

export type PostBody = {
    title: string
    content: string
}

export async function createPost(author: User, data: PostBody) {
    return await Post.create({
        title: "test",
        content: "test",
        authorId: author.id,
    });
}