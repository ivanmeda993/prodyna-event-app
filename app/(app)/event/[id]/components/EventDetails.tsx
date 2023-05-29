"use client";
import { Event, User } from ".prisma/client";
import Heading from "@/app/(app)/components/Heading";
import Container from "@/app/components/Container";
import Image from "next/image";
import AttendButton from "@/app/(app)/components/AttendButton";
import { format } from "date-fns";
import Avatar from "@/app/components/Avatar";
import CategoryInput from "@/app/(app)/components/inputs/CategoryInput";
import { useMemo } from "react";
import { categories } from "@/app/(app)/components/nav/Categories";
import EventCategoryView from "@/app/(app)/components/EventCategory";
import { BiMapAlt } from "react-icons/bi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import * as http2 from "http2";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Button from "@/app/(app)/components/Button";
import useEventModal from "@/app/hooks/modal/useEventModal";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
interface IEventDetails {
  eventData: Event & { creator: User; attendees: User[] };
  currentUser: User | null;
}
export default function EventDetails({
  eventData,
  currentUser,
}: IEventDetails) {
  const router = useRouter();
  console.log("eventData: ", eventData);

  const { onEdit } = useEventModal();

  const eventType = useMemo(() => {
    return categories.find((category) => category.label === eventData.type);
  }, [eventData.type]);

  const isAttendee = useMemo(() => {
    return eventData.attendees.some(
      (attendee) => attendee.id === currentUser?.id
    );
  }, [eventData.attendees, currentUser]);

  const isCreator = useMemo(() => {
    return eventData.creator.id === currentUser?.id;
  }, [eventData.creator, currentUser]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/event/${eventData.id}`);

      toast.success("Event deleted successfully");
      router.refresh();
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="py-12">
      <Container>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Heading
              title={eventData.title!}
              subtitle={eventData.shortDescription!}
            />
            {isCreator && (
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => onEdit(eventData)}
                  label="Edit"
                  icon={AiOutlineEdit}
                />
                <Button
                  label="Delete"
                  icon={AiOutlineDelete}
                  danger
                  onClick={handleDelete}
                />
              </div>
            )}
          </div>
          <div className="w-full h-[60vh] overflow-hidden rounded-xl relative ">
            <Image
              src={eventData.image || "/images/no-image.png"}
              alt="Event"
              fill
              className="object-cover"
            />
          </div>
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-7
              md:gap-10
              mt-6
            "
          >
            <div className="col-span-4 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div
                  className="
                  text-xl
                  font-semibold
                  flex
                  flex-row
                  items-center
                  gap-2
          "
                >
                  <div>Created by {eventData.creator?.name}</div>
                  <Avatar user={eventData.creator} />
                </div>
              </div>
              <hr />
              <EventCategoryView
                label={eventType?.label!}
                icon={eventType?.icon!}
                description={eventType?.description!}
              />
              <hr />
              <EventCategoryView
                label="Location"
                icon={BiMapAlt}
                description={eventData.location!}
              />{" "}
              <hr />
              <EventCategoryView
                label="Date"
                icon={IoCalendarNumberOutline}
                description={format(
                  new Date(eventData.eventStartDate!),
                  "dd MMM yyyy HH:mm"
                )}
              />
              <hr />
              <EventCategoryView
                label="Description"
                icon={BsInfoCircle}
                description={eventData.longDescription!}
              />
            </div>
            <div
              className="
                order-first
                mb-10
                md:order-last
                md:col-span-3
              "
            >
              <div className="px-12 py-4 border-[1px] border-neutral-200 rounded-xl shadow-md">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Attendees:</h2>
                  <div className="flex flex-col gap-2">
                    {eventData.attendees.map((attendee) => (
                      <div
                        key={attendee.id}
                        className="flex flex-row items-center gap-2"
                      >
                        <Avatar user={attendee} />
                        <div>{attendee.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-neutral-600 text-sm items-center">
                  {isAttendee ? (
                    <span>You are attending this event</span>
                  ) : (
                    <span>You are not attending this event</span>
                  )}
                  <AttendButton
                    event={eventData}
                    currentUser={currentUser!}
                    large
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
