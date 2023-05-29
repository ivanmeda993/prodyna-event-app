"use client";

import { usePathname, useSearchParams } from "next/navigation";
import CategoryBox from "@/app/(app)/components/CategoryBox";
import Container from "@/app/components/Container";

import { MdFastfood, MdSportsBasketball } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { ImBook } from "react-icons/im";
import { FaTheaterMasks } from "react-icons/fa";

export const categories = [
  {
    label: "Team Building",
    icon: RiTeamFill,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    label: "Sport",
    icon: MdSportsBasketball,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    label: "Workshop",
    icon: ImBook,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    label: "Food/Drink",
    icon: MdFastfood,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    label: "Entertainment",
    icon: FaTheaterMasks,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const type = params?.get("type");
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
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={type === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
