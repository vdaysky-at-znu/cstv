import { Post } from "../../database/models";

export default function PostComponent({post}: {post: Post}) {
    return <div>
        <h2>{ post.title } </h2>
        <br></br>
        <p>{post.content}</p>
    </div>
}