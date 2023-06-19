import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect"
import UserService, { RegisterBody } from "@/services/user"
import {AuthenticatedApiRequest, logIn, mySession, useAuth} from "@/services/passport";
import { HTTPException } from "@/exceptions";
import { promisifyMiddleware } from "@/services/utils";
import passport from "passport";
import { getService } from "@/container";

export const router = createRouter<AuthenticatedApiRequest, NextApiResponse>()
// .use(mySession)
// .use(logIn)
.use(mySession)
.use(promisifyMiddleware(passport.initialize()))
.use(promisifyMiddleware(passport.session()))
.post(async (req, res) => {
  
    const data: RegisterBody = req.body;
    const service = getService(UserService);
    const userModel = await service.registerUser(data);
    const user = JSON.parse(JSON.stringify(userModel));
    req.logIn(user, console.error);
    res.json({user});
});

export default router.handler({
    onError: (err: any, req, res) => {
      console.log("Sending error response")
      res.status(err.statusCode || 500).end(err.message);
    },
  });
