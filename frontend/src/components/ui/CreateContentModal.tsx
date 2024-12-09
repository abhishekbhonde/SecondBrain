import Button from "./Button";
import CrossIcons from "./icons/CrossIcons";
import { Input } from "./Input";

interface CreateContentModalProps{
    open:boolean,
    onClose:(()=>void)
}


export function CreateContentModal({open , onClose}:CreateContentModalProps){
    return <div>
        {open && <div className="flex justify-center w-screen h-screen top-0 left-0 fixed bg-slate-400 opacity-40 ">
           <div className="flex flex-col justify-center ">
                <span className="bg-white opacity-100 p-6 rounded-lg">
                    <div className="flex justify-end">
                      <div onClick={onClose} className="cursor-pointer">
                      <CrossIcons/>
                      </div>
                   
                    </div>
                    <div>
                    <Input placeholder={"Enter the title"} />
                    <Input placeholder={"Enter the link"} />
                   <div className="py-2 px-4 flex justify-center">
                   <Button text="Submit" varient="primary" size="lg"/>
                   </div>
                    </div>
                </span>
           </div>
        </div>}
    </div>
}
