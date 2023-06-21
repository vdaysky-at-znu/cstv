import FormTemplate, {FieldType} from "@/components/form/formTemplate";
import { IEvent } from "@/database/models/event";
import { MatchData } from "@/database/models/match";
import { ITeam, TeamData } from "@/database/models/team";
import {createMatch, findTeams} from "@/services/client/api";
import {useState} from "react";

export default function AddMatch({event, onMatchAdd}: {event: IEvent, onMatchAdd: (data: MatchData) => any}) {

    const [createMatchData, setCreateMatch] = useState({} as any);

    async function onCreateMatch({teamA, teamB, winner, startsAt}: {teamA: TeamData, teamB: TeamData, winner: TeamData, startsAt: string}) {
        const match = await createMatch(teamA.id, teamB.id, winner.id, event.id, startsAt);
        onMatchAdd(match);
    }

    return <div>
        <FormTemplate
            onSubmit={onCreateMatch}
            title={"Register Match"}
            onDataChange={setCreateMatch}
            fields={[
            {
                type: FieldType.AUTOCOMPLETE,
                placeholder: "Team A",
                name: "teamA",
                label: "Team A",
                source: async (prompt: string) => {
                    return await findTeams(prompt)
                },
                title: (evt: IEvent) => evt.name,
            },
            {
                type: FieldType.AUTOCOMPLETE,
                placeholder: "Team B",
                name: "teamB",
                label: "Team B",
                source: async (prompt: string) => {
                    return await findTeams(prompt)
                },
                title: (evt: IEvent) => evt.name,
            },
            {
                type: FieldType.DROPDOWN,
                placeholder: "Winner",
                name: "winner",
                label: "Winner",
                source: async () => {
                    return [
                        createMatchData?.teamA || {name: "TBD"},
                        createMatchData?.teamB || {name: "TBD"},
                    ]
                },
                title: (team: ITeam) => team?.name,
            }
        ]}
        />
    </div>
}
