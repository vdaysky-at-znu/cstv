'use strict';

import {
    Sequelize,
    DataTypes,
    Model,
    Optional,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional, HasOneGetAssociationMixin, HasManyGetAssociationsMixin
} from 'sequelize';

import mysql2 from 'mysql2';

let sequelize = new Sequelize('cstv', 'vova', '1', {
    host: 'localhost',
    dialect: 'mysql',
    dialectModule: mysql2
});


enum UserRole {
    User = 1,
    Player = 10,
    Admin = 20,
}


export class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>>{
    declare id: CreationOptional<number>
    declare name: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Team.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        freezeTableName: true,
        sequelize,
    }
)

export class Player extends Model<InferAttributes<Player>, InferCreationAttributes<Player>> {
    declare id: CreationOptional<number>
    declare inGameName: string
    declare elo: number
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Player.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        inGameName: DataTypes.STRING,
        elo: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        freezeTableName: true,
        timestamps: true,
        sequelize,
    }
)

Player.belongsTo(Team);
Team.hasMany(Player);


export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

    declare public id: CreationOptional<number>;
    declare public role: number;
    declare public username: string;
    declare public passwordHash: string;
    declare public readonly createdAt: CreationOptional<Date>;
    declare public readonly updatedAt: CreationOptional<Date>;

    declare public getPlayer: HasOneGetAssociationMixin<Player>;
}

User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: UserRole.User,
        },
        username: DataTypes.STRING,
        passwordHash: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        timestamps: true,
        freezeTableName: true,
    }
)

User.belongsTo(Player);
Player.hasOne(User);

export class Event extends Model<InferAttributes<Event>, InferCreationAttributes<Event>> {
    declare id: CreationOptional<number>
    declare name: string
    declare startsAt: Date

    declare getMatches: HasManyGetAssociationsMixin<Match>;
}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        startsAt: DataTypes.TIME,
    }, {
        freezeTableName: true,
        sequelize
    }
)

export class Match extends Model<InferAttributes<Match>, InferCreationAttributes<Match>> {
    declare id: CreationOptional<number>
    declare startsAt: Date
    declare startedAt: Date

    declare getTeamA: HasOneGetAssociationMixin<Team>;
    declare getTeamB: HasOneGetAssociationMixin<Team>;
    declare getGames: HasManyGetAssociationsMixin<Game>;
}

Match.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        startsAt: DataTypes.TIME,
        startedAt: DataTypes.TIME,

    }, {
        sequelize,
        freezeTableName: true,
    }
)

Event.hasMany(Match);
Match.belongsTo(Event);

Team.hasMany(Match);

Match.belongsTo(Team, {as: 'teamA'})
Match.belongsTo(Team, {as: 'teamB'})

export class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>> {
    declare id: CreationOptional<number>

    declare getTeamA: HasOneGetAssociationMixin<Team>;
    declare getTeamB: HasOneGetAssociationMixin<Team>;
    declare getMatch: HasOneGetAssociationMixin<Match>;
}

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
        sequelize
    }
)

Team.hasMany(Game, {foreignKey: 'winnerId'});
Game.belongsTo(Team, {as: 'winner', foreignKey: 'winnerId'});

Game.belongsTo(Match, {foreignKey: 'matchId'});
Match.hasMany(Game, {foreignKey: 'matchId'});

export class PlayerStats extends Model<InferAttributes<PlayerStats>, InferCreationAttributes<PlayerStats>> {

    declare id: CreationOptional<number>
    declare kills: number
    declare deaths: number
    declare assists: number

    declare getGame: HasOneGetAssociationMixin<Game>;
    declare getPlayer: HasOneGetAssociationMixin<Player>;

}

PlayerStats.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        kills: DataTypes.NUMBER,
        deaths: DataTypes.NUMBER,
        assists: DataTypes.NUMBER,
    }, {
        freezeTableName: true,
        sequelize,
    }
)

Game.hasMany(PlayerStats);
Player.hasMany(PlayerStats);

PlayerStats.belongsTo(Game);
PlayerStats.belongsTo(Player);

export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>>{
    declare id: CreationOptional<number>
    declare content: string
    declare createdAt: Date
    declare updatedAt: Date

    declare getAuthor: HasOneGetAssociationMixin<User>;
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        timestamps: true,
        freezeTableName: true,
        sequelize,
    }
)

Post.belongsTo(User, {foreignKey: 'authorId'});
User.hasMany(Post, {foreignKey: 'authorId'});

export class Discussion extends Model<InferAttributes<Discussion>, InferCreationAttributes<Discussion>>{
    declare id: CreationOptional<number>
    declare title: string
    declare content: string
    declare createdAt: Date
    declare updatedAt: Date

    declare getAuthor: HasOneGetAssociationMixin<User>;
    declare getReplyTo: HasOneGetAssociationMixin<Discussion>;
    declare getReplies: HasManyGetAssociationsMixin<Discussion>;
}

Discussion.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,

    }, {
        freezeTableName: true,
        sequelize,
        timestamps: true,
    })

Discussion.belongsTo(Discussion, {as: 'replyTo', foreignKey: 'replyToId'});
Discussion.hasMany(Discussion, {as: 'replies', foreignKey: 'replyToId'});

export default sequelize; 
