import getCurrentUser from "@/app/actions/getCurrentUser";
import Heading from "@/app/(app)/components/Heading";
import Container from "@/app/components/Container";
import EventCard from "@/app/(app)/components/EventCard";
import { Suspense } from "react";
import EmptyState from "@/app/(app)/components/EmptyState";

export const metadata = {
  title: `Dashboard | Attends`,
  description: "Dashboard",
};
const Attends = async () => {
  const currentUser = await getCurrentUser();

  const attendEvents = currentUser?.attendedEvents;

  if (attendEvents?.length === 0) {
    return (
      <EmptyState
        title="You have not attended any events yet"
        subtitle={`Let's start by attending your first event.`}
      />
    );
  }
  return (
    <div>
      <Container>
        <Heading title="Attends" subtitle="List of all attends" />
        <div
          className="
              pt-8
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              gap-8
            "
        >
          <Suspense fallback={<div>Loading...</div>}>
            {attendEvents?.map((event) => (
              <EventCard
                currentUser={currentUser!}
                key={event.id}
                event={event}
              />
            ))}
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default Attends;
