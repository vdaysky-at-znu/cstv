"use client";

import { setUser } from '@/store/actions';
import { selectAuthState } from '@/store/authSlice';
import { useState } from 'react'
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Input from "@/components/form/elements/input";
import Button from "@/components/form/elements/button";
import Link from 'next/link';

export default function AuthForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(null);
    const user = useSelector(selectAuthState);
    const dispatch = useDispatch();

    async function sendRegisterRequest(username: string, password: string) {
        try {
            const response = await fetch("/api/users/register", {
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
            dispatch(setUser(user));
        } catch (e) {
            setLoginError(e.message);
        }
    }

    return <div>
        <div className='text-center flex justify-center'>
            <div>
                <div className='mx-5 max-w-[1000px] rounded-lg bg-gray-100 pt-10 pb-1 px-3'>
                    <div>
                        <div className='mb-2'>
                            <Input 
                                onChange={e => setUsername(e.target.value)} 
                                value={username} 
                                placeholder="Username"
                            />
                        </div>
                        
                        <div className='mb-10'>
                            <Input 
                                onChange={e => setPassword(e.target.value)} 
                                value={password} 
                                placeholder="Password" 
                                type="password" 
                            />
                        </div>
                    </div>

                    <div className='my-2 text-center'>
                        <Link href='/users/login' className='text-blue-800 underline'>Already have an account?</Link>
                    </div>
                    
                    <Button type="button" block onClick={() => sendRegisterRequest(username, password)}>Register</Button>
                    
                    <p className="text-red-600 mt-5"> {loginError} </p> 
                </div>
            </div> 
        </div>
    </div>
}