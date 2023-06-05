import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect"
import { RegisterBody, registerUser } from "../../../src/app/services/user"

export const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
    const data: RegisterBody = req.body;
    
    const user = await registerUser(data);
    res.json({user});
});

export default router.handler({
    onError: (err, req, res) => {
      console.error(err);
      res.status(err.statusCode || 500).end(err.message);
    },
  });
