import FormTemplate, { FieldType } from "@/components/form/formTemplate";
import GamesTable from "@/components/game/GamesTable";
import { getService } from "@/container";
import { IMatch } from "@/database/models/match";
import { ITeam, TeamData } from "@/database/models/team";
import { createGame } from "@/services/client/api";
import MatchService from "@/services/match";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
export default function MatchPage({match, score, scores}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [games, setGames] = useState(match.games || []);
    const [reactiveScores, setScores] = useState(scores);

    async function onCreateGame({winner, map}: {winner: TeamData, map: {name: string}}) {
        
        const game = await createGame(match.id, winner.id, map.name);
        setGames([...games, game])
        setScores([...reactiveScores, [0, 0]]);
    }

    return <div className="mt-10 mx-2">
        <div>
            <FormTemplate 
                onSubmit={onCreateGame}
                title="Register Game"
                fields={[
                {
                    type: FieldType.DROPDOWN,
                    placeholder: "Winner",
                    name: "winner",
                    label: "Winner",
                    source: async () => {
                        return [match.teamA, match.teamB];
                    },
                    title: (t: ITeam) => t.name
                },
                {
                    type: FieldType.AUTOCOMPLETE,
                    placeholder: "Map",
                    name: "map",
                    label: "Map",
                    source: async (prompt) => {
                        return [
                            {name: "Anubis"},
                            {name: "Inferno"},
                            {name: "Mirage"},
                            {name: "Nuke"},
                            {name: "Overpass"},
                            {name: "Vertigo"},
                            {name: "Ancient"},
                        ].filter(x => x.name.toLowerCase().includes(prompt.toLowerCase()))
                    },
                    title: (t: any) => t.name
                }
            ]} />
        </div>
        <div className="mt-2 text-xl text-center font-bold">
            <h1>
                <span className="text-blue-800"> {match?.teamA?.name} </span> 
                <span className="text-gray-700"> {score[0]} </span>
                <span className="text-gray-700"> - </span> 
                <span className="text-gray-700"> {score[1]} </span> 
                <span className="text-blue-800"> {match?.teamB?.name} </span>
            </h1>
            <div className="sm:flex sm:justify-center">
                <div className="sm:w-[300px]">
                    <GamesTable games={games} scores={reactiveScores} />
                </div>
            </div>
            
        </div>
    </div>
}

export const getServerSideProps: GetServerSideProps<{match: IMatch, score: [number, number], scores: [number, number][]}> = async (ctx) => {
    const { id } = ctx.query;

    const service = getService(MatchService);

    const match = await service.getMatchById(id, {include: ['teamA', 'teamB', 'winner', 'event', "games"]});

    
      if (!match) {
        return {
            redirect: "/"
        }
    }


    const score = await match.getScore();

    const games = await match.getGames();

    const scores = await Promise.all(games.map(game => game.getScore()));

    return {
        props: {
            match: JSON.parse(JSON.stringify(match)),
            score,
            scores
        }
    }
}