import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}
const CategoryBox = ({ icon: Icon, label, selected }: CategoryBoxProps) => {
  // useNextRouter hook from Next.js for handling client-side routing
  const router = useRouter();
  // useSearchParams hook from Next.js for handling URL query params
  const params = useSearchParams();
  // function that handles category box click events
  const handleClick = useCallback(() => {
    // get the current query params from the URL
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    // update the query params with the selected category
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    // if the same category is clicked twice, remove it from the query params
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }
    // stringify the updated URL with query params
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    // trigger a page reload with the updated URL
    router.push(url);
  }, [label, router, params]);
  // render the category box with icon and label
  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        pt-4
        flex-col 
        items-center 
        justify-center 
        gap-1
        p-2
        border-b-2
        hover:text-lime-500
        transition
        cursor-pointer
        ${
          selected
            ? "text-lime-500 border-b-lime-500"
            : "border-transparent text-neutral-700"
        }
      `}
    >
      <Icon size={23} />
      <div className="font-medium text-sm hidden md:inline">{label}</div>
    </div>
  );
};
export default CategoryBox;
