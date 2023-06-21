import {NextApiResponse} from "next";
import {AuthenticatedApiRequest, requireRole} from "@/services/passport";
import {createRouter} from "next-connect";
import EventService from "@/services/event";
import { UserRole } from "@/database/models/user";
import { getService } from "@/container";

const router = createRouter<AuthenticatedApiRequest, NextApiResponse>()
.use(requireRole(UserRole.Admin))
.put(async (req, res) => {
    const service = getService(EventService);
    const newEvent = await service.createEvent({
        ...req.body,
        startsAt: new Date(req.body.startsAt)
    });

    const event = await service.getEventById(newEvent.id, {
    })

    res.json({event});
})
.get(async (req, res) => {
    const service = getService(EventService);
    const {name}: {name: string} = req.query;
    const events = await service.getEvents({name});
    res.json({events});
});


export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err);
        res.status(err.statusCode || 500).end(err.message);
    }
});
