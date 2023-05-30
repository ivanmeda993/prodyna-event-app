import Navbar from "@/app/(app)/components/nav/Navbar";
import getCurrentUser from "@/app/actions/getCurrentUser";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <Navbar user={currentUser!} />
      <div className="pt-4 pb-24  md:pt-24">{children}</div>
    </div>
  );
};

export default AppLayout;
