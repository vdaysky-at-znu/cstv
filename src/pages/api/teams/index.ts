import {NextApiResponse} from "next";
import {AuthenticatedApiRequest, requireRole} from "@/services/passport";
import {createRouter} from "next-connect";
import {UserRole} from "@/database/models";
import {createEvent} from "@/services/event";
import {getEvents} from "@/services/event";
import {getTeams} from "@/services/team";

const router = createRouter<AuthenticatedApiRequest, NextApiResponse>()
    .use(requireRole(UserRole.Admin))
    // .put(async (req, res) => {
    //     const event = createTeam(req.body);
    //     res.json({team});
    // })
    .get(async (req, res) => {
        const {name}: {name: string} = req.query;
        const teams = await getTeams({name});
        res.json({teams});
    });


export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err);
        res.status(err.statusCode || 500).end(err.message);
    }
});
