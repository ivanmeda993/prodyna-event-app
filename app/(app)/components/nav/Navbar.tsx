import { User } from ".prisma/client";
import Container from "@/app/components/Container";
import Logo from "@/app/(app)/components/Logo";
import Search from "@/app/(app)/components/nav/Search";
import UserMenu from "@/app/(app)/components/nav/UserMenu";
import Categories from "@/app/(app)/components/nav/Categories";

interface INavbar {
  user: User;
}
const Navbar = ({ user }: INavbar) => {
  return (
    <div className="w-full  z-10 shadow-sm ">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            {/*<Search />*/}
            <h2 className="text-lg font-semibold text-black/70 uppercase">
              Prodyna Events
            </h2>
            <UserMenu currentUser={user} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
