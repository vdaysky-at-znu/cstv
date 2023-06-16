import { createRouter } from "next-connect";
import { requireAuth } from "./passport";
import { GetServerSideProps } from "next";
import { UserRole } from "@/database/models/user";

export function promisifyMiddleware(middleware: any) {

    return async (req, res, next) => {
            const f: {resolve?: any} = {}
            const pr: Promise<unknown> = new Promise((resolve, reject) => {
                f.resolve = resolve;
            });
            middleware(req, res, () => {
                f.resolve();
            });
            await pr;
            return await next();
    }
}

export function GSSPIsAdmin<T extends {[key: string]: any}>(f: GetServerSideProps<T>): GetServerSideProps<T & {isAdmin: boolean, isAuthenticated: boolean}> {

    const router = createRouter()
        .use(requireAuth())
        .get(async (req, res) => {
            return req?.user;
        });

    async function wrapper(ctx) {
        const user = await router.run(ctx.req, ctx.res);
        const isAdmin = user?.role === UserRole.Admin
        const isAuthenticated = user != null;

        let data = await f(ctx);
        if ("props" in data) {
            data.props.isAdmin = isAdmin;
            data.props.isAuthenticated = isAuthenticated;
        }
        return data;
    }

    return wrapper;

}
