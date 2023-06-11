import { selectAuthState } from "@/store/authSlice";
import { useSelector } from "react-redux";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { NextRequest } from "next/server";
import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm"

export default function loginPage() {
    const user = useSelector(selectAuthState);
   
    return <div className="flex items-center w-full flex-shrink-0 content-center">
        <div className="w-full items-center mt-[20vh]">
            <LoginForm></LoginForm>
        </div>
    </div>
    
    
}