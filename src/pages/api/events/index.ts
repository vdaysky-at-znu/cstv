import {NextApiResponse} from "next";
import {AuthenticatedApiRequest, requireRole} from "@/services/passport";
import {createRouter} from "next-connect";
import {UserRole} from "@/database/models";
import {createEvent} from "@/services/event";

const router = createRouter<AuthenticatedApiRequest, NextApiResponse>()
.use(requireRole(UserRole.Admin))
.put(async (req, res) => {
    const event = createEvent(req.body);
    res.json({event});
});

export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err);
        res.status(err.statusCode || 500).end(err.message);
    }
});
