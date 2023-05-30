import getEventById from "@/app/actions/getEventById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/(app)/components/EmptyState";
import EventDetails from "@/app/(app)/event/[id]/components/EventDetails";
import { Suspense } from "react";

export const revalidate = 5;
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
    <div className="pt-12 md:pt-0">
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetails currentUser={currentUser} eventData={eventData!} />
      </Suspense>
    </div>
  );
};

export default EventDetailsPage;
