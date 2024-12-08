import { ReactElement } from "react"

interface SideBarItemProps {
    text: string,
    icon: ReactElement
}

export function SideBarItem({ text, icon }: SideBarItemProps) {
    return <div>
        <div className="flex pl-7">
           <div>
           <span className="text-slate-700">{icon}</span>
           </div>
            <div>
            <span className="text-xl pl-3 font-[500] text-slate-700">{text}</span>
            </div>
        </div>
    </div>
}