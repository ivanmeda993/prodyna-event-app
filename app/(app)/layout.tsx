import Navbar from "@/app/(app)/components/nav/Navbar";
import getCurrentUser from "@/app/actions/getCurrentUser";

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
