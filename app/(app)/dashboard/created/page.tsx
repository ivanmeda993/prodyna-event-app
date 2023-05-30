import getCurrentUser from "@/app/actions/getCurrentUser";
import Heading from "@/app/(app)/components/Heading";
import Container from "@/app/components/Container";
import EventCard from "@/app/(app)/components/EventCard";
import { Suspense } from "react";

export const metadata = {
  title: `Dashboard | Created`,
  description: "Dashboard",
};
const Created = async () => {
  const currentUser = await getCurrentUser();

  const created = currentUser?.createdEvents;

  return (
    <div>
      <Container>
        <Heading title="Created" subtitle="List of all attends" />
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
            {created?.map((event) => (
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

export default Created;
