import {Event, Team} from "@/database/models";
import FormTemplate, {FieldType} from "@/components/form/formTemplate";
import {findEvents, findTeams} from "@/services/client/api";
import {useState} from "react";

export default function AddMatch({event}: {event: Event}) {

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
                title: (evt: Event) => evt.name,
            },
            {
                type: FieldType.AUTOCOMPLETE,
                placeholder: "Team B",
                name: "teamB",
                label: "Team B",
                source: async (prompt: string) => {
                    return await findTeams(prompt)
                },
                title: (evt: Event) => evt.name,
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
                title: (team: Team) => team?.name,
            }
        ]}
        />
    </div>
}
