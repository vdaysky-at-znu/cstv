import Login from "@/components/auth/LoginForm";
import Register from "@/components/auth/AuthForm";
import { setUser } from "@/store/actions";
import { selectAuthState } from "@/store/authSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Button from "@/components/form/elements/button"
import { useRouter } from "next/router";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket, faSignIn, faSignOut} from "@fortawesome/free-solid-svg-icons"

export default function Navbar() {

    const router = useRouter();
    
    const user = useSelector(selectAuthState);
    const dispatch = useDispatch();
    
    async function logout() {
        await axios.post("/api/users/logout")
        dispatch(setUser(null))
    }

    function AuthButton () {
        return <div className="w-full">
            { user ?
                <Button className="bg-green-500 text-white bg-red-600" variant="tile" href="/users/register" block dense >
                    <FontAwesomeIcon icon={faSignOut} />
                </Button> :
                <Button className="bg-green-500 text-white" variant="tile" href="#" dense block onClick={logout}>
                    <FontAwesomeIcon icon={faSignIn} />
                </Button>
            }
        </div> 
    }

    return <div className="bg-white flex justify-between shadow-lg">
        <div>
            <Link href="/">
                <img className="h-[48px] min-w-[48px]" src="/logo.webp"></img>
            </Link>
        </div>
        <div className="flex">
            <div className={router.route == "/matches" ? "border-b-2 border-green-500" : ""}>
                <Button href="/matches" variant="tile" dense >
                    Matches
                </Button>
            </div>
            <div className={router.route == "/events" ? "border-b-2 border-green-500" : ""}>
                <Button href="/events" variant="tile" dense>
                    Events
                </Button>
            </div>
           
            <div className={router.route == "/teams" ? "border-b-2 border-green-500" : ""}>
                <Button href="/teams" variant="tile" dense>
                    Teams
                </Button>
            </div>
            
        </div>
        <AuthButton />
    </div>
}