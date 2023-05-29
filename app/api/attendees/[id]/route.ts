import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";

interface IParams {
  id?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { id } = params;

  if (!id || typeof id !== "string") {
    throw new Error("Invalid ID");
  }

  const updatedEvent = await prismadb.event.update({
    where: {
      id,
    },
    data: {
      attendees: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  });

  return NextResponse.json(updatedEvent);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { id } = params;

  if (!id || typeof id !== "string") {
    throw new Error("Invalid ID");
  }

  const updatedEvent = await prismadb.event.update({
    where: {
      id,
    },
    data: {
      attendees: {
        disconnect: {
          id: currentUser.id,
        },
      },
    },
  });

  return NextResponse.json(updatedEvent);
}
