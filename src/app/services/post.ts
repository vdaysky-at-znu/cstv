import { Post } from "../database/models";

export async function getPosts() {
    return await Post.findAll({
        order: [['createdAt', 'DESC']]
    })
}
