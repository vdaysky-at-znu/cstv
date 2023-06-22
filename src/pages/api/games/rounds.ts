import {NextApiResponse} from "next";
import {AuthenticatedApiRequest, requireRole} from "@/services/passport";
import {createRouter} from "next-connect";
import GameService from "@/services/game";
import { getService } from "@/container";
import { UserRole } from "@/database/models/user";

const router = createRouter<AuthenticatedApiRequest, NextApiResponse>()
.use(requireRole(UserRole.Admin))
.post(async (req, res) => {
    const service = getService(GameService);
    const rounds = await service.createRounds(req.body);
    res.json({rounds});
});

export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err);
        res.status(err.statusCode || 500).end(err.message);
    }
});
