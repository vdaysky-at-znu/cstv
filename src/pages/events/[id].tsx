import { Event, Match, Team }  from '@/database/models'
import { getEventById } from '@/services/event';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import TeamsTable from '../teams/teamsTable';
import MatchesTable from '@/components/match/matchesTable';
import { getMatches } from '@/services/match';

export default function EventPage({event, teams, matches, scores}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div className='mt-10 mx-2'>
    <h1 className='text-xl text-center'>{ event.name }</h1>
    
    <div className=''>
      <div>
        <h2 className='text-lg mt-10 text-center'>Teams</h2>
        <div className='mt-2'>
          <TeamsTable teams={teams} />
        </div>
      </div>
      
      <div>
        <h2 className='text-lg mt-10 text-center'>Matches</h2>
        <div>
          <MatchesTable matches={matches} scores={scores} />
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>;
}


export const getServerSideProps: GetServerSideProps<{
  event: Event
  teams: Team[],
  matches: Match[],
  scores: [number, number][]
}> = async (ctx) => {
  const { id } = ctx.query;

  const event = await getEventById(parseInt(id), {include: ['matches']});
  const teams = await event?.loadTeams();

  const matches = await getMatches({where: {eventId: event?.id}});
  const scores = await Promise.all(matches.map(match => match.getScore()));
  
  return {
    props: {
      event: JSON.parse(JSON.stringify(event)),
      teams: JSON.parse(JSON.stringify(teams)),
      matches: JSON.parse(JSON.stringify(matches)),
      scores: JSON.parse(JSON.stringify(scores)),
    }
  }
}
