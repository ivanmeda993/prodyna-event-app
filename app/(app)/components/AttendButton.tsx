"use client";
import { Event, User } from ".prisma/client";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import useHandleLike from "@/app/hooks/useHandleLike";

interface IAttendButton {
  event: Event & { creator: User; attendees: User[] };
  currentUser?: User;
  large?: boolean;
}
export default function AttendButton({
  currentUser,
  event,
  large,
}: IAttendButton) {
  const { isLiked, handleLike, isLoading } = useHandleLike({
    event,
    currentUser,
  });

  return (
    <button
      disabled={isLoading}
      onClick={handleLike}
      className={`ml-auto hover:text-lime-500 hover:scale-110 transition duration-200 ease-in-out ${
        isLiked && "text-lime-500"
      } ${isLoading && "animate-pulse"} `}
    >
      {isLiked ? (
        <AiFillLike size={large ? 32 : 24} />
      ) : (
        <AiOutlineLike size={large ? 32 : 24} />
      )}
    </button>
  );
}
