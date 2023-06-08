import { useRouter } from 'next/router';

export default function TeamPage() {

    const router = useRouter();
    return <div>
        Team: {router.query.id}
    </div>
}