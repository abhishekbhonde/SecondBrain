import BrainIcon from "./icons/BrainIcon";
import TwitterIcon from "./icons/TwitterIcon";
import YouTubeIcon from "./icons/YouTubeIcon";
import { SideBarItem } from "./SideBarItem";

export function SideBar() {
    return <div className="border-r border min-h-screen w-72 fixed left-0 top-0  ">
        <div className="p-7 flex items-center ">
            <div className="flex">
                <BrainIcon />
            </div>
            <div className="text-[26px] pl-3 font-bold text-black">SecondBrain</div>
        </div>
        <div className="flex flex-col gap-5 pl-2 pr-2">
            <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all duration-400 delay-2000">
                <SideBarItem icon={<TwitterIcon />} text="Twitter" />
            </div>
            <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all duration-400 delay-2000">
                <SideBarItem icon={<YouTubeIcon />} text="Youtube" />
            </div>
        </div>
    </div>
}