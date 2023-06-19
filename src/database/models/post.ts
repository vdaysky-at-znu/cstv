import { IContextContainer } from "@/baseContext";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, DataTypes, BelongsToGetAssociationMixin, BuildOptions } from "sequelize";
import { IUser } from "./user";
import { IModelType } from ".";


export interface PostData {
    id: CreationOptional<number>
    title: string
    content: string
    createdAt: CreationOptional<Date>
    updatedAt: CreationOptional<Date>
    authorId: number
    author?: NonAttribute<IUser>
}

export interface IPost extends PostData, Model {
    
    getAuthor: BelongsToGetAssociationMixin<IUser>;
}

export type IPostType = IModelType<IPost>

export default ({User, db}: IContextContainer): IPostType => {

    const Post = <IPostType> db.define("Post",  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        authorId: DataTypes.INTEGER,
    }, {
        timestamps: true,
        freezeTableName: true,
    })

    Post.initRels = function () {
        Post.belongsTo(User, {as: 'author', foreignKey: 'authorId'});
        User.hasMany(Post, {as: 'posts', foreignKey: 'authorId'});
    }

    return Post;
}
