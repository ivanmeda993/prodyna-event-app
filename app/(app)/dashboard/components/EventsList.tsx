import getUserCreatedEvents from "@/app/actions/getUserCreatedEvents";
import EventCard from "@/app/(app)/components/EventCard";
import { User, Event } from ".prisma/client";
import getUserAttendedEvents from "@/app/actions/getUserAttendEvents";

interface IEventsList {
  currentUser?: User;
  createdEvents?: boolean;
  attendingEvents?: boolean;
}
export default async function EventsList({
  currentUser,
  attendingEvents,
  createdEvents,
}: IEventsList) {
  let events = [] as (Event & { creator: User; attendees: User[] })[];

  if (createdEvents) {
    events = await getUserCreatedEvents(currentUser?.id!);
  }
  if (attendingEvents) {
    events = await getUserAttendedEvents(currentUser?.id!);
  }

  return (
    <>
      {events?.map((event) => (
        <EventCard currentUser={currentUser!} key={event.id} event={event} />
      ))}
    </>
  );
}
