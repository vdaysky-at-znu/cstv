import { selectAuthState } from "@/store/authSlice";
import { useSelector } from "react-redux";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { NextRequest } from "next/server";
import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm"

export default function registerPage() {
    const user = useSelector(selectAuthState);
   
    return <div className="flex items-center w-full flex-shrink-0 items-center content-center">
        <div className="w-full items-center mt-[20vh]">
            <AuthForm></AuthForm>
        </div>
    </div>
    
    
}