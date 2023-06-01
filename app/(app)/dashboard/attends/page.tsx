import getCurrentUser from "@/app/actions/getCurrentUser";
import Heading from "@/app/(app)/components/Heading";
import Container from "@/app/components/Container";
import EventCard from "@/app/(app)/components/EventCard";
import { Suspense } from "react";
import EventsList from "@/app/(app)/dashboard/components/EventsList";

export const metadata = {
  title: `Dashboard | Attends`,
  description: "Dashboard",
};
const Attends = async () => {
  const currentUser = await getCurrentUser();

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
            <Suspense fallback={<div>Loading...</div>}>
              {/* @ts-expect-error Server Component */}
              <EventsList attendingEvents currentUser={currentUser!} />
            </Suspense>
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default Attends;
