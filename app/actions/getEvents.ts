import prismadb from "@/app/libs/prismadb";

export default async function getEvents() {
  try {
    const events = await prismadb.event.findMany({
      orderBy: {
        createdAt: "desc",
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
