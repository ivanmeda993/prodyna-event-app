import prisma from "@/app/libs/prismadb";

interface IParams {
  id?: string;
}

export default async function getEventById(params: IParams) {
  try {
    const { id } = params;

    const listing = await prisma.event.findUnique({
      where: {
        id: id,
      },
      include: {
        creator: true,
        attendees: true,
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
