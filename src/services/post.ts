import BaseContext from "@/baseContext";
import { IUser } from "@/database/models/user";

type PostBody = {
    title: string
    content: string
}

export default class PostService extends BaseContext {
     async  getPosts(options: {[key: string]: any} = {}) {
        return await this.di.Post.findAll({
            order: [['createdAt', 'DESC']],
            include: ['author'],
            ...options
        })
    }
    
     async createPost(author: IUser, data: PostBody) {
        return await this.di.Post.create({
            title: data.title,
            content: data.content,
            authorId: author.id,
        });
    }
    
     async  getPostById(id: number, opts: {[key: string]: any}) {
        return await this.di.Post.findByPk(id, {...opts})
    }
}