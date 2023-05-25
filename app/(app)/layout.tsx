import getCurrentUser from "@/app/actions/getCurrentUser";
import Navbar from "@/app/(app)/components/nav/Navbar";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <Navbar user={currentUser!} />
      {children}
    </div>
  );
};

export default AppLayout;
