import {NextApiResponse} from "next";
import {AuthenticatedApiRequest, requireRole} from "@/services/passport";
import {createRouter} from "next-connect";
import {UserRole} from "@/database/models";
import {createGame} from "@/services/game";

const router = createRouter<AuthenticatedApiRequest, NextApiResponse>()
.use(requireRole(UserRole.Admin))
.put(async (req, res) => {
    const game = createGame(req.body);
    res.json({game});
});

export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err);
        res.status(err.statusCode || 500).end(err.message);
    }
});
