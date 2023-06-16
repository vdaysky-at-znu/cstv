import EventCard from '@/components/event';
import Button from '@/components/form/elements/button';
import MatchCard from '@/components/match';
import EventService from '@/services/event';
import MatchService from '@/services/match';
import TeamService from '@/services/team';
import { notEmptyOrDefault } from '@/services/client/utils';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Op } from 'sequelize';
import { ITeam } from '@/database/models/team';
import { IMatch } from '@/database/models/match';
import { IEvent } from '@/database/models/event';
import container, { getService } from '@/container';

export default function TeamPage({team, matches, events, eventTeams}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const router = useRouter();
    const [selectedMenu, setSelectedMenu] = useState(0);

    return <div className='mx-2 rounded-lg shadow-lg bg-gray-100 px-1 py-2 mt-10'>
        <div className='flex py-2 justify-between'>
            <div className='flex'>
                <img className='' src={team.logoUrl}></img>
                <h1 className='text-xl py-3 px-2 font-bold'>{ team.name }</h1>
            </div>
            <div className='flex items-center px-2'>
                <span className='text-gray-600'>#1</span>
            </div>
            
        </div>
        
        <div className='flex bg-gray-800 rounded-sm'>
            {
                team.players.map(
                    (player) => <div style={ {"width": "20%", "max-width": "20%"} } className='px-3 py-3 text-center text-white text-xs'> 
                        <Link href={"/players/" + player.id}>
                            <img src={player.photoUrl}></img>
                        </Link>
                        
                        <div className='mt-2'>
                            { player.inGameName } 
                        </div>
                    </div>
                )
            }
        </div>
        <div className='px-2'>
            <div>
                <div className=''>
                    <p className='text-lg fond-semibold pt-2'>Achievments</p>
                    <div className='flex overflow-y-scroll'>
                        {
                            notEmptyOrDefault(
                                events.filter(event => event.winnerId == team.id).map((event, i) => <img 
                                key={i}  
                                className='w-14 border p-1 border-gray-300' 
                                src={event.trophyUrl} />), 
                                <p className='text-gray-600'>{team.name} does not have any achievments yet.</p>
                            )
                        }
                    </div>
                </div>
                <div className='flex justify-between mt-2'>
                    <p className='text-gray-600'>World Ranking:</p>
                    <p className='text-gray-600'>#1</p>
                </div>
            </div>

            <div className='border border-gray-400 rounded-b-lg mt-5'>
                <div className='flex shrink-0 border-b border-gray-400'>
                    <div className='w-full'>
                        <Button 
                            onClick={() => setSelectedMenu(0)} 
                            block 
                            variant="tile" 
                            text="text-gray-800" 
                            color={selectedMenu == 0 ? "bg-gray-300": "bg-gray-400"}
                            >
                                Matches
                        </Button>
                    </div>
                    <div className='w-full'>
                        <Button 
                            onClick={() => setSelectedMenu(1)} 
                            block 
                            variant="tile" 
                            text="text-gray-800" 
                            color={selectedMenu == 1 ? "bg-gray-300": "bg-gray-400"}
                        >
                            Events
                        </Button>
                    </div>
                    <div className='w-full'>
                        <Button 
                            onClick={() => setSelectedMenu(2)} 
                            block 
                            variant="tile" 
                            text="text-gray-800" 
                            color={selectedMenu == 2 ? "bg-gray-300": "bg-gray-400"}
                            >
                                Stats
                        </Button>
                    </div>
                </div>
                <div className='p-2 bg-gray-200'>
                    { 
                        selectedMenu == 0 && <div>
                            <div>
                                {
                                    matches.length == 0 && <p className='text-center text-gray-600'>{team.name} did not participate in any matches.</p>
                                }
                                { 
                                    matches.map((match, i) => <div key={i}>
                                        <MatchCard tile match={match} score={[0, 0]} />
                                    </div>) 
                                }
                                
                            </div>
                        </div>
                    }
                    { selectedMenu == 1 && <p> 
                    {
                        events.length == 0 && <p className='text-center text-gray-600'>{team.name} did not participate in any events.</p>
                    }
                    { 
                        events.map( (e, i)=> <div key={i}> <EventCard teams={eventTeams[i]} event={e} /> </div>)
                    }
                    </p>
                    }
                    { selectedMenu == 2 && <p className='text-center text-gray-600'>There are no stats available for {team.name}</p>}
                </div>
            </div>
        </div>
    </div>
}

export const getServerSideProps: GetServerSideProps<{team: ITeam, matches: IMatch[], events: IEvent[], eventTeams: ITeam[]}> = async (ctx) => {
    const { id } = ctx.query;

    const teamService = getService(TeamService);
    const matchService = getService(MatchService);
    const eventService = getService(EventService);

    const Match = container.resolve("Match");

    const team = await teamService.getTeamById(id, {include: ['players']})
    const matches = await matchService.getMatches({
        where: {
            [Op.or]: {
                teamAId: team.id,
                teamBId: team.id,
            }
        }
    })

    const events = await eventService.getEvents({}, {
        include: [
        {
            model: Match,
            as: "matches",
            where: {
                [Op.or]: {
                    "$matches.teamAId$": team.id,
                    "$matches.teamBId$": team.id,
                }
            }
        }
    ]})

    const eventTeams = await Promise.all(events.map(e => e.loadTeams()));

    console.log(eventTeams);
    

    return {
        props: {
            team: JSON.parse(JSON.stringify(team)),
            matches: JSON.parse(JSON.stringify(matches)),
            events: JSON.parse(JSON.stringify(events)),
            eventTeams: JSON.parse(JSON.stringify(eventTeams))
        }
    }
}