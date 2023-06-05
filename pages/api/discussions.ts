import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect"

export const router = createRouter<NextApiRequest, NextApiResponse>();

router.put(async (req, res) => {
    // create discussion here
    res.json({post: null});
});

export default router.handler({
    onError: (err, req, res) => {
      console.error(err);
      res.status(err.statusCode || 500).end(err.message);
    },
  });
