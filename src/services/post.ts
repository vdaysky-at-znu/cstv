import {Post, User} from "../database/models";

export async function getPosts(options: {[key: string]: any}) {
    return await Post.findAll({
        order: [['createdAt', 'DESC']],
        ...options
    })
}

export type PostBody = {
    title: string
    content: string
}

export async function createPost(author: User, data: PostBody) {
    return await Post.create({
        title: data.title,
        content: data.content,
        authorId: author.id,
    });
}

export async function getPostById(id: number, opts: {[key: string]: any}) {
    return await Post.findByPk(id, {...opts})
}