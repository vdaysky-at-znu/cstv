'use strict';

import {
    Sequelize,
    DataTypes,
    Model,
    Optional,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional, HasOneGetAssociationMixin, HasManyGetAssociationsMixin, BelongsToGetAssociationMixin, NonAttribute
} from 'sequelize';

import mysql2 from 'mysql2';

let sequelize = new Sequelize(process.env.DB_NAME || "", process.env.DB_USER || "", process.env.DB_PASSWORD || "", {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    dialectModule: mysql2
});

export enum UserRole {
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
        timestamps: true,
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

    declare teamAId: number
    declare teamBId: number

    declare teamA?: NonAttribute<Team>
    declare teamB?: NonAttribute<Team>

    declare getTeamOne: BelongsToGetAssociationMixin<Team>;
    declare getTeamTwo: BelongsToGetAssociationMixin<Team>;
    declare getGames: HasManyGetAssociationsMixin<Game>;
}

Match.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        teamAId: DataTypes.INTEGER,
        teamBId: DataTypes.INTEGER,
        startsAt: DataTypes.TIME,
        startedAt: DataTypes.TIME,

    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
    }
)

Event.hasMany(Match);
Match.belongsTo(Event);

Team.hasMany(Match, {as: 'matchesAsOne', foreignKey: 'teamAId'});
Match.belongsTo(Team, {as: 'teamA', foreignKey: 'teamAId'})

Team.hasMany(Match, {as: 'TeamTwos', foreignKey: 'teamBId'});
Match.belongsTo(Team, {as: 'teamB', foreignKey: 'teamBId'})

export class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>> {
    declare id: CreationOptional<number>

    declare teamAId: number
    declare teamBId: number
    declare matchId: number
    declare winnerId?: number

    declare getTeamA: HasOneGetAssociationMixin<Team>;
    declare getTeamB: HasOneGetAssociationMixin<Team>;
    declare getMatch: HasOneGetAssociationMixin<Match>;
    declare getWinner: HasOneGetAssociationMixin<Team>;
}

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        teamAId: DataTypes.INTEGER,
        teamBId: DataTypes.INTEGER,
        matchId: DataTypes.INTEGER,
        winnerId: DataTypes.INTEGER,
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

Team.hasMany(Game, {as: 'gamesAsOne', foreignKey: 'teamAId'});
Game.belongsTo(Team, {as: 'teamA', foreignKey: 'teamAId'})

Team.hasMany(Game, {as: 'gamesAsTwo', foreignKey: 'teamBId'});
Game.belongsTo(Team, {as: 'teamB', foreignKey: 'teamBId'})

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
    declare title: string
    declare content: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare authorId: number

    declare getAuthor: HasOneGetAssociationMixin<User>;
}

Post.init(
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
        authorId: DataTypes.INTEGER,
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
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>

    declare replyToId?: number
    declare authorId: number

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
        replyToId: DataTypes.INTEGER,
        authorId: DataTypes.INTEGER,
    }, {
        freezeTableName: true,
        sequelize,
        timestamps: true,
    })

Discussion.belongsTo(Discussion, {as: 'replyTo', foreignKey: 'replyToId'});
Discussion.hasMany(Discussion, {as: 'replies', foreignKey: 'replyToId'});

export default sequelize; 
