import FormTemplate, { FieldType } from "@/components/form/formTemplate";
import StatsCard from "@/components/game/StatsCard";
import MatchCard from "@/components/match";
import container, { getService } from "@/container";
import { GameData, IGame } from "@/database/models/game";
import { IPlayer, PlayerData } from "@/database/models/player";
import { createStat, findPlayers } from "@/services/client/api";
import GameService from "@/services/game";
import MatchService from "@/services/match";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";

function getTeamAWinSkull(roundNumber: number): string {
    if (roundNumber > 15) {
        return "/skull_blue.svg";
    }
    return "/skull_yellow.svg";
}

function getTeamBWinSkull(roundNumber: number) {
    if (roundNumber <= 15) {
        return "/skull_blue.svg";
    }
    return "/skull_yellow.svg";
}


export default function GamePage({game, participants, matchScore}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [stats, setStats] = useState(game?.stats)

    async function onCreateStat(data: {player: PlayerData, kills: number, deaths: number, assists: number}) {
        const stat = await createStat(game.id, data.player.id, data.kills, data.deaths, data.assists);
        stats && setStats([...stats, stat]);
        console.log("Game stats updated", JSON.stringify(game));
        
    }

    return <div className="mt-10 mx-2">
        <div>
            <FormTemplate onSubmit={onCreateStat} fields={[
                {
                    type: FieldType.AUTOCOMPLETE,
                    name: "player",
                    source: async (prompt: string, limit: number) => participants.filter(x => x.inGameName.toLowerCase().includes(prompt.toLowerCase())).slice(0, limit),
                    title: (player: IPlayer) => player.inGameName + " | " + player?.team?.name,
                },
                {
                    type: FieldType.TEXT,
                    name: "kills"
                }, 
                {
                    type: FieldType.TEXT,
                    name: "deaths"
                },
                {
                    type: FieldType.TEXT,
                    name: "assists"
                },
            ]} />
        </div>
        
        <div className="mt-10 rounded-lg border border-gray-300 shadow-lg">
            <div className="text-lg text-center bg-gradient-to-b from-gray-100 to-gray-200 py-2 rounded-t-lg border-b border-gray-400">Match</div>
            <div>
                <MatchCard tile={false} match={game.match} score={matchScore}></MatchCard>  
            </div>
        </div>


        <div className="mt-10 bg-gray-100 rounded-lg shadow-md">
            <div className="relative">
                <img className="rounded-t-lg" src={"/" + game.map.toLowerCase() + ".webp"}></img>
                <p className="absolute font-bold text-white top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"> { game.map } </p>
            </div>
            
            <div className="p-1">
                <div className="flex border-b border-gray-500 mt-1">
                    <div className="border-r mr-1 border-gray-500">
                        <img className="w-6 mr-1" src={game?.match?.teamA?.logoUrl}></img>
                    </div>
                    <div className="flex items-end pb-1">
                    {
                        game?.rounds?.sort((a, b) => a.number - b.number).map?.(round => <div>
                            {
                                round.winnerId == game?.match?.teamAId ? 
                                <img className="w-3" src={getTeamAWinSkull(round.number)}></img> : 
                                <div className="w-3"></div>
                            }
                        </div>)
                    }
                    </div>
                </div>
                <div className="flex">
                    <div className="border-r mr-1 border-gray-500">
                        <img className="w-6 mr-1" src={game?.match?.teamB?.logoUrl}></img>
                    </div>
                    <div className="flex mt-1">
                    {
                        game?.rounds?.sort((a, b) => a.number - b.number).map?.(round => <div >
                            {
                                round.winnerId == game?.match?.teamAId ? 
                                <div className="w-3"></div> :  
                                <img className="w-3" src={getTeamBWinSkull(round.number)}></img>
                            }
                        </div>)
                    }
                    </div>
                </div>
            </div>
            
        </div>

        <div className="mt-5">
            <div>
                <StatsCard stats={stats} forTeam={game?.match?.teamA} />
            </div>
            <div className="mt-2">
                <StatsCard stats={stats} forTeam={game?.match?.teamB} />
            </div>
        </div>

    </div>
}

export const getServerSideProps: GetServerSideProps<{game: GameData, participants: IPlayer[], matchScore: [number, number]}> = async (ctx) => {
    const { id } = ctx.query;

    const gameService = getService(GameService);
    const matchService = getService(MatchService);

    const Match = container.resolve("Match");
    const PlayerStats = container.resolve("PlayerStats");
    const Player = container.resolve("Player");

    const game = await gameService.getGameById(
        id, {
            include: [
                {
                    model: Match,
                    as: "match",
                    include: [
                        "teamA", "teamB"
                    ]
                }, 
                "rounds",
                {
                    model: PlayerStats,
                    as: "stats",
                    include: {
                        model: Player,
                        as: "player",
                        attributes: ["id", "inGameName", "teamId"]
                    }
                }
            ]
        });

    const participants = await matchService.getParticipantsAtMatch(game?.matchId)
    return {
        props: {
            game: JSON.parse(JSON.stringify(game)),
            participants:  JSON.parse(JSON.stringify(participants)),
            matchScore: JSON.parse(JSON.stringify(await game.match?.getScore()))
        }
    }
}