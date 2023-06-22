import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import DiscussionService from "@/services/discussion"
import { Sequelize } from "sequelize";
import Button from "@/components/form/elements/button";
import DiscussionView from "@/components/discussion/DiscussionCard";
import container, { getService } from "@/container";
import { DiscussionData } from "@/database/models/discussion";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "@/store/actions";
import { selectDiscussionById } from "@/store/discussionSlice";
import { useEffect } from "react";

export default function DiscussionPage({ discussion }: InferGetServerSidePropsType<typeof getServerSideProps>) { 

    const dispatch = useDispatch();
    
    let reactiveDiscussion = useSelector(selectDiscussionById(discussion.id));

    if (reactiveDiscussion == null) {
        dispatch(addComment(discussion))
    }

    return <div className="mx-2 mt-10 lg:flex lg:justify-center">
        <div className=" max-w-[1000px] w-full bg-gray-100 px-2 py-5 rounded-lg">
            {reactiveDiscussion && <DiscussionView discussion={reactiveDiscussion} /> }
        </div>
    </div>
}

export const getServerSideProps: GetServerSideProps<{discussion: DiscussionData & {replyCount: number} }> = async (ctx) => {

    const { id } = ctx.query;
    
    const service = getService(DiscussionService);

    const discussion = await service.getDiscussionWithReplyCount(id);

    if (discussion == null) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    if (discussion == null || discussion.replyToId != null) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {
            discussion: JSON.parse(JSON.stringify(discussion))
        }
    }

}