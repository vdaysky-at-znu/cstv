import { Post } from "@/database/models"
import { getPostById } from "@/services/post"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"

export default function PostPage({post}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <div className="mt-10 mx-2">
        <h1 className="text-xl text-center">{post.title}</h1>
        <div className="mt-5 px-5" dangerouslySetInnerHTML={ {__html: post.content} }></div>
    </div>
}

export const getServerSideProps: GetServerSideProps<{post: Post}> = async (ctx) => {
    const { id } = ctx.query;

    const post = await getPostById(id, {include: ['author']});

    return {
        props: {
            post: JSON.parse(JSON.stringify(post)),
        }
    }
}