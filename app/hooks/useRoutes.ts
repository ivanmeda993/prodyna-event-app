import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import { AiOutlineSetting } from "react-icons/ai";
import { RiFolderUserLine } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";

const useRoutes = () => {
  const pathname = usePathname();

  return useMemo(
    () => [
      {
        label: "Settings",
        href: "/dashboard",
        icon: AiOutlineSetting,
        active: pathname === "/dashboard",
      },
      {
        label: "Created Events",
        href: "/dashboard/created",
        icon: RiFolderUserLine,
        active: pathname === "/dashboard/created",
      },
      {
        label: "Attends Events",
        href: "/dashboard/attends",
        icon: IoCalendarNumberOutline,
        active: pathname === "/dashboard/attends",
      },
      // {
      //   label: "Sign Out",
      //   href: "#",
      //   onClick: () => signOut(),
      //   icon: HiArrowLeftOnRectangle,
      // },
    ],
    [pathname]
  );
};

export default useRoutes;
