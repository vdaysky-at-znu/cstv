import {Event, Match, Team, UserRole} from '@/database/models'
import { getEventById } from '@/services/event';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import TeamsTable from '../teams/teamsTable';
import MatchesTable from '@/components/match/matchesTable';
import { getMatches } from '@/services/match';
import AddMatch from "@/components/admin/AddMatch";
import {requireAuth} from "@/services/passport";
import {createRouter} from "next-connect";

export default function EventPage({event, teams, matches, scores, isAdmin}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div className='mt-10 mx-2'>

    {
      isAdmin ? <div className="mb-5">
        <AddMatch event={event} />
      </div> : null
    }

    <div>
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
    </div>
  </div>;
}


const router = createRouter()
    .use(requireAuth())
    .get(async (req, res) => {
        return req.user.role;
    });

export const getServerSideProps: GetServerSideProps<{
  event: Event
  teams: Team[],
  matches: Match[],
  scores: [number, number][]
  isAdmin: boolean
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
      isAdmin: await router.run(ctx.req, ctx.res) === UserRole.Admin
    }
  }
}
