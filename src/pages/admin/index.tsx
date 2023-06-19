import {GetServerSideProps} from "next";
import {createRouter} from "next-connect";
import {useAuth} from "@/services/passport";
import Input from "@/components/form/elements/input";
import Button from "@/components/form/elements/button";
import FormTemplate, {FieldType} from "@/components/form/formTemplate";
import {findEvents, findTeams} from "@/services/client/api";
import {useState} from "react";
import { UserRole } from "@/database/models/user";

export default function AdminPage() {

    const [createMatchData, setCreateMatch] = useState({} as any);

    return <div className="mt-10 rounded-lg bg-gray-100 mx-2 px-2 py-2">
        
        <div>
            <h1>Matches</h1>
            <div>

        </div>
        <div>
            <h1>Games</h1>
            
        </div>
        <div>
            <h1>Stats</h1>
            <div>
                <Input block placeholder="Game" />
                <Input block placeholder="Player" />
                <Input block placeholder="Kills" />
                <Input block placeholder="Deaths" />
                <Input block placeholder="Assists" />
                <Button block>Submit</Button>
            </div>
        </div>
        <div>
            <h1>Players</h1>
            <div>
                <Input block placeholder="IGN" />
                <Input block placeholder="Elo" />
                <Input block placeholder="Team" />
                <Input block placeholder="Image" />
                <Button block>Submit</Button>
            </div>
        </div>
        <div>
            <h1>Teams</h1>
            <div>
                <Input block placeholder="Name" />
                <Input block placeholder="Rating" />
                <Input block placeholder="Logo" />
                <Button block>Submit</Button>
            </div>
        </div>
        <div>
            <h1>Posts</h1>
            <div>
                <Input block placeholder="Title" />
                <Input block placeholder="Text" />
                <Button block>Submit</Button>
            </div>
        </div>
    </div>
</div>
}

const router = createRouter()
    .use(useAuth())
    .get((req: any, res: any) => {
        return req?.user?.role == UserRole.Admin;
    });

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {

    const isAdmin = await router.run(req, res);

    if (!isAdmin) {
        return {
            redirect: {
                destination: "/users/login",
                permanent: false
            }
        }
    }

    return {
        props: {}
    };
}