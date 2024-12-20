import { ReactElement } from "react";

export function SidebarItem({ text, icon }: { text: string; icon: ReactElement }) {
    return (
      <div className="flex text-gray-300 py-2 cursor-pointer hover:bg-purple-600 hover:text-white rounded-md max-w-48 pl-4 transition-all duration-200">
        <div className="pr-2">{icon}</div>
        <div>{text}</div>
      </div>
    );
  }
  