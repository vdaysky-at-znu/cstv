'use strict';

const { log } = require('console');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Team', [
      {
        name: 'Natus Vincere',
      }, {
        name: 'Vitality'
      }, {
        name: 'Monte Esports'
      }
    ])

    await queryInterface.bulkInsert('Player', [{
      inGameName: 's1mple',
      elo: 100,
      teamId: 1,
    }, {
      inGameName: 'electronic',
      elo: 1,
      teamId: 1,
    }, {
      inGameName: 'b1t',
      elo: 100,
      teamId: 1,
    }, {
      inGameName: 'Perfecto',
      elo: 1,
      teamId: 1,
    }, {
      inGameName: 'NPL',
      elo: 100,
      teamId: 1,
    },
    {
      inGameName: 'ZywOo',
      elo: 101,
      teamId: 2,
    }, {
      inGameName: 'Magisk',
      elo: 100,
      teamId: 2,
    }, {
      inGameName: 'ApeX',
      elo: 100,
      teamId: 2,
    }, {
      inGameName: 'dupreeh',
      elo: 100,
      teamId: 2,
    }, {
      inGameName: 'Spinx',
      elo: 100,
      teamId: 2
    }, {
      inGameName: 'SDY',
      elo: 100,
      teamId: 3,
    }, {
      inGameName: 'BOROS',
      elo: 200,
      teamId: 3,
    }, {
      teamId: 'Woro2k',
      elo: 100,
      teamId: 3,
    }, {
      inGameName: 'Krasnal',
      elo: 100,
      teamId: 3,
    }, {
      inGameName: 'Demqq',
      elo: 100,
      teamId: 3
    }]);

    await queryInterface.bulkInsert('Event', [{
      name: 'BlastTV Paris Major'
    }])

    await queryInterface.bulkInsert('Match', [{
      teamAId: 1,
      teamBId: 3,
      winnerId: 3,
      eventId: 1,
      startsAt: '2000-01-01',
      startedAt: '2000-01-01',
    }])

    await queryInterface.bulkInsert('Game', [
      {
          matchId: 1,
          winnerId: 3,
      },
      {
        matchId: 1,
        winnerId: 3,
    }
    ])

    const roundsAnubis = [true, true, false, false, false, false, true, true, true, false, true, true, true, true, true, false, false, false, true, false, false, true, true, true, true, false, false, true];

    for (let [i, won] in Object.entries(roundsAnubis)) {
      await queryInterface.bulkInsert('Round', [{
        number: i + 1,
        winnerId: won ? 3 : 1,
        gameId: 1,
      }])
    }

    const roundsNuke = [false, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, true, true];

    for (let [i, won] of Object.entries(roundsNuke)) {
      console.log("Roind: " + i, " " + won);
      await queryInterface.bulkInsert('Round', [{
        number: parseInt(i) + 1,
        winnerId: won ? 3 : 1,
        gameId: 2,
      }])
    }

    await queryInterface.bulkInsert('PlayerStats', [{
      playerId: 1,
      gameId: 1,
      kills: 10,
      deaths: 20,
      assists: 2
    }])

    await queryInterface.bulkInsert('PlayerStats', [{
      playerId: 2,
      gameId: 1,
      kills: 10,
      deaths: 20,
      assists: 2
    }])

    await queryInterface.bulkInsert('PlayerStats', [{
      playerId: 3,
      gameId: 1,
      kills: 10,
      deaths: 20,
      assists: 2
    }])

    await queryInterface.bulkInsert('PlayerStats', [{
      playerId: 4,
      gameId: 1,
      kills: 22,
      deaths: 7,
      assists: 2
    }])

    await queryInterface.bulkInsert('PlayerStats', [{
      playerId: 5,
      gameId: 1,
      kills: 11,
      deaths: 5,
      assists: 2
    }])

    await queryInterface.bulkInsert('PlayerStats', [{
      playerId: 11,
      gameId: 1,
      kills: 10,
      deaths: 20,
      assists: 2
    }])

    await queryInterface.bulkInsert('PlayerStats', [{
      playerId: 12,
      gameId: 1,
      kills: 10,
      deaths: 20,
      assists: 2
    }])

    await queryInterface.bulkInsert('PlayerStats', [{
      playerId: 13,
      gameId: 1,
      kills: 10,
      deaths: 20,
      assists: 2
    }])

    await queryInterface.bulkInsert('PlayerStats', [{
      playerId: 14,
      gameId: 1,
      kills: 10,
      deaths: 20,
      assists: 2
    }])

    await queryInterface.bulkInsert('PlayerStats', [{
      playerId: 15,
      gameId: 1,
      kills: 10,
      deaths: 20,
      assists: 2
    }])

    await queryInterface.bulkInsert('User', [
      {
        username: 'User1',
        passwordHash: 'sgfsdogoisjigsog',
        role: 1,
        createdAt: '2000-01-01',
        playerId: 1
      },
      {
        username: 'User2',
        passwordHash: 'sgfsdogoisjigsog',
        role: 1,
        createdAt: '2000-01-01',
      },
      {
        username: 'User3',
        passwordHash: 'sgfsdogoisjigsog',
        role: 1,
        createdAt: '2000-01-01',
      }
    ])

    await queryInterface.bulkInsert('Post', [
      {
        title: 'Monte - Paris Major Champoins',
        content: "lol gotcha",
        authorId: 1
      }, {
        title: 'Apeks - Best Zonic ever',
        content: "true",
        authorId: 1
      }
    ])

    await queryInterface.bulkInsert('Discussion', [{
      authorId: 2,
      title: 'Title of Discussion',
      content: 'Hello world',
    }])

    await queryInterface.bulkInsert('DiscussionComment', [{
      authorId: 2,
      discussionId: 1,
      replyTo: null,
      content: 'text'
    }])

    await queryInterface.bulkInsert('DiscussionComment', [{
      authorId: 2,
      discussionId: 1,
      replyTo: 1,
      content: 'text'
    }])

    await queryInterface.bulkInsert('DiscussionComment', [{
      authorId: 2,
      discussionId: 1,
      replyTo: 2,
      content: 'text'
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
