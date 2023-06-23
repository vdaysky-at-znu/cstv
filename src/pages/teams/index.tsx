import TeamService from "@/services/team";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import TeamsTable from "./teamsTable";
import FormTemplate, { FieldType } from "@/components/form/formTemplate";
import { getService } from "@/container";
import { ITeam } from "@/database/models/team";
import { createTeam } from "@/services/client/api";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthState } from "@/store/authSlice";

export const getServerSideProps: GetServerSideProps<{
    teams: ITeam[];
}> = async () => {
    const service = getService(TeamService);
    const teams = await service.getTeams();
    return { props: { teams: JSON.parse(JSON.stringify(teams)) } };
};

export default function Page({
    teams,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [reactiveTeams, setTeams] = useState(teams);

    const user = useSelector(selectAuthState);

    async function onTeamCreate(team: any) {
        const newTeam = await createTeam(team.name, team.rating, team.logoUrl);
        setTeams([...reactiveTeams, newTeam]);
    }


    return <div className="px-2 mt-10 lg:flex">
        <div>
            {
                user?.role === 20 &&
                <FormTemplate onSubmit={onTeamCreate} submitText="Register" title="Register Team" fields={[
                    {
                        type: FieldType.TEXT,
                        name: "name",
                    },
                    {
                        type: FieldType.TEXT,
                        name: "rating"
                    },
                    {
                        type: FieldType.TEXT,
                        name: "logoUrl"
                    }
                ]} />
            }
        </div>
        <div className="md:flex md:justify-center lg:w-full">
            <div className="mt-2 md:w-5/6">
                <TeamsTable teams={reactiveTeams} />
            </div>
        </div>
       
        
    </div> 
}
