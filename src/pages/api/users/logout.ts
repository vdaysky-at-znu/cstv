import { NextApiResponse } from "next";
import { createRouter } from "next-connect"

import {AuthenticatedApiRequest, useAuth} from "@/services/passport";


export const router = createRouter<AuthenticatedApiRequest, NextApiResponse>();
router
    .use(useAuth())
    .post(async (req, res) => {
        req.logOut();
        res.json({});
    });

export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err);
        res.status(err.statusCode || 500).end(err.message);
    },
});
