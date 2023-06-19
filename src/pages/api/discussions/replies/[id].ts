import { createRouter } from "next-connect";
import DiscussionService from "@/services/discussion"
import { getService } from "@/container";

const router = createRouter();

router.get(async (req, res) => {

    const discussionService = getService(DiscussionService);

    const {id} = req.query;

    const replies = await discussionService.getRepliesTo(id);
    
    res.json({replies});
});

export default router.handler({
    onError: (e) => {
        console.error(e);
    }
})
