import { useRouter } from "next/router";
export default function MatchPage() {
    const router = useRouter();

    return <div>
        Match: {router.query.id}
    </div>
}