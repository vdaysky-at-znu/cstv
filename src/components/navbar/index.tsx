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
        return <div className="max-w-[200px] flex justify-end">
            { user ?
                <Button onClick={logout} className="bg-green-500 text-white bg-red-600 sm:max-w-[100px]" variant="tile" href="/users/register" block dense >
                    <FontAwesomeIcon icon={faSignOut} />
                </Button> :
                <Button className="bg-green-500 text-white" variant="tile" href="/users/login" dense block>
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
                <div>
                    <Button href="/matches"  className="lg:min-w-[200px]" variant="tile" block dense >
                        Matches
                    </Button>
                </div>
                
            </div>
            <div className={router.route == "/events" ? "border-b-2 border-green-500" : ""}>
                <div>
                    <Button block className="lg:min-w-[200px]" href="/events" variant="tile" dense>
                        Events
                    </Button>
                </div>
                
            </div>
           
            <div className={router.route == "/teams" ? "border-b-2 border-green-500" : ""}>
                <div>
                    <Button block  className="lg:min-w-[200px]" href="/teams" variant="tile" dense>
                        Teams
                    </Button>
                </div>
                
            </div>
            
        </div>
        <AuthButton />
    </div>
}