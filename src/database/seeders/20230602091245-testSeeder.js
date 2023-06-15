'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const NaviId = 1;
    const VitalityId = 2;
    const MonteId = 3;

    await queryInterface.bulkInsert('Team', [
      {
        name: 'Natus Vincere',
        rating: 123,
        logoUrl: "/navi.svg",
        createdAt: '2000-01-01',
        updatedAt: '2000-01-01',
      }, {
        name: 'Vitality',
        logoUrl: "/vitality.webp",
        rating: 223,
        createdAt: '2000-01-01',
        updatedAt: '2000-01-01',
      }, {
        name: 'Monte Esports',
        logoUrl: "/monte.webp",
        rating: 311,
        createdAt: '2000-01-01',
        updatedAt: '2000-01-01',
      }
    ])

    await queryInterface.bulkInsert('Player', [{
      inGameName: 's1mple',
      elo: 100,
      teamId: 1,
      photoUrl: "https://img-cdn.hltv.org/playerbodyshot/M_HZ0vz7Cd9dNP7lS283jo.png?ixlib=java-2.1.0&w=400&s=dd291b44af34444878bc9db7fbd89e29",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      inGameName: 'electronic',
      elo: 1,
      teamId: 1,
      photoUrl: "https://img-cdn.hltv.org/playerbodyshot/M60OPidppxktmBkxtWxRZb.png?ixlib=java-2.1.0&w=400&s=68b152c1f167d0a0a5ff3661b33eb6c2",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      inGameName: 'b1t',
      elo: 100,
      teamId: 1,
      photoUrl: "https://img-cdn.hltv.org/playerbodyshot/-wpQWEgpPtJERr0fGhpsaI.png?ixlib=java-2.1.0&w=400&s=7e7143243c98eae3cbafd7e984a8ecfa",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      inGameName: 'Perfecto',
      elo: 1,
      teamId: 1,
      photoUrl: "https://img-cdn.hltv.org/playerbodyshot/ZC0J_jEmkGRfQXmlncezRS.png?ixlib=java-2.1.0&w=400&s=0353fba645f82ee92ff205756999e04c",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      inGameName: 'NPL',
      elo: 100,
      teamId: 1,
      photoUrl: "https://img-cdn.hltv.org/playerbodyshot/SMebvNX13AiGybec1L9HbK.png?ixlib=java-2.1.0&w=400&s=229146cf1cebcf195aa484d837b4f78d",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      inGameName: 'ZywOo',
      elo: 101,
      photoUrl: "https://img-cdn.hltv.org/playerbodyshot/cDLEVO33Lh8PtHQtUyF4Q9.png?ixlib=java-2.1.0&w=400&s=5ebc8a972b11d0fd81bfd922f4e0902c",
      teamId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      inGameName: 'Magisk',
      elo: 100,
      photoUrl: "https://img-cdn.hltv.org/playerbodyshot/2YQBwCCs3DnkjuzdZAbpel.png?ixlib=java-2.1.0&w=400&s=7db9549eb0b68633dff0fde24ec09db5",
      teamId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      inGameName: 'ApeX',
      elo: 100,
      photoUrl: "https://img-cdn.hltv.org/playerbodyshot/vDksHfTWrFDEnn0l1SZs0Z.png?ixlib=java-2.1.0&w=400&s=a4bb4d87a77197f89550e2b0dbefcecc",
      teamId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      inGameName: 'dupreeh',
      elo: 100,
      photoUrl: "https://img-cdn.hltv.org/playerbodyshot/o7msRJxwfm_ocbomcixhyK.png?ixlib=java-2.1.0&w=400&s=c467bce055bc7fca693f975758438103",
      teamId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      inGameName: 'Spinx',
      elo: 100,
      photoUrl: "https://img-cdn.hltv.org/playerbodyshot/g48HwD49Zckp1HwfSPs1ln.png?ixlib=java-2.1.0&w=400&s=e38bf6a0c1516d109127a14d528cba87",
      teamId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      inGameName: 'SDY',
      elo: 100,
      photoUrl: "https://img-cdn.hltv.org/playerbodyshot/2wldXzlfsYMBhkJgfWZS2c.png?ixlib=java-2.1.0&w=400&s=d4fc6480a1728ebd6ad57da9d37346de",
      teamId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      inGameName: 'BOROS',
      elo: 200,
      photoUrl: "https://img-cdn.hltv.org/playerbodyshot/8UCFXtQN6F8NjdxqcqZe6d.png?ixlib=java-2.1.0&w=400&s=adacc52ec63ca5d10fcf7786f3a12e32",
      teamId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      inGameName: 'Woro2k',
      elo: 100,
      photoUrl: "https://img-cdn.hltv.org/playerbodyshot/PV3jy5dkCmEbQ-c7JUGDo7.png?ixlib=java-2.1.0&w=400&s=3408d6915ba97548f7b6a8249bcec44c",
      teamId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      inGameName: 'Krasnal',
      elo: 100,
      photoUrl: "https://img-cdn.hltv.org/playerbodyshot/tqTf6mVhsr6hESsrdlTxma.png?ixlib=java-2.1.0&w=400&s=8b76c23dc1e5c8db82fe7602f20e55cf",
      teamId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      inGameName: 'Demqq',
      elo: 100,
      photoUrl: "https://img-cdn.hltv.org/playerbodyshot/X82JOzCmNJa38JUVkFIHRA.png?ixlib=java-2.1.0&w=400&s=33567f9bdd678e267dd7812fa4944c28",
      teamId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);

    await queryInterface.bulkInsert('Event', [{
      name: 'BlastTV Paris Major',
      startsAt: '2000-01-01',
      createdAt: '2000-01-01',
      updatedAt: '2000-01-01',
      winnerId: 2,
      trophyUrl: "https://img-cdn.hltv.org/eventtrophy/66nOdGyA6JExAXdwIpFXT6.png?ixlib=java-2.1.0&w=200&s=53fd52fe5f5c31d02ef5f755a7d1c055",
      bannerUrl: "https://img-cdn.hltv.org/eventbanner/eTGKGO1m9wAXGZb5J5-mP0.png?ixlib=java-2.1.0&w=1276&s=6ec66c7297d94cae0ed7d7dacb56d554",
    }])

    const NaviVsMonteId = 1;
    const MonteVsVitalityId = 2;

    await queryInterface.bulkInsert('Match', [{
      teamAId: 1,
      teamBId: 3,
      winnerId: 3,
      eventId: 1,
      startsAt: '2000-01-01',
      startedAt: '2000-01-01',
    }, {
      teamAId: MonteId,
      teamBId: VitalityId,
      winnerId: VitalityId,
      eventId: 1,
      startsAt: '2000-01-01',
      startedAt: '2000-01-01',
    }])

    const gameAnubisVit = 3;
    const gameNukeVit = 4;

    await queryInterface.bulkInsert('Game', [
      {
          matchId: NaviVsMonteId,
          winnerId: MonteId,
          map: "Anubis",
      },
      {
        matchId: NaviVsMonteId,
        winnerId: MonteId,
        map: "Nuke",
      }
    ])

    await queryInterface.bulkInsert('Game', [
      {
          matchId: MonteVsVitalityId,
          winnerId: VitalityId,
          map: "Anubis",
      },
      {
        matchId: MonteVsVitalityId,
        winnerId: VitalityId,
        map: "Nuke",
      }
    ])

    const roundsAnubisVit = [true, true, true, true, false, true, false, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, true, false, false];
    const roundsNukeVit = [false, false, false, true, false, true, false, true, false, true, false, true, false, false, false, false, false, false, true, true, true, true, true, false, true, true, true, false, false]

    for (let [i, won] of Object.entries(roundsAnubisVit)) {
      await queryInterface.bulkInsert('Round', [{
        number: parseInt(i) + 1,
        winnerId: won ? MonteId : VitalityId,
        gameId: gameAnubisVit,
      }])
    }

    for (let [i, won] of Object.entries(roundsNukeVit)) {
      await queryInterface.bulkInsert('Round', [{
        number: parseInt(i) + 1,
        winnerId: won ? MonteId : VitalityId,
        gameId: gameNukeVit,
      }])
    }

    const roundsAnubis = [true, true, false, false, false, false, true, true, true, false, true, true, true, true, true, false, false, false, true, false, false, true, true, true, true, false, false, true];

    for (let [i, won] of Object.entries(roundsAnubis)) {
      await queryInterface.bulkInsert('Round', [{
        number: parseInt(i) + 1,
        winnerId: won ? 3 : 1,
        gameId: 1,
      }])
    }

    const roundsNuke = [false, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, true, true];

    for (let [i, won] of Object.entries(roundsNuke)) {
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
        updatedAt: '2000-01-01',
        playerId: 1
      },
      {
        username: 'User2',
        passwordHash: 'sgfsdogoisjigsog',
        role: 1,
        createdAt: '2000-01-01',
        updatedAt: '2000-01-01',
      },
      {
        username: 'User3',
        passwordHash: 'sgfsdogoisjigsog',
        role: 1,
        createdAt: '2000-01-01',
        updatedAt: '2000-01-01',
      }
    ])

    await queryInterface.bulkInsert('Post', [
      {
        title: 'Monte - Paris Major Champoins',
        content: "lol gotcha",
        authorId: 1,
        createdAt: '2000-01-01',
        updatedAt: '2001-01-01',
      }, {
        title: 'Apeks - Best Zonic ever',
        content: "true",
        authorId: 1,
        createdAt: '2000-02-01',
        updatedAt: '2001-02-01',
      }
    ])

    await queryInterface.bulkInsert('Discussion', [{
      authorId: 2,
      title: 'Title of Discussion',
      content: 'Hello world',
      createdAt: '2000-01-01',
      updatedAt: '2000-01-01',
    }])

    await queryInterface.bulkInsert('Discussion', [{
      authorId: 2,
      replyToId: null,
      content: 'text',
      createdAt: '2000-01-01',
      updatedAt: '2000-01-01',
    }])

    await queryInterface.bulkInsert('Discussion', [{
      authorId: 2,
      replyToId: 1,
      content: 'text',
      createdAt: '2000-01-01',
      updatedAt: '2000-01-01',
    }])

    await queryInterface.bulkInsert('Discussion', [{
      authorId: 2,
      replyToId: 2,
      content: 'text',
      createdAt: '2000-01-01',
      updatedAt: '2000-01-01',
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
