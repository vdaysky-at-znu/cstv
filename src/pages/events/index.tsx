import { getEvents } from "@/services/event";
import { Event } from "@/database/models";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps<{
    events: Event[];
  }> = async () => {
    
    const events = await getEvents();
    return { props: { events: JSON.parse(JSON.stringify(events)) } };
  };
   
  export default function Page({
    events,
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <div>
        <table>
            <tbody>
                { events.map((event, i) => <tr key={i}><td>{event.name}</td><td>{event.startsAt}</td></tr>) }
            </tbody>
            
        </table>
    </div> 
  }