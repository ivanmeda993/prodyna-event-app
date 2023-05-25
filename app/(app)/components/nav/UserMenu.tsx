"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "@/app/components/Avatar";
import { User } from ".prisma/client";
import { BsPlus } from "react-icons/bs";
import useEventModal from "@/app/hooks/modal/useLoginModal";

interface UserMenuProps {
  currentUser?: User;
}

export default function UserMenu({ currentUser }: UserMenuProps) {
  const { onOpen } = useEventModal();
  return (
    <div className="relative">
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex items-center gap-3">
          <Menu.Button className="flex items-center gap-3 rounded-full p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 hover:shadow-md transition">
            <AiOutlineMenu size={18} />
            <div className="hidden md:block">
              <Avatar user={currentUser} />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <button
                  onClick={onOpen}
                  className={` group flex w-full items-center rounded-md gap-1 px-2 py-2 text-sm hover:bg-lime-500 hover:text-white`}
                >
                  <BsPlus size={18} />
                  Create Event
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
