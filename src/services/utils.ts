export function promisifyMiddleware(middleware: any) {

    return async (req, res, next) => {
            const f = {}
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