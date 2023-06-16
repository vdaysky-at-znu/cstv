import { Sequelize } from "sequelize";
import BaseContext from "@/baseContext";
import { IUser } from "@/database/models/user";

export type CreateDiscussionBody = {
    title: string
    content: string
    replyTo?: number
}

export default class DiscussionService extends BaseContext {
    async  createDiscussion(author: IUser, data: CreateDiscussionBody) {
        return await this.di.Discussion.create({
            title: data.title,
            content: data.content,
            replyToId: data.replyTo,
            authorId: author.id,
        });
    }
    
    async getDiscussions(opts: {[key: string]: any}) {
        return await this.di.Discussion.findAll({
            order: [["createdAt", "DESC"]],
            ...opts
        })
    }
    
     async getRootDiscussions(opts: {[key: string]: any}) {
        return await this.getDiscussions({where: {replyToId: null}, ...opts});
    }
    
     async getDiscussionById(id: number, opts = {}) {
        return await this.di.Discussion.findByPk(id, opts);
    }
    
    async getRepliesTo(id: number) {
    
        const discussion = await  this.di.Discussion.findAll({
            where: {
                replyToId: id
            },
            attributes: [
                "id", "content", "createdAt", "updatedAt", "replyToId", "authorId", [Sequelize.fn("count", Sequelize.col("`replies`.`replyToId`")), "replyCount"]
            ],
            include: [{
                model: this.di.Discussion, 
                as: "replies", 
                attributes: [
                ],
            }],
            group: [
                "id", 
                `content`, 
                `createdAt`, 
                `updatedAt`, 
                `replyToId`, 
                `authorId`, 
                `replies.id`, 
                `replies.content`,
            ]
        });
    
        return discussion;
    }
} 
