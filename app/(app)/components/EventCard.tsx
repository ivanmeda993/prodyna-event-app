"use client";
import Image from "next/image";
import Button from "@/app/(app)/components/Button";
import { User, Event } from ".prisma/client";
import Link from "next/link";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import useHandleLike from "@/app/hooks/useHandleLike";
import AttendButton from "@/app/(app)/components/AttendButton";

interface EventCardProps {
  event: Event & { creator: User; attendees: User[] };
  currentUser?: User;
}

const EventCard = ({ currentUser, event }: EventCardProps) => {
  return (
    <div className="col-span-1">
      <div className="card w-full glass">
        <figure
          className="
            aspect-square
            w-full
            relative
            overflow-hidden
            "
        >
          <Image
            fill
            className="
              object-cover
              h-full
              w-full
              hover:scale-110
              transition
              duration-300
              ease-in-out
            "
            src={event.image ? event.image : "/images/no-image.png"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Event"
          />
        </figure>
        <div className=" p-3 pb-5 flex flex-col gap-2">
          <div>
            <h2 className="text-lg font-semibold truncate">{event.title}</h2>
            <p>{event.shortDescription}</p>
          </div>
          <span className="text-sm text-neutral-500">
            Created by : {event.creator.name}
          </span>
          <div className="flex items-center justify-between">
            <span
              className={`${
                event.attendees.length === 0 ? "hidden" : "inline-flex"
              } text-sm text-neutral-500`}
            >
              {event.attendees.length}{" "}
              {event.attendees.length === 1 ? "person" : "people"} attending
            </span>

            <AttendButton event={event} currentUser={currentUser} />
          </div>
          <Link
            href={`/event/${event.id}`}
            className="card-actions justify-end"
          >
            <Button label="Deatils" fullWidth />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
