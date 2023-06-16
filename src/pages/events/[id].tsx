import EventService from '@/services/event';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import TeamsTable from '../teams/teamsTable';
import MatchesTable from '@/components/match/matchesTable';
import MatchService from '@/services/match';
import AddMatch from "@/components/admin/AddMatch";
import {requireAuth} from "@/services/passport";
import {createRouter} from "next-connect";
import { GSSPIsAdmin } from '@/services/utils';
import { IEvent } from '@/database/models/event';
import { ITeam } from '@/database/models/team';
import { IMatch } from '@/database/models/match';
import container, { getService } from '@/container';
// import { GSSPIsAdmin } from '@/services/utils';

export default function EventPage({event, teams, matches, scores, isAdmin}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>
      <div className='relative mt-0 border-t-2 border-gray-400'>
          <img className='w-full' src={event.bannerUrl}></img>
          <h1 className=' absolute bottom-0 text-xl text-white font-bold text-center w-full'>{ event.name }</h1>
        </div>
        <div className='mt-10 mx-2'>

      {
        isAdmin && <div className="mb-5">
          <AddMatch event={event} />
        </div>
      }

      <div>
      
        <div className='mt-10'>
          <div className='bg-gray-100 border border-gray-400 rounded-lg'>

            <h2 className='text-lg py-2 rounded-t-lg bg-gray-300 text-center border-b border-gray-400'>Teams</h2>

            <div className='py-3'>
              <div className=''>
                <TeamsTable teams={teams} />
              </div>
            </div>
          </div>

          <div className='mt-10 bg-gray-100 border border-gray-400 rounded-lg'>
            <h2 className='text-lg py-3 bg-gray-300 border-b border-gray-400 rounded-t-lg text-center'>Matches</h2>
            <div className='py-3'>
              <MatchesTable matches={matches} scores={scores} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
}


export const getServerSideProps: GetServerSideProps<{
  event: IEvent
  teams: ITeam[],
  matches: IMatch[],
  scores: [number, number][]
  isAdmin: boolean
}> = GSSPIsAdmin(async (ctx) => {
  const { id } = ctx.query;

  const eventService = getService(EventService);
  const matchService = getService(MatchService);

  const Match = container.resolve("Match");

  const event = await eventService.getEventById(parseInt(id), {include: ['matches']});
  const teams = await event?.loadTeams();
  

  

  const matches = await matchService.getMatches({where: {eventId: event?.id}});
  console.log("Match getScore : ", Match.getScore, " instance, ", matches[0].getScore);


  const scores = await Promise.all(matches.map(match => match.getScore()));
  
  return {
    props: {
      event: JSON.parse(JSON.stringify(event)),
      teams: JSON.parse(JSON.stringify(teams)),
      matches: JSON.parse(JSON.stringify(matches)),
      scores: JSON.parse(JSON.stringify(scores)),
    }
  }
});
