'use client';

import { useState } from "react"

export default function DiscussionForm() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    async function postDiscussion() {
        await fetch("/api/discussions/create", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content, title
            }) 
        })
    }

    return <div>
        <input placeholder="Title" onChange={e => setTitle(e.target.value)}></input>
        <input placeholder="Content" onChange={e => setContent(e.target.value)}></input>
        <button onClick={postDiscussion}>Post</button>
    </div>
}