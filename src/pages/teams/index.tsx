import { getTeams } from "@/services/team";
import { Team } from "@/database/models";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import TeamsTable from "./teamsTable";

export const getServerSideProps: GetServerSideProps<{
    teams: Team[];
}> = async () => {
    const teams = await getTeams();
    return { props: { teams: JSON.parse(JSON.stringify(teams)) } };
};

export default function Page({
    teams,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <div className="px-2 mt-10">
        <TeamsTable teams={teams} />
    </div> 
}
