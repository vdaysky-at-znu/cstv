import {NextApiResponse} from "next";
import {AuthenticatedApiRequest, requireRole} from "@/services/passport";
import {createRouter} from "next-connect";
import TeamService from "@/services/team";
import { UserRole } from "@/database/models/user";
import { getService } from "@/container";

const router = createRouter<AuthenticatedApiRequest, NextApiResponse>()
    .use(requireRole(UserRole.Admin))
    // .put(async (req, res) => {
    //     const event = createTeam(req.body);
    //     res.json({team});
    // })
    .get(async (req, res) => {
        const service = getService(TeamService);
        const {name}: {name: string} = req.query as {name: string};
        const teams = await service.getTeams({name});
        res.json({teams});
    })
    .put(async (req, res) => {
        const service = getService(TeamService);
        console.log("Create tean", req.body);
        
        const team = await service.createTeam(req.body);
        res.json({team});
    });


export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err);
        res.status(err.statusCode || 500).end(err.message);
    }
});
