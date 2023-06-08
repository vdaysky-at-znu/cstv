import { useRouter } from 'next/router';

export default function EventPage() {
    const router = useRouter();
  return <p>Event: {router.query.id}</p>;
}