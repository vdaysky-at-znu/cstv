import { getPosts } from "@/app/services/post";
import { Post } from "@/app/database/models";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { createRouter } from "next-connect";
import PostCard from '../../src/app/components/post'
import { IncomingMessage, ServerResponse } from "http";

const router = createRouter<IncomingMessage, ServerResponse>()
.get(async (req, res) => {
  const posts = await getPosts();
  return {props: {posts: JSON.parse(JSON.stringify(posts))}};
});
   
export default function Page({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>
      { posts.map(post => <PostCard post={post}></PostCard>) }
  </div>
}

export const getServerSideProps: GetServerSideProps<{
      posts: Post[];
}> = async({ req, res }) => {
    return await router.run(req, res) as {props: {posts: Post[]}};
}
