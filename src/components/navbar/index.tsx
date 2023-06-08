import Login from "@/components/auth/LoginForm";
import Register from "@/components/auth/AuthForm";
import { setUser } from "@/store/actions";
import { selectAuthState } from "@/store/authSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Button from "@/components/form/button"
import { useRouter } from "next/router";

export default function Navbar() {

    const router = useRouter();
    
    const user = useSelector(selectAuthState);
    const dispatch = useDispatch();
    
    async function logout() {
        await axios.post("/api/users/logout")
        dispatch(setUser(null))
    }

    function AuthButton () {
        return <div>
            { user ? 
                <Button className="bg-green-500 text-white" href="#" dense onClick={logout}>Log Out</Button> : 
                <Button className="bg-green-500 text-white" href="/users/register" dense >Sign in</Button>
            }
        </div> 
    }

    return <div className="bg-white flex justify-between">
        <div>
            <img className="h-[48px]" src="/logo.webp"></img>
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
        {/* <div className="border-l-2 border-gray-400"></div> */}
        <AuthButton />
    </div>
}