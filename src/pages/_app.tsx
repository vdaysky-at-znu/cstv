import type { AppProps } from 'next/app';

import {wrapper} from "@/store/store";
import {getSession, mySession} from "@/services/passport";
import passport from "passport";
import React, {useEffect} from "react";
import {Provider, useDispatch, useSelector} from "react-redux";
import {selectAuthState} from "@/store/authSlice";
import axios from "axios";
import {setUser} from "@/store/actions";

function App({ Component, pageProps }: AppProps) {

    const dispatch = useDispatch();

    const fetchUser = async () => {
        await axios.get("/api/users/me")
            .then((res) => {
                dispatch(setUser(res.data.user))
            })
    }

    useEffect(() => {
        fetchUser()
    },[])

    console.log("APP called =======================")
    return (
        <Component {...pageProps} />
    );
}

export default wrapper.withRedux(App);

// App.getInitialProps = async (ctx) => {
//     console.log("getServerSideProps app")
//     // const ses = await getSession(ctx.ctx.req as any, ctx.ctx.res as any);
//     // await passport.initialize()(ctx.ctx.req as any, ctx.ctx.res as any, async () => {});
//     // await passport.session()(ctx.ctx.req as any, ctx.ctx.res as any, async () => {});
//     // console.log("GET INITIAL PROPS", ctx.ctx.req.cookies, ctx.ctx.req.session, ses);
//
//     return {
//         props: {}
//     }
// }

// In order to pass props from your component you may need either `getStaticProps` or `getServerSideProps`.
// You should definitely not do that inside your `_app.tsx` to avoid rendering your whole app in SSR;
// Example for SSR
// export function getServerSideProps() {
//     // Fetch data from external API
//     console.log("Get server side props in APP =============")
//
//     // Pass data to the page via props
//     return { props: { } }
// }