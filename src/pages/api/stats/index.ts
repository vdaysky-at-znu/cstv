import {createRouter} from "next-connect";
import {AuthenticatedApiRequest, requireRole} from "@/services/passport";
import {NextApiResponse} from "next";
import { UserRole } from "@/database/models/user";
import { getService } from "@/container";
import StatService from "@/services/stats";

const router = createRouter<AuthenticatedApiRequest, NextApiResponse>()
    .use(requireRole(UserRole.Admin))
    .put(async (req, res) => {
        const service = getService(StatService);
        const newStat = await service.createStat(req.body);

        const stat = await service.getStat(newStat.playerId, newStat.gameId);
        res.json({stat});
    });

export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err);
        res.status(err.statusCode || 500).end(err.message);
    }
});
