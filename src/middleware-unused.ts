import {NextRequest, NextResponse} from "next/server";
import {requireAuth} from "@/services/passport";
import { mySession } from "@/services/passport";

// export async function middleware(request: NextRequest) {
//     // await mySession(request as any, NextResponse.next(), async () => {});
// }