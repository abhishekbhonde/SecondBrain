import { LinkedinIcon } from "@/icons/LinkedinIcon";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { InstaIcon } from "@/icons/InstaIcon";
import { Facebook } from "@/icons/Facebook";
import { useState } from "react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button
        className="fixed top-4 left-4 z-50 text-white bg-purple-600 p-2 rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      <div
        className={`h-screen bg-gray-900 text-white border-r w-72 fixed top-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 z-40`}
      >
        <div className="flex text-2xl pt-8 items-center pl-6">
          <div className="pr-2 text-purple-600">
            <Logo />
          </div>
          Brainly
        </div>
        <div className="pt-8 pl-10">
          <SidebarItem text="Twitter" icon={<TwitterIcon />} />
          <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
          <SidebarItem text="Linkedin" icon={<LinkedinIcon />} />
          <SidebarItem text="Instagram" icon={<InstaIcon />} />
          <SidebarItem text="Facebook" icon={<Facebook />} />
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
