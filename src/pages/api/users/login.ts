import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect"

import {AuthenticatedApiRequest, logIn, requireAuth} from "@/services/passport";

export const router = createRouter<AuthenticatedApiRequest, NextApiResponse>();
router
.use(requireAuth())
.use(logIn)
.post(async (req, res) => {
    const user = JSON.parse(JSON.stringify(req.user));
    res.json({user});
});

export default router.handler({
    onError: (err: any, req, res) => {
      console.error(err);
      res.status(err.statusCode || 500).end(err.message);
    },
  });
