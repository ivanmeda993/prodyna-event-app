"use client";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "@/app/(app)/dashboard/components/MobileItem";

interface IMobileSidebar {
  data?: any;
}
export default function MobileSidebar({}: IMobileSidebar) {
  const routes = useRoutes();
  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          href={route.href}
          icon={route.icon}
          active={route.active}
        />
      ))}
    </div>
  );
}
