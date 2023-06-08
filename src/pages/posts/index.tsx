
import { getPosts } from "@/services/post";
import { Post } from "@/database/models";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { createRouter } from "next-connect";
import PostCard from '@/components/post'
import { IncomingMessage, ServerResponse } from "http";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthState, setAuthState} from "@/store/authSlice";
import axios from "axios";
import {setUser} from "@/store/actions";

const router = createRouter<IncomingMessage, ServerResponse>()
.get(async (req, res) => {
  const posts = await getPosts();
  return {props: {posts: JSON.parse(JSON.stringify(posts))}};
});
   
export default function Page({
  posts,
}: any) {

    const authState = useSelector(selectAuthState);

    return <div>
            {JSON.stringify(authState)}
            { posts.map((post, i) => <PostCard key={i} post={post}></PostCard>) }
        </div>
}

export const getServerSideProps: GetServerSideProps<{
      posts: Post[];
}> = async({ req, res }) => {
    return await router.run(req, res) as {props: {posts: Post[]}};
}
