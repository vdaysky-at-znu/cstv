import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import DiscussionService from "@/services/discussion"
import { Sequelize } from "sequelize";
import Button from "@/components/form/elements/button";
import DiscussionView from "@/components/discussion/DiscussionCard";
import container, { getService } from "@/container";

export default function DiscussionPage({ discussion }: InferGetServerSidePropsType<typeof getServerSideProps>) { 

    return <div className="mx-2 mt-10 bg-gray-100 px-2 py-5 rounded-lg">
        <DiscussionView discussion={discussion} />
    </div>
}

export const getServerSideProps: GetServerSideProps<{ }> = async (ctx) => {

    const { id } = ctx.query;
    
    const service = getService(DiscussionService);

    const Discussion = container.resolve("Discussion");

    const discussion = await service.getDiscussionById(id, {
        attributes: [
            "id", 
            `title`, 
            `content`, 
            `createdAt`, 
            `updatedAt`, 
            `replyToId`, 
            `authorId`, 
            [Sequelize.fn("count", Sequelize.col("`replies`.`replyToId`")), "replyCount"]
        ],
        include: [
            {
                model: Discussion, 
                as: "replies", 
                attributes: [
                    "id", "content", [Sequelize.fn("count", Sequelize.col("`replies->replies`.`replyToId`")), "replyCount"]
                ],
                include: [{
                    model: Discussion, 
                    as: "replies", 
                    attributes: [
                    ],
                }],
                
            }
        ],
        group: [
            "id", 
            `title`, 
            `content`, 
            `createdAt`, 
            `updatedAt`, 
            `replyToId`, 
            `authorId`, 
            `replies.id`, 
            `replies.content`,
            `replies->replies.id`
        ]
    });

    if (discussion.replyToId != null) {
        return {
            redirect: "/"
        }
    }

    return {
        props: {
            discussion: JSON.parse(JSON.stringify(discussion))
        }
    }

}