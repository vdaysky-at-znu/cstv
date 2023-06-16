import {NextApiResponse} from "next";
import {AuthenticatedApiRequest, requireRole} from "@/services/passport";
import {createRouter} from "next-connect";
import PlayerService from "@/services/player";
import { UserRole } from "@/database/models/user";
import { getService } from "@/container";

const router = createRouter<AuthenticatedApiRequest, NextApiResponse>()
    .use(requireRole(UserRole.Admin))
    // .put(async (req, res) => {
    //     const event = createTeam(req.body);
    //     res.json({team});
    // })
    .get(async (req, res) => {
        const service = getService(PlayerService);
        const {name}: {name: string} = req.query;
        const players = await service.getPlayers({name});
        res.json({players});
    });


export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err);
        res.status(err.statusCode || 500).end(err.message);
    }
});
