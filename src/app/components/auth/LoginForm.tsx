"use client";

import { useState } from 'react'
import React from "react";

export default function AuthForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [loginError, setLoginError] = useState(null);

    async function sendRegisterRequest(username: string, password: string) {
        try {
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            })
            if (response.status != 200) {
                setLoginError(await response.text());
                return;
            }
            const {user} = await response.json();
            console.log("set user", user);
            setUser(user);
        } catch (e) {
            setLoginError(e.message);
        }
    }

    return <div>
        
        <div>
            { 
            user == null ? 
            <div>
                <div> 
                    {
                        loginError ? <p> {loginError} </p> 
                        : 
                        null
                        }
                </div>
                <div>
                    <input onChange={e => setUsername(e.target.value)} value={username} placeholder="Username"></input>
                    <input onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" type="password"></input>
                    <button type="button" onClick={() => sendRegisterRequest(username, password)}>Login</button>
                </div>
                
            </div> 
            : 
            <div>
                Logged in as {user.username}
            </div>
            }
        </div>
    </div>
}