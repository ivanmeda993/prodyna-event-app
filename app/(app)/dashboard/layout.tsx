import Navbar from "@/app/(app)/components/nav/Navbar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Sidebar from "@/app/(app)/dashboard/components/Sidebar";

export const metadata = {
  title: `Dashboard `,
  description: "Dashboard",
};
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <Sidebar currentUser={currentUser}>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default DashboardLayout;
