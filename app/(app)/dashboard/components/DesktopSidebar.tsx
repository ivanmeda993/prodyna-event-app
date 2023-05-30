"use client";
import useRoutes from "@/app/hooks/useRoutes";
import DesktopItem from "@/app/(app)/dashboard/components/DesktopItem";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";
interface IDesktopSidebar {
  data?: any;
}
export default function DesktopSidebar({}: IDesktopSidebar) {
  const routes = useRoutes();
  return (
    <div className="hidden lg:fixed lg:top-[80px] lg:bottom-0 lg:left-0 lg:z-40 lg:w-64 xl:px-1 lg:overflow-y-auto lg:bg-white lg:pt-1 lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between ">
      <nav className="flex flex-col justify-between  h-full">
        <ul role="list" className="flex-col flex space-y-1">
          {routes.map((route) => (
            <DesktopItem
              key={route.label}
              href={route.href}
              label={route.label}
              icon={route.icon}
              active={route.active}
            />
          ))}
        </ul>
        <DesktopItem
          href="#"
          label="Sing Out"
          icon={HiArrowLeftOnRectangle}
          onClick={() => signOut()}
        />
      </nav>
    </div>
  );
}
