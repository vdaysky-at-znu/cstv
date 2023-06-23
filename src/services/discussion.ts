import { Sequelize } from "sequelize";
import BaseContext from "@/baseContext";
import { IUser } from "@/database/models/user";
import { IDiscussion } from "@/database/models/discussion";

export type CreateDiscussionBody = {
    title: string
    content: string
    replyTo?: number
}

export default class DiscussionService extends BaseContext {
    async createDiscussion(author: IUser, data: CreateDiscussionBody) {
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
        return await this.di.Discussion.findAll({
            where: {
                replyToId: null
            }, 
            attributes: [
                "id", 
                `title`, 
                `content`, 
                `createdAt`, 
                `updatedAt`, 
                `replyToId`, 
                `authorId`, 
                [Sequelize.fn("count", Sequelize.col("`replies`.`replyToId`")), "replyCount"]
            ],
            include: [
                {
                    model: this.di.Discussion, 
                    as: "replies", 
                    attributes: []
                },
                {
                    model: this.di.User,
                    as: 'author',
                    attributes: [
                        'username'
                    ],
                    include: [{
                        model: this.di.Player,
                        as: 'player',
                        attributes: [
                            'inGameName',
                            'id'
                        ]
                    }]
                }
            ],
            group: [
                "id", 
                `title`, 
                `content`, 
                `createdAt`, 
                `updatedAt`, 
                `replyToId`, 
                `authorId`, 
                'username',
                'inGameName',
                "author->player.id"
            ],
            ...opts
        });
    }
    
     async getDiscussionById(id: number, opts = {}) {
        return await this.di.Discussion.findByPk(id, opts);
    }

    async getDiscussionWithReplyCount(id: number): Promise<null | (IDiscussion & {replyCount: number})> {
        return await this.getDiscussionById(id, {
            attributes: [
                "id", 
                `title`, 
                `content`, 
                `createdAt`, 
                `updatedAt`, 
                `replyToId`, 
                `authorId`, 
                [Sequelize.fn("count", Sequelize.col("`replies`.`replyToId`")), "replyCount"]
            ],
            include: [
                {
                    model: this.di.Discussion, 
                    as: "replies", 
                    attributes: []
                },
                {
                    model: this.di.User,
                    as: 'author',
                    attributes: [
                        'username'
                    ],
                    include: [{
                        model: this.di.Player,
                        as: 'player',
                        attributes: [
                            'inGameName',
                            'id'
                        ]
                    }]
                }
            ],
            group: [
                "id", 
                `title`, 
                `content`, 
                `createdAt`, 
                `updatedAt`, 
                `replyToId`, 
                `authorId`, 
                'username',
                'inGameName',
                "author->player.id"
            ]
        });
    }
    
    async getRepliesTo(id: number | null) {
    
        const discussion = await  this.di.Discussion.findAll({
            where: {
                replyToId: id
            },
            attributes: [
                "id", "title", "content", "createdAt", "updatedAt", "replyToId", "authorId", [Sequelize.fn("count", Sequelize.col("`replies`.`replyToId`")), "replyCount"]
            ],
            include: [{
                model: this.di.Discussion, 
                as: "replies", 
                attributes: [
                ],
            }, {
                model: this.di.User,
                as: 'author',
                attributes: [
                    'username'
                ],
                include: [{
                    model: this.di.Player,
                    as: 'player',
                    attributes: [
                        'inGameName',
                        'id'
                    ]
                }]
            }],
            group: [
                "id", 
                `content`, 
                'title',
                `createdAt`, 
                `updatedAt`, 
                `replyToId`, 
                `authorId`,
                'username',
                'inGameName',
                "author->player.id"
            ]
        });
    
        return discussion;
    }
} 
