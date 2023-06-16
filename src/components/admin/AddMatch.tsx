import FormTemplate, {FieldType} from "@/components/form/formTemplate";
import { IEvent } from "@/database/models/event";
import { ITeam } from "@/database/models/team";
import {findTeams} from "@/services/client/api";
import {useState} from "react";

export default function AddMatch({event}: {event: IEvent}) {

    const [createMatchData, setCreateMatch] = useState({} as any);

    return <div>
        <FormTemplate
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
