import { NextApiResponse } from "next";
import { createRouter } from "next-connect"
import DiscussionService, { CreateDiscussionBody } from "@/services/discussion"
import {requireAuth, useAuth, AuthenticatedApiRequest} from "@/services/passport";
import { getService } from "@/container";
import UserService from "@/services/user";

export const router = createRouter<AuthenticatedApiRequest, NextApiResponse>();
router
.use(useAuth())
.use(requireAuth)
.post(async (req, res) => {
  const discussionService = getService(DiscussionService);
  const userService = getService(UserService);

    const data: CreateDiscussionBody = req.body;
    const discussion = await discussionService.createDiscussion(req.user, data);

    if (discussion == null) {
      return res.json(null);
    }

    const d = await discussionService.getDiscussionWithReplyCount(discussion.id);
   
    res.json({discussion: d});
});

export default router.handler({
    onError: (err: any, req, res) => {
      console.error(err);
      res.status(err.statusCode || 500).end(err.message);
    },
  });
