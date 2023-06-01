import prismadb from "@/app/libs/prismadb";

export default async function getUserCreatedEvents(creatorId: string) {
  // TODO remove this line after presentation
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const events = await prismadb.event.findMany({
      where: {
        creatorId,
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
