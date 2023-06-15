'use strict';

import {
    Sequelize,
    DataTypes,
    Model,
    Optional,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional, HasOneGetAssociationMixin, HasManyGetAssociationsMixin, BelongsToGetAssociationMixin, NonAttribute, VirtualDataType, fn
} from 'sequelize';

import mysql2 from 'mysql2';
import DiscussionCard from '@/components/discussion';
import { StringLiteral } from 'typescript';

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
    declare rating: number
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare getPlayers: HasManyGetAssociationsMixin<Player>
    declare players: NonAttribute<Player[]>
    declare logoUrl: string

    async getWonEvents() {
        return await Event.findAll({
            include: [
                {
                    model: Team,
                    where: {
                        "$winner.id$": this.id
                    }
                }
            ]
        })
    }
}

Team.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        logoUrl: DataTypes.STRING,
        rating: DataTypes.INTEGER,
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
    declare team?: NonAttribute<Team>
    declare teamId: number
    declare photoUrl: string
}

Player.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        photoUrl: DataTypes.STRING,
        inGameName: DataTypes.STRING,
        teamId: DataTypes.NUMBER,
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

Player.belongsTo(Team, {as: "team", foreignKey: "teamId"});
Team.hasMany(Player, {as: "players", foreignKey: "teamId"});


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

    declare getTeamOnes: HasManyGetAssociationsMixin<Team>;
    declare getTeamTwos: HasManyGetAssociationsMixin<Team>;

    declare getMatches: HasManyGetAssociationsMixin<Match>;
    declare teams?: Team[];
    declare winnerId: number;
    declare winner: NonAttribute<Team>;
    declare trophyUrl: string;
    declare bannerUrl: string;

    async loadTeams(): Promise<Team[]> {
        
        let intersect: {[key: number]: Team} = {};
        for (let match of await this.getMatches()) {

            const teamA = await match.getTeamA()
            const teamB = await match.getTeamB();

            intersect[teamA.id] = teamA;
            intersect[teamB.id] = teamB;
        }
        return Object.values(intersect);
    }
}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        winnerId: DataTypes.NUMBER,
        trophyUrl: DataTypes.STRING,
        bannerUrl: DataTypes.STRING,
        startsAt: DataTypes.TIME,
        teams: {
            type: DataTypes.VIRTUAL,
            async get() {
                return await this.loadTeams();
            },
            set() {
                throw new Error('Do not try to set the `teams` value!');
            }
        }
    }, {
        freezeTableName: true,
        sequelize
    }
)

Event.belongsTo(Team, {as: "winner", foreignKey: "winnerId"})
Team.hasMany(Event, {as: "wonEvents", foreignKey: "winnerId"})

export class Match extends Model<InferAttributes<Match>, InferCreationAttributes<Match>> {
    declare id: CreationOptional<number>
    declare startsAt: Date
    declare startedAt: Date

    declare teamAId: number
    declare teamBId: number
    declare eventId: number
    declare winnerId: number

    declare teamA?: NonAttribute<Team>
    declare teamB?: NonAttribute<Team>
    declare event?: NonAttribute<Event>

    declare getTeamA: BelongsToGetAssociationMixin<Team>;
    declare getTeamB: BelongsToGetAssociationMixin<Team>;
    declare getWinner: HasOneGetAssociationMixin<Team>;
    declare getGames: HasManyGetAssociationsMixin<Game>;

    declare games?: NonAttribute<Game[]>

    async getMapCount() {
        return (await this.getGames()).length;
    }

    async getScore(): Promise<[number, number]> {
        let winCount: [number, number] = [0, 0];
        for (let game of await this.getGames()) {
            const gameWinner = await game.getWinner();
            const teamA = await this.getTeamA();
            winCount[0] += (gameWinner.id == teamA.id ? 1 : 0);
            winCount[1] += (gameWinner.id == teamA.id ? 0 : 1);
        }
        return winCount;
    }
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
        eventId: DataTypes.INTEGER,
        startsAt: DataTypes.TIME,
        startedAt: DataTypes.TIME,
        winnerId: DataTypes.INTEGER,
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
    }
)

Event.hasMany(Match, {as: 'matches', foreignKey: 'eventId'});
Match.belongsTo(Event, {as: 'event', foreignKey: 'eventId'});

Team.hasMany(Match, {as: 'matchesAsTeamOne', foreignKey: 'teamAId'});
Match.belongsTo(Team, {as: 'teamA', foreignKey: 'teamAId'})

Team.hasMany(Match, {as: 'matchesAsTeamTwo', foreignKey: 'teamBId'});
Match.belongsTo(Team, {as: 'teamB', foreignKey: 'teamBId'})

Team.hasMany(Match, {foreignKey: 'winnerId'});
Match.belongsTo(Team, {as: 'winner', foreignKey: 'winnerId'})

export class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>> {
    declare id: CreationOptional<number>

    // declare teamAId: number
    // declare teamBId: number
    declare matchId: number
    declare winnerId?: number
    declare map: string
    declare rounds?: NonAttribute<Round[]>
    declare stats?: NonAttribute<PlayerStats[]>

    // declare getTeamA: HasOneGetAssociationMixin<Team>;
    // declare getTeamB: HasOneGetAssociationMixin<Team>;
    declare getMatch: HasOneGetAssociationMixin<Match>;
    declare getWinner: HasOneGetAssociationMixin<Team>;
    declare match?: NonAttribute<Match>

    async getScore(): [number, number] {
        console.log("Get Game score");
        
        const [score] = await Round.findAll({
            attributes: [
                [sequelize.fn('sum', Sequelize.literal('case when Round.winnerId = `game->match`.teamAId then 1 else 0 end')), 'teamAWon'],
                [sequelize.fn('sum', Sequelize.literal('case when Round.winnerId = `game->match`.teamBId then 1 else 0 end')), 'teamBWon'],
            ],
            raw: true,
            include: [
                {   
                    attributes: [],
                    model: Game,
                    as: "game",
                    where: {
                        id: this.id
                    },
                    include: [{
                        attributes: [],
                        model: Match,
                        as: "match",
                    }]
                }
            ]
        })
        console.log("Scores:", score);
        
        return [
            score.teamAWon as number,
            score.teamBWon as number,
        ]
    }
}

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        map: DataTypes.STRING,
        // teamAId: DataTypes.INTEGER,
        // teamBId: DataTypes.INTEGER,
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

Game.belongsTo(Match, {as: "match", foreignKey: 'matchId'});
Match.hasMany(Game, {as: "games", foreignKey: 'matchId'});

// Team.hasMany(Game, {as: 'gamesAsOne', foreignKey: 'teamAId'});
// Game.belongsTo(Team, {as: 'teamA', foreignKey: 'teamAId'})

// Team.hasMany(Game, {as: 'gamesAsTwo', foreignKey: 'teamBId'});
// Game.belongsTo(Team, {as: 'teamB', foreignKey: 'teamBId'})

export class PlayerStats extends Model<InferAttributes<PlayerStats>, InferCreationAttributes<PlayerStats>> {

    declare id: CreationOptional<number>
    declare kills: number
    declare deaths: number
    declare assists: number

    declare getGame: HasOneGetAssociationMixin<Game>;
    declare getPlayer: HasOneGetAssociationMixin<Player>;
    declare player?: NonAttribute<Player>
    declare game?: NonAttribute<Game>

}

export class Round extends Model<InferAttributes<Round>, InferCreationAttributes<Round>> {
    declare id: CreationOptional<number>
    declare number: number
    declare winnerId: number
    declare gameId: number

    declare getWinner: BelongsToGetAssociationMixin<Team>
}
Round.init({
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
    },
    number: DataTypes.NUMBER,
    winnerId: DataTypes.NUMBER,
    gameId: DataTypes.NUMBER
}, {
    timestamps: false,
    sequelize,
    freezeTableName: true,
})

Round.belongsTo(Game, {as: "game", foreignKey: 'gameId'})
Game.hasMany(Round, {as: "rounds", foreignKey: 'gameId'})


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
        timestamps: false,
    }
)

Game.hasMany(PlayerStats, {as: "stats", foreignKey: "gameId"});
Player.hasMany(PlayerStats, {as: "game", foreignKey: "gameId"});

PlayerStats.belongsTo(Game, {as: "game", foreignKey: "gameId"});
PlayerStats.belongsTo(Player, {as: "player", foreignKey: "playerId"});

export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>>{
    declare id: CreationOptional<number>
    declare title: string
    declare content: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare authorId: number
    declare author?: NonAttribute<User>

    declare getAuthor: BelongsToGetAssociationMixin<User>;
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

Post.belongsTo(User, {as: 'author', foreignKey: 'authorId'});
User.hasMany(Post, {as: 'posts', foreignKey: 'authorId'});

export class Discussion extends Model<InferAttributes<Discussion>, InferCreationAttributes<Discussion>>{
    declare id: CreationOptional<number>
    declare title: string
    declare content: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>

    declare replyToId?: number
    declare authorId: number
    declare author?: NonAttribute<User>
    declare replyCount: NonAttribute<number>

    declare replies?: NonAttribute<Discussion[]>

    declare getAuthor: HasOneGetAssociationMixin<User>;
    declare getReplyTo: HasOneGetAssociationMixin<Discussion>;
    declare getReplies: HasManyGetAssociationsMixin<Discussion>;

    async loadReplies() {
        this.replies = await this.getReplies();
        console.log("set this replies for", this.id, "to", this.replies);
        
        return this.replies;
    }

    async loadRepliesRecursive() {
        Promise.all((await this.loadReplies()).map(
            reply => reply.loadRepliesRecursive()
        ))
    }
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
Discussion.belongsTo(User, {as: 'author', foreignKey: 'authorId'})
User.hasMany(Discussion, {as: 'discussions', foreignKey: 'authorId'})

export default sequelize; 
