import { NextResponse } from "next/server";
import prismadb from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Prisma } from "@prisma/client";
interface IParams {
  id?: string;
}
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const { id } = params;
    if (!id || typeof id !== "string") {
      throw new Error("Invalid ID");
    }

    const users = await prismadb.user.findMany({
      where: {
        attendedEventIds: {
          hasSome: [id],
        },
      },
    });

    await Promise.all(
      users.map(
        async (user) =>
          await prismadb.user.update({
            where: {
              id: user.id,
            },
            data: {
              attendedEventIds: {
                set: user.attendedEventIds.filter((eventId) => eventId !== id),
              },
              attendedEvents: {
                disconnect: {
                  id: id,
                },
              },
            },
          })
      )
    );
    const event = await prismadb.event.deleteMany({
      where: {
        id: id,
        creatorId: currentUser.id,
      },
    });

    return NextResponse.json({ test: "test" });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
