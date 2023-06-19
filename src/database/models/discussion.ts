
import { IContextContainer } from "@/baseContext";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, DataTypes, HasManyGetAssociationsMixin, HasOneGetAssociationMixin, BelongsToGetAssociationMixin, BuildOptions } from "sequelize";
import { IUser } from "./user";
import { IModelType } from ".";


export interface DiscussionData {
    id: CreationOptional<number>
    title: string
    content: string
    createdAt: CreationOptional<Date>
    updatedAt: CreationOptional<Date>
    replyToId?: number
    authorId: number
    author?: NonAttribute<IUser>
    replyCount: NonAttribute<number>
    replies?: NonAttribute<DiscussionData[]>
}    

export interface IDiscussion extends DiscussionData, Model<InferAttributes<IDiscussion>, InferCreationAttributes<IDiscussion>> {
    replies?: NonAttribute<IDiscussion[]>
    
    getAuthor: HasOneGetAssociationMixin<IUser>;
    getReplyTo: HasOneGetAssociationMixin<IDiscussion>;
    getReplies: HasManyGetAssociationsMixin<IDiscussion>;

    loadReplies(): Promise<IDiscussion[]>;
    loadRepliesRecursive(): Promise<IDiscussion[]>;
}

export type IDiscussionType = IModelType<IDiscussion>;

export default ({User, db}: IContextContainer): IDiscussionType => {
    
    const Discussion = <IDiscussionType> db.define<IDiscussion>('Discussion',  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        replyToId: DataTypes.INTEGER,
        authorId: DataTypes.INTEGER,
    }, {
        timestamps: true,
        freezeTableName: true,
    });

    Discussion.prototype.loadReplies = async function() {
        this.replies = await this.getReplies();
        return this.replies;
    }

    Discussion.prototype.loadRepliesRecursive = async function() {
        Promise.all((await this.loadReplies()).map(
            reply => reply.loadRepliesRecursive()
        ))
    }

    Discussion.initRels = function () {
        Discussion.belongsTo(Discussion, {as: 'replyTo', foreignKey: 'replyToId'});
        Discussion.hasMany(Discussion, {as: 'replies', foreignKey: 'replyToId'});
        Discussion.belongsTo(User, {as: 'author', foreignKey: 'authorId'})
        User.hasMany(Discussion, {as: 'discussions', foreignKey: 'authorId'})
    }

    return Discussion;
}