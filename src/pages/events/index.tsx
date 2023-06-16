import EventService from "@/services/event";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import EventCard from "@/components/event";
import AddMatch from "@/components/admin/AddMatch";
import FormTemplate, { FieldType } from "@/components/form/formTemplate";
import { IEvent } from "@/database/models/event";
import { ITeam } from "@/database/models/team";
import { getService } from "@/container";

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
    return <div className="mt-10 mx-2">
      <div>
        <FormTemplate
            fields={[
                {
                    type: FieldType.TEXT,
                    placeholder: "Event Name",
                    name: "name",
                    label: "Event Name"
                },
                {
                    type: FieldType.DATETIME,
                    placeholder: "Starts At",
                    name: "startsAt",
                    label: "Starts At"
                }
            ]}
            onSubmit={(values) => {
                console.log("submit", values);
            }}
            title={"Create Event"}
            submitText={"Create Event"}
        />
      </div>
      <div>
        { 
        events.map((event, i) => <div key={i} className="mt-2">
          <EventCard teams={eventTeams[i]}  event={event} />
        </div> ) 
        }
      </div>
    </div> 
  }
