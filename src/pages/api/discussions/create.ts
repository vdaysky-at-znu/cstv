import { NextApiResponse } from "next";
import { createRouter } from "next-connect"
import DiscussionService, { CreateDiscussionBody } from "@/services/discussion"
import {requireAuth, AuthenticatedApiRequest} from "@/services/passport";
import { getService } from "@/container";

export const router = createRouter<AuthenticatedApiRequest, NextApiResponse>();
router
.use(requireAuth())
.post(async (req, res) => {
  const discussionService = getService(DiscussionService);
    const data: CreateDiscussionBody = req.body;
    const discussion = await discussionService.createDiscussion(req.user, data);
    res.json({discussion});
});

export default router.handler({
    onError: (err: any, req, res) => {
      console.error(err);
      res.status(err.statusCode || 500).end(err.message);
    },
  });
