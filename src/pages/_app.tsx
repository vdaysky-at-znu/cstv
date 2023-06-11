import type { AppProps } from 'next/app';
import "../../src/globals.css"
import {wrapper} from "@/store/store";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {setUser} from "@/store/actions";
import Layout from "@/components/layout"

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

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

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default wrapper.withRedux(App);
