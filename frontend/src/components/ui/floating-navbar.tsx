"use client";
import { Link } from "react-router-dom"; // Importing Link from react-router-dom
import { cn } from "@/lib/utils"; // Assuming this is a utility function for classNames

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "fixed top-10 left-1/2 transform -translate-x-1/2 z-[5000] flex items-center justify-center space-x-4 px-8 py-2 dark:bg-black border dark:border-white/[0.2] rounded-full shadow-md", // Removed bg-white
        className
      )}
    >
      {navItems.map((navItem, idx) => (
        <Link
          key={`link=${idx}`}
          to={navItem.link}
          className={cn(
            "relative dark:text-neutral-50 items-center flex space-x-1 text-white  hover:text-neutral-500"
          )}
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="hidden sm:block text-sm">{navItem.name}</span>
        </Link>
      ))}
      <button className="border text-sm font-medium relative border-slate-600 border-white/[0.2] text-black text-white px-4 py-2 rounded-full">
        <span>Login</span>
        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
      </button>
    </div>
  );
};
