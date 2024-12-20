import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({ open, onClose }) {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });

        onClose();
    }

    return (
        <div>
            {open && (
                <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
                </div>
            )}
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
                <div className="flex flex-col justify-center p-6">
                    <span className="bg-gray-800 text-white opacity-100 p-4 rounded-md fixed">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        <div>
                            <Input reference={titleRef} placeholder="Title" className="bg-gray-700 text-white" />
                            <Input reference={linkRef} placeholder="Link" className="bg-gray-700 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-medium">Type</h1>
                            <div className="flex gap-1 justify-center pb-2">
                                <Button
                                    text="Youtube"
                                    variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                    onClick={() => setType(ContentType.Youtube)}
                                />
                                <Button
                                    text="Twitter"
                                    variant={type === ContentType.Twitter ? "primary" : "secondary"}
                                    onClick={() => setType(ContentType.Twitter)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={addContent} variant="primary" text="Submit" startIcon={undefined} />
                        </div>
                    </span>
                </div>
            </div>
        </div>
    );
}
