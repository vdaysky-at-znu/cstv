import { NextApiResponse } from "next";
import { createRouter } from "next-connect"

import {AuthenticatedApiRequest, requireAuth} from "@/services/passport";


export const router = createRouter<AuthenticatedApiRequest, NextApiResponse>();
router
    .use(requireAuth())
    .get(async (req, res) => {
        res.json({user: req.user.toJSON()});
    });

export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err);
        res.status(err.statusCode || 500).end(err.message);
    },
});
