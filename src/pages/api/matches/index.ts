import {createRouter} from "next-connect";
import {AuthenticatedApiRequest, requireRole} from "@/services/passport";
import {NextApiResponse} from "next";
import MatchService from "@/services/match";
import { UserRole } from "@/database/models/user";
import { getService } from "@/container";

const router = createRouter<AuthenticatedApiRequest, NextApiResponse>()
    .use(requireRole(UserRole.Admin))
    .put(async (req, res) => {
        const service = getService(MatchService);
        const newMatch = await service.createMatch(req.body);
        const match = await service.getMatchById(newMatch.id, {
            include: ['teamA', 'teamB']
        })
        res.json({match});
    });

export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err);
        res.status(err.statusCode || 500).end(err.message);
    }
});
