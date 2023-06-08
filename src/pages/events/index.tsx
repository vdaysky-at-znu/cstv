import { getEvents } from "@/services/event";
import { Event } from "@/database/models";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import EventCard from "@/components/event";

export const getServerSideProps: GetServerSideProps<{
    events: Event[];
  }> = async () => {
    
    const events = await getEvents();
    return { props: { events: JSON.parse(JSON.stringify(events)) } };
  };
   
  export default function Page({
    events,
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <div className="mt-10 mx-2">
        { events.map((event, i) => <div className="mt-2">
          <EventCard key={i} event={event} />
        </div> ) }
    </div> 
  }