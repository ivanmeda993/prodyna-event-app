"use client";

import { useSearchParams } from "next/navigation";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const params = useSearchParams();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const typeLocation = "Any type";

  const locationLabel = "Any location";

  const dateLabel = "Any date";

  return (
    <div
      className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
      "
    >
      <div
        className="
          flex
          flex-row
          items-center
          justify-between
        "
      >
        <div
          className="
            text-sm
            font-semibold
            px-6
          "
        >
          {locationLabel}
        </div>
        <div
          className="
            hidden
            sm:block
            text-sm
            font-semibold
            px-6
            border-x-[1px]
            flex-1
            text-center
          "
        >
          {dateLabel}
        </div>
        <div
          className="
            text-sm
            pl-6
            pr-2
            text-gray-600
            flex
            flex-row
            items-center
            gap-3
          "
        >
          <div className="hidden sm:block">{typeLocation}</div>
          <div
            className="
              p-2
              bg-lime-500
              rounded-full
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
