import { useRef, useState } from "react";
import Button from "./Button";
import CrossIcons from "./icons/CrossIcons";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";

interface CreateContentModalProps{
    open:boolean,
    onClose:(()=>void)
}

enum ContentType  {
    Youtube="youtube",
    Twitter="twitter"
}

export function CreateContentModal({open , onClose}:CreateContentModalProps){
    const[type,setType] = useState(ContentType.Twitter)
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();

    async function AddContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        
        try {
            const response = await axios.post(
              BACKEND_URL + "api/v1/content",
              {
                link,
                title,
                type
              },
              
              {
                headers: {
                    
                  Authorization: localStorage.getItem("token"),
                },
              }
            );
            
            console.log("Content added:", response.data);
            alert("Content added successfully!");
          } catch (error) {
            console.error("Error adding content:", error);
            alert("Failed to add content.");
          }
          
    }
    return <div>
        {open && <div >
           <div className="flex justify-center w-screen h-screen top-0 left-0 fixed bg-slate-400 opacity-40 ">   </div>
           <div className="flex w-screen  items-center h-screen top-0 left-0 fixed flex-col justify-center ">
                <span className="bg-white opacity-100 p-6 rounded-lg">
                    <div className="flex justify-end">
                      <div onClick={onClose} className="cursor-pointer">
                      <CrossIcons/>
                      </div>
                   
                    </div>
                    <div>
                    <Input  reference={titleRef} placeholder={"Enter the title"} />
                    <Input reference={linkRef} placeholder={"Enter the link"} />

                    <div className="flex p-4">
                        <Button onClick={(()=>{
                            setType(ContentType.Youtube)
                        })} text="Youtube" size="lg" varient={type===ContentType.Youtube?"primary":"secondary"}/>
                        <Button onClick={(()=>{
                            setType(ContentType.Twitter)
                        })} text="Twitter" size="lg" varient={type===ContentType.Twitter?"primary":"secondary"}/>
                    </div>
                   <div className="py-2 px-4 flex justify-center">
                   <Button onClick={AddContent} text="Submit" varient="primary" size="lg"/>
                   </div>
                    </div>
                </span>
           </div>
        
        </div>}
    </div>
}
