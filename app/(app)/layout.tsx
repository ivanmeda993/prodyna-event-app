import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  console.log("SESSION", session?.user?.name);
  return (
    <div className="h-full">
      <div>App Layout</div>
      {children}
    </div>
  );
};

export default AppLayout;
