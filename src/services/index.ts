import { asClass } from 'awilix';
import EventService from './event';
import GameService from './game';
import MatchService from './match';
import UserService from './user';
import PostService from './post';
import DiscussionService from './discussion';
import PlayerService from './player';
import TeamService from './team';

export interface IServicesContainer {
    EventService: EventService
    GameService: GameService
    MatchService: MatchService
    UserService: UserService
    DiscussionService: DiscussionService
    PlayerService: PlayerService
    TeamService: TeamService
}

export default {
    EventService: asClass(EventService).singleton(),
    GameService: asClass(GameService).singleton(),
    MatchService: asClass(MatchService).singleton(),
    UserService: asClass(UserService).singleton(),
    PostService: asClass(PostService).singleton(),
    DiscussionService: asClass(DiscussionService).singleton(),
    PlayerService: asClass(PlayerService).singleton(),
    TeamService: asClass(TeamService).singleton(),
};