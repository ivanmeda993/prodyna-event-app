import prismadb from "@/app/libs/prismadb";

export interface IEventsParams {
  creatorId?: string;
  type?: string;
}

export default async function getEvents(params: IEventsParams) {
  const { creatorId, type } = params;
  let query: any = {};
  if (creatorId) {
    query.creatorId = creatorId;
  }
  if (type) {
    query.type = type;
  }
  try {
    const events = await prismadb.event.findMany({
      where: query,
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
