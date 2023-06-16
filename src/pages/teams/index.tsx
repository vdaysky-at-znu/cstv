import TeamService from "@/services/team";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import TeamsTable from "./teamsTable";
import FormTemplate, { FieldType } from "@/components/form/formTemplate";
import { getService } from "@/container";
import { ITeam } from "@/database/models/team";

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
    return <div className="px-2 mt-10">
        <div>
            <FormTemplate submitText="Register" title="Register Team" fields={[
                {
                    type: FieldType.TEXT,
                    name: "name",
                },
                {
                    type: FieldType.TEXT,
                    name: "rating"
                }
            ]} />
        </div>
        <div className="mt-2">
            <TeamsTable teams={teams} />
        </div>
        
    </div> 
}
