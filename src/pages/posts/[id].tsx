import { getService } from "@/container"
import { IPost } from "@/database/models/post"
import PostService from "@/services/post"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Link from "next/link"

export default function PostPage({post}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <div className="mt-10 mx-2 pb-4 bg-white rounded-sm">
        <div className="px-5">
            <h1 className="text-2xl font-bold pt-3 pb-1 text-blue-800">{post.title}</h1>
            <div className="flex justify-between">
                <h2>
                    <span className="text-gray-500">By</span>
                    &nbsp;
                    <Link className="text-blue-600 underline" href={"/users/" + post.authorId}>{post.author?.username}</Link>
                </h2>
                <h2 className="text-gray-500">
                    {"" + post.createdAt}
                </h2>
            </div>
        </div>
        
        <div className="mt-5 px-5 text-xl" dangerouslySetInnerHTML={ {__html: post.content} }></div>
    </div>
}

export const getServerSideProps: GetServerSideProps<{post: IPost}> = async (ctx) => {
    const { id } = ctx.query;

    const service = getService(PostService);
    const post = await service.getPostById(id, {include: ['author']});

    return {
        props: {
            post: JSON.parse(JSON.stringify(post)),
        }
    }
}