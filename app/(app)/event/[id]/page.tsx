import getEventById from "@/app/actions/getEventById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/(app)/components/EmptyState";
import EventDetails from "@/app/(app)/event/[id]/components/EventDetails";
import { Suspense } from "react";

interface IParams {
  id?: string;
}

export async function generateMetadata({ params }: { params: IParams }) {
  const event = await getEventById(params);

  return {
    title: event?.title || "Event not found",
    description: event?.shortDescription || "",
  };
}
const EventDetailsPage = async ({ params }: { params: IParams }) => {
  const [eventData, currentUser] = await Promise.all([
    getEventById(params),
    getCurrentUser(),
  ]);

  if (!eventData) {
    return <EmptyState title="Event not found" />;
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetails currentUser={currentUser} eventData={eventData!} />
      </Suspense>
    </>
  );
};

export default EventDetailsPage;
