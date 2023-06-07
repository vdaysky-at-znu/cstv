import { NextApiResponse } from "next";
import { createRouter } from "next-connect"
import { CreateDiscussionBody, createDiscussion } from "@/services/discussion"

import {requireAuth, AuthenticatedApiRequest} from "@/services/passport";

export const router = createRouter<AuthenticatedApiRequest, NextApiResponse>();
router
.use(requireAuth())
.post(async (req, res) => {
    const data: CreateDiscussionBody = req.body;
    const discussion = await createDiscussion(req.user, data);
    res.json({discussion});
});

export default router.handler({
    onError: (err: any, req, res) => {
      console.error(err);
      res.status(err.statusCode || 500).end(err.message);
    },
  });
