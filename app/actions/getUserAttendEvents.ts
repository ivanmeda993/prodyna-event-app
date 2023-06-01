import prismadb from "@/app/libs/prismadb";

export default async function getUserAttendedEvents(creatorId: string) {
  try {
    const events = await prismadb.event.findMany({
      where: {
        attendees: {
          some: {
            id: creatorId,
          },
        },
      },
      include: {
        creator: true,
        attendees: true,
      },
    });
    return events;
  } catch (e: any) {
    throw new Error(e);
  }
}
