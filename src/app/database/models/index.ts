'use strict';

import { Sequelize, DataTypes } from 'sequelize';

let sequelize = new Sequelize('cstv', 'root', 'root');


enum UserRole {
  User = 1,
  Player = 10,
  Admin = 20,
}


const Team = sequelize.define(
  'Team', {
    name: DataTypes.STRING
  }
)

const Player = sequelize.define(
  'Player', {
    inGameName: DataTypes.STRING,
    elo: DataTypes.INTEGER,
  }
)

Player.belongsTo(Team);
Team.hasMany(Player);

const User = sequelize.define(
  'User', {
    role: {
      type: DataTypes.INTEGER,
      defaultValue: UserRole.User
    },
    username: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
  }, {
    timestamps: true
  }
)

User.hasOne(Player);
Player.belongsTo(User);

const Event = sequelize.define(
  'Event', {
      name: DataTypes.STRING,
      startsAt: DataTypes.TIME,
  }
)

const Match = sequelize.define(
  'Match', {
    startsAt: DataTypes.TIME,
    startedAt: DataTypes.TIME,

  }
)

Event.hasMany(Match);
Match.belongsTo(Event);

Team.hasMany(Match);

Match.belongsTo(Team, { as: 'teamA' })
Match.belongsTo(Team, { as: 'teamB' })

const Game = sequelize.define(
  'Game', {

  }
)

Team.hasMany(Game);
Game.belongsTo(Team, {as: 'winner'});

Game.belongsTo(Match);
Match.hasMany(Game);

const PlayerStats = sequelize.define(
  'PlayerStats', {
    kills: DataTypes.NUMBER,
    deaths: DataTypes.NUMBER,
    assists: DataTypes.NUMBER,
  }
)

Game.hasMany(PlayerStats);
Player.hasMany(PlayerStats);

PlayerStats.belongsTo(Game);
PlayerStats.belongsTo(Player);

const Post = sequelize.define(
  'Post', {
    content: DataTypes.STRING,
  }, {
    timestamps: true
  }
)

Post.belongsTo(User);
User.hasMany(Post);

const Discussion = sequelize.define(
  'Discussion', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,

})

Discussion.belongsTo(Discussion, {as: 'replyTo'});
Discussion.hasMany(Discussion);

export default sequelize; 
