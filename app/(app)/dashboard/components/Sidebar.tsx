import DesktopSidebar from "@/app/(app)/dashboard/components/DesktopSidebar";
import MobileSidebar from "@/app/(app)/dashboard/components/MobileSidebar";
import { User, Event } from ".prisma/client";

interface SidebarProps {
  children: React.ReactNode;
  currentUser:
    | (User & { createdEvents: Event[]; attendedEvents: Event[] })
    | null;
}
export default function Sidebar({ children }: SidebarProps) {
  return (
    <div className="h-full pt-24 relative">
      <DesktopSidebar />
      <MobileSidebar />
      <main className="lg:pl-72 h-full">{children}</main>
    </div>
  );
}
