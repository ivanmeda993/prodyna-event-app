import { toast } from "react-hot-toast";
import { Event, User } from ".prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

interface IProps {
  event: Event & { creator: User; attendees: User[] };
  currentUser?: User;
}
const useHandleLike = ({ currentUser, event }: IProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const isLiked = useMemo(() => {
    //  check and return boolean if the current user is in the attendees list

    return event?.attendees.some((attendee) => attendee.id === currentUser?.id);
  }, [currentUser?.id, event?.attendees]);

  const handleLike = useCallback(async () => {
    setIsLoading(true);
    if (!isLiked) {
      console.log("Like");
      const req = await fetch(`/api/attendees/${event.id}`, {
        method: "POST",
      })
        .then((res) => toast.success("You are now attending this event!"))
        .catch((err) => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    } else {
      console.log("unlike");
      const req = await fetch(`/api/attendees/${event.id}`, {
        method: "DELETE",
      })
        .then((res) => toast.success("You are no longer attending this event!"))
        .catch((err) => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }
    router.refresh();
  }, [event.id, isLiked, router]);

  return { handleLike, isLiked, isLoading };
};

export default useHandleLike;
