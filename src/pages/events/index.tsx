import EventService from "@/services/event";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import EventCard from "@/components/event";
import AddMatch from "@/components/admin/AddMatch";
import FormTemplate, { FieldType } from "@/components/form/formTemplate";
import { IEvent } from "@/database/models/event";
import { ITeam, TeamData } from "@/database/models/team";
import { getService } from "@/container";
import { createEvent, createMatch, findTeams } from "@/services/client/api";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthState } from "@/store/authSlice";

export const getServerSideProps: GetServerSideProps<{
    events: IEvent[];
    eventTeams: ITeam[][]
  }> = async () => {
    
    const eventService = getService(EventService);
    const events = await eventService.getEvents();
    const eventTeams = await Promise.all(events.map(event => event.loadTeams()));
    return { props: { events: JSON.parse(JSON.stringify(events)), eventTeams: JSON.parse(JSON.stringify(eventTeams)) } };
  };

  export default function Page({
    events, eventTeams
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    
    const [reactiveEvents, setEvents] = useState(events);
    const user = useSelector(selectAuthState);

    async function onCreateEvent(data: {name: string, startsAt: string, winner: TeamData, trophyUrl: string, bannerUrl: string}) {
      const event = await createEvent(
        data.name, 
        data.startsAt, 
        data.winner.id,
        data.trophyUrl,
        data.bannerUrl
      )
      setEvents([...reactiveEvents, event]);
    }

    return <div className="mt-10 mx-2 lg:flex">
      <div>
        { user?.role == 20 && <FormTemplate
            fields={[
                {
                    type: FieldType.TEXT,
                    placeholder: "Event Name",
                    name: "name",
                    label: "Event Name"
                },
                {
                  type: FieldType.TEXT,
                  placeholder: "Trophy URL",
                  name: "trophyUrl",
                  label: "Trophy URL"
                },
                {
                  type: FieldType.AUTOCOMPLETE,
                  placeholder: "Winner",
                  name: "winner",
                  label: "Event Winner",
                  source: findTeams,
                  title: (t) => t.name
                },
                {
                    type: FieldType.TEXT,
                    placeholder: "Banner URL",
                    name: "bannerUrl",
                    label: "Banner URL"
                },
                {
                    type: FieldType.DATETIME,
                    placeholder: "Starts At",
                    name: "startsAt",
                    label: "Starts At"
                }
            ]}
            onSubmit={onCreateEvent}
            title={"Create Event"}
            submitText={"Create Event"}
        />
      }
      </div>
      <div className="md:flex md:justify-center lg:w-full">
            <div className="mt-2 lg:mt-0 md:w-5/6">
            { 
            reactiveEvents.map((event, i) => <div key={i} className="mt-2">
              <EventCard teams={eventTeams[i]}  event={event} />
            </div> ) 
            }
          </div>
      </div>
      
    </div> 
  }
