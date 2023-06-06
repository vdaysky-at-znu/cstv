import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect"
import { CreateDiscussionBody, createDiscussion } from "../../../src/app/services/discussion"
import sessionMW from "../../../src/app/services/session"

import { passportAuth, actions } from "../../../src/app/services/passport";
import passport from "../../../src/app/services/passport";

export const router = createRouter<NextApiRequest, NextApiResponse>();
router

// .use(actions[0])
// .use(actions[1])
// .use(sessionMW)
.use(passportAuth)
.post(async (req, res) => {
    const data: CreateDiscussionBody = req.body;
    const author = req.user;
    console.log("request user", req.user, req.cookies);
    

    res.json({author});
});

export default router.handler({
    onError: (err, req, res) => {
      console.error(err);
      res.status(err.statusCode || 500).end(err.message);
    },
  });
