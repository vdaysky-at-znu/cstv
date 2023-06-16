import {NextApiResponse} from "next";
import {createRouter} from "next-connect"
import {AuthenticatedApiRequest, requireRole} from "@/services/passport";
import PostService from "@/services/post";
import { getService } from "@/container";
import { UserRole } from "@/database/models/user";

export const router = createRouter<AuthenticatedApiRequest, NextApiResponse>()
    .use(requireRole(UserRole.Admin))
    .put(async (req, res) => {
        const service = getService(PostService);
        const post = await service.createPost(req.user, req.body);
        res.json({post});
    });

export default router.handler({
    onError: (err: any, req, res) => {
      console.error(err);
      res.status(err.statusCode || 500).end(err.message);
    },
  });
