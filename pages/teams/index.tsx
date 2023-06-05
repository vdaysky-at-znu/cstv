import { getTeams } from "@/app/services/team";
import { Team } from "@/app/database/models";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps<{
    teams: Team[];
}> = async () => {
    const teams = await getTeams();
    return { props: { teams: JSON.parse(JSON.stringify(teams)) } };
};

export default function Page({
    teams,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <div>
        <table>
            <tbody>
                { teams.map((team, i) => <tr key={i}><td>{team.id}</td><td>{team.name}</td></tr>) }
            </tbody>
            
        </table>
    </div> 
}
