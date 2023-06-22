import PostCard from "@/components/post";
import { getService } from "@/container"
import { PostData } from "@/database/models/post";
import PostService from "@/services/post"
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function allPosts({posts}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return <div className="px-2 mt-10">
        {
            posts.map(
                post => <PostCard key={post.id} post={post} />
            )
        }
    </div>

}

export const getServerSideProps: GetServerSideProps<{posts: PostData[]}> = async () => {

    const postsService = getService(PostService);
    const posts = await postsService.getPosts(); 
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        }
    }
}