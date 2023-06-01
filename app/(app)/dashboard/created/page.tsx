import getCurrentUser from "@/app/actions/getCurrentUser";
import Heading from "@/app/(app)/components/Heading";
import Container from "@/app/components/Container";
import { Suspense } from "react";
import EventsList from "@/app/(app)/dashboard/components/EventsList";

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
        <Heading
          title={`
        Created ${created?.length} events  by you ${currentUser?.name}`}
          subtitle="List of all created events"
        />
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
            {/* @ts-expect-error Server Component */}
            <EventsList createdEvents currentUser={currentUser!} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default Created;
