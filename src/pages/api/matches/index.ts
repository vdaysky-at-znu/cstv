import {createRouter} from "next-connect";
import {AuthenticatedApiRequest, requireRole} from "@/services/passport";
import {NextApiResponse} from "next";
import {UserRole} from "@/database/models";
import {createMatch} from "@/services/match";

const router = createRouter<AuthenticatedApiRequest, NextApiResponse>()
    .use(requireRole(UserRole.Admin))
    .put(async (req, res) => {
        const match = createMatch(req.body);
        res.json({match});
    });

export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err);
        res.status(err.statusCode || 500).end(err.message);
    }
});
