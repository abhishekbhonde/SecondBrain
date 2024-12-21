"use client";

import { FloatingNav } from "./ui/floating-navbar";
import { HomeIcon, UserIcon, HeartIcon } from "@heroicons/react/24/outline"; // Import Heroicons

export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon className="h-4 w-4 text-neutral-500 dark:text-white" />, // Home icon from Heroicons
    },
    {
      name: "About",
      link: "/about",
      icon: <UserIcon className="h-4 w-4 text-neutral-500 dark:text-white" />, // User icon from Heroicons
    },
    {
      name: "Contact",
      link: "/contact",
      icon: < HeartIcon className="h-4 w-4 text-neutral-500 dark:text-white" />, // Chat icon from Heroicons
    },
  ];

  return (
    <div>
      <FloatingNav navItems={navItems} />
      <DummyContent />
    </div>
  );
}

const DummyContent = () => {
  return (
   <div></div>
  );
};
