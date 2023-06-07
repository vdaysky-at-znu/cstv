import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect"
import { RegisterBody, registerUser } from "@/services/user"
import {AuthenticatedApiRequest, logIn, requireAuth} from "@/services/passport";

export const router = createRouter<AuthenticatedApiRequest, NextApiResponse>();
router
.post(async (req, res) => {
    const data: RegisterBody = req.body;
    console.log("user in request", req.user)
    const userModel = await registerUser(data);
    const user = JSON.parse(JSON.stringify(userModel));
    res.json({user});
});

export default router.handler({
    onError: (err: any, req, res) => {
      console.error(err);
      res.status(err.statusCode || 500).end(err.message);
    },
  });
