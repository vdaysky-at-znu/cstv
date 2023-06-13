'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS \`Player\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`inGameName\` VARCHAR(45) NOT NULL,
        \`elo\` INT NOT NULL,
        \`teamId\` INT NULL,
        \`photoUrl\` VARCHAR(256) NOT NULL,
        \`createdAt\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updatedAt\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`))
      ENGINE = InnoDB;
    `)

    await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS \`User\` (
      \`id\` INT NOT NULL AUTO_INCREMENT, 
      \`role\` INT NULL, 
      \`createdAt\` DATETIME NOT NULL,
      \`updatedAt\` DATETIME NOT NULL,
      \`playerId\` INT(11) NULL,
      \`username\` VARCHAR(45) NULL,
      \`passwordHash\` VARCHAR(256) NULL,
      PRIMARY KEY (\`id\`),
      INDEX \`fk_User_1_idx\` (\`playerId\` ASC),
      UNIQUE INDEX \`playerId_UNIQUE\` (\`playerId\` ASC),
      UNIQUE INDEX \`username_UNIQUE\` (\`username\` ASC),
      CONSTRAINT \`fk_User_1\`
        FOREIGN KEY (\`playerId\`)
        REFERENCES \`Player\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;
    `)
    
    await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS \`Team\` (
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`name\` VARCHAR(45) NULL,
      \`rating\` INT NOT NULL,
      \`logoUrl\` VARCHAR(256) NOT NULL,
      \`createdAt\` DATETIME NOT NULL,
      \`updatedAt\` DATETIME NOT NULL,
      PRIMARY KEY (\`id\`))
    ENGINE = InnoDB;
    `)

    await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS \`Event\` (
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`name\` VARCHAR(45) NULL,
      \`startsAt\` DATETIME NULL,
      \`createdAt\` DATETIME NOT NULL,
      \`updatedAt\` DATETIME NOT NULL,
      PRIMARY KEY (\`id\`))
    ENGINE = InnoDB;
    `)
    

    await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS \`Match\` (
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`eventId\` INT NULL,
      \`teamAId\` INT NULL,
      \`teamBId\` INT NULL,
      \`winnerId\` INT NULL,
      \`startsAt\` DATETIME NULL,
      \`startedAt\` DATETIME NULL,
      PRIMARY KEY (\`id\`),
      INDEX \`fk_Match_1_idx\` (\`eventId\` ASC),
      INDEX \`fk_Match_2_idx\` (\`teamAId\` ASC),
      INDEX \`fk_Match_3_idx\` (\`teamBId\` ASC),
      INDEX \`fk_Match_4_idx\` (\`winnerId\` ASC),
      CONSTRAINT \`fk_Match_1\`
        FOREIGN KEY (\`eventId\`)
        REFERENCES \`Event\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
      CONSTRAINT \`fk_Match_2\`
        FOREIGN KEY (\`teamAId\`)
        REFERENCES \`Team\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
      CONSTRAINT \`fk_Match_3\`
        FOREIGN KEY (\`teamBId\`)
        REFERENCES \`Team\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
      CONSTRAINT \`fk_Match_4\`
        FOREIGN KEY (\`winnerId\`)
        REFERENCES \`Team\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;
    `)

    await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS \`Game\` (
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`matchId\` INT NULL,
      \`winnerId\` INT NULL,
      \`map\` VARCHAR(32) NOT NULL,
      PRIMARY KEY (\`id\`),
      INDEX \`fk_Game_1_idx\` (\`matchId\` ASC),
      INDEX \`fk_Game_2_idx\` (\`winnerId\` ASC),
      CONSTRAINT \`fk_Game_1\`
        FOREIGN KEY (\`matchId\`)
        REFERENCES \`Match\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
      CONSTRAINT \`fk_Game_2\`
        FOREIGN KEY (\`winnerId\`)
        REFERENCES \`Team\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;
    `)

    await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS \`Round\` (
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`number\` INT NULL,
      \`winnerId\` INT NULL,
      \`gameId\` INT NULL,
      PRIMARY KEY (\`id\`),
      INDEX \`fk_Round_1_idx\` (\`gameId\` ASC),
      INDEX \`fk_Round_2_idx\` (\`winnerId\` ASC),
      CONSTRAINT \`fk_Round_1\`
        FOREIGN KEY (\`gameId\`)
        REFERENCES \`Game\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
      CONSTRAINT \`fk_Round_2\`
        FOREIGN KEY (\`winnerId\`)
        REFERENCES \`Team\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;
    `)

    await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS \`PlayerStats\` (
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`playerId\` INT NULL,
      \`gameId\` INT NULL,
      \`kills\` INT NULL,
      \`deaths\` INT NULL,
      \`assists\` INT NULL,
      PRIMARY KEY (\`id\`),
      INDEX \`fk_PlayerStats_1_idx\` (\`gameId\` ASC),
      INDEX \`fk_PlayerStats_2_idx\` (\`playerId\` ASC),
      CONSTRAINT \`fk_PlayerStats_1\`
        FOREIGN KEY (\`gameId\`)
        REFERENCES \`Game\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
      CONSTRAINT \`fk_PlayerStats_2\`
        FOREIGN KEY (\`playerId\`)
        REFERENCES \`Player\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;
    `)

    await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS \`Post\` (
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`content\` TEXT NULL,
      \`title\` VARCHAR(255) NULL,
      \`authorId\` INT NULL,
      \`createdAt\` DATETIME NULL,
      \`updatedAt\` DATETIME NULL,
      PRIMARY KEY (\`Id\`),
      INDEX \`fk_Post_1_idx\` (\`authorId\` ASC),
      CONSTRAINT \`fk_Post_1\`
        FOREIGN KEY (\`authorId\`)
        REFERENCES \`User\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;
    `)

    await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS \`Discussion\` (
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`authorId\` INT NULL,
      \`title\` VARCHAR(45) NULL,
      \`content\` TEXT NULL,
      \`replyToId\` INT NULL,
      \`createdAt\` DATETIME NOT NULL,
      \`updatedAt\` DATETIME NOT NULL,
      PRIMARY KEY (\`id\`),
      INDEX \`fk_Discussion_1_idx\` (\`authorId\` ASC),
      CONSTRAINT \`fk_Discussion_2\`
        FOREIGN KEY (\`replyToId\`)
        REFERENCES \`Discussion\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
      CONSTRAINT \`fk_Discussion_1\`
        FOREIGN KEY (\`authorId\`)
        REFERENCES \`User\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;
    `)
  },

  async down (queryInterface, Sequelize) {
   
  }
};
