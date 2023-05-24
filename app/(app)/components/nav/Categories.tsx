"use client";

import { usePathname, useSearchParams } from "next/navigation";
import CategoryBox from "@/app/(app)/components/CategoryBox";
import Container from "@/app/components/Container";

import { MdFastfood, MdSportsBasketball } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { ImBook } from "react-icons/im";
import { AiFillPicture } from "react-icons/ai";

export const categories = [
  {
    label: "Team Building",
    icon: RiTeamFill,
    description: "This property is close to the beach!",
  },
  {
    label: "Sport",
    icon: MdSportsBasketball,
    description: "This property is has windmills!",
  },
  {
    label: "Workshop",
    icon: ImBook,
    description: "Knowledge Sharing",
  },
  {
    label: "Food/Drink",
    icon: MdFastfood,
    description: "This property is in the countryside!",
  },
  {
    label: "Art",
    icon: AiFillPicture,
    description: "This is property has a beautiful pool!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const category = params?.get("category");
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          flex
          flex-row
          items-center
          justify-evenly
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
