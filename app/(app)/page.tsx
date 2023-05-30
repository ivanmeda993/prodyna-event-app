import Container from "@/app/components/Container";
import EventCard from "@/app/(app)/components/EventCard";
import EmptyState from "@/app/(app)/components/EmptyState";
import CardLoading from "@/app/(app)/components/CardLoading";
import { Event, User } from ".prisma/client";
import getEvents, { IEventsParams } from "@/app/actions/getEvents";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface HomeProps {
  searchParams: IEventsParams;
}
export default async function Home({ searchParams }: HomeProps) {
  const currentUser = await getCurrentUser();
  const events = await getEvents(searchParams);
  if (events.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <div className="pt-32">
      {/*<CardLoading />*/}
      <Container>
        <div
          className="
              py-16
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-8
            "
        >
          {events.map((event: Event & { creator: User; attendees: User[] }) => (
            <EventCard
              currentUser={currentUser!}
              key={event.id}
              event={event}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
