import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";

const secret = process.env.NEXTAUTH_SECRET;
export async function POST(req: NextRequest, response: NextResponse) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();

  const {
    title,
    shortDescription,
    longDescription,
    location,
    image,
    type,
    eventStartDate,
    eventEndDate,
    submissionEndDate,
  } = body;

  console.log("Request body", body);
  if (
    !title ||
    !shortDescription ||
    !longDescription ||
    !location ||
    !type ||
    !eventStartDate
  ) {
    return NextResponse.error();
  }

  const event = await prismadb.event.create({
    data: {
      title,
      shortDescription,
      longDescription,
      location,
      image,
      type,
      eventStartDate,
      eventEndDate: eventEndDate ? eventEndDate : eventStartDate,
      submissionEndDate: submissionEndDate ? +submissionEndDate : 0,
      creatorId: currentUser.id,
    },
  });

  return NextResponse.json(event);
}
