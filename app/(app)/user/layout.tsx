import Navbar from "@/app/(app)/components/nav/Navbar";
import getCurrentUser from "@/app/actions/getCurrentUser";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      {children}
      <footer>Ovo je footer</footer>
    </div>
  );
};

export default UserLayout;
