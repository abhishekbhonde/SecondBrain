import {  useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
// import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Instagram = "instagram", // New category
  Facebook = "facebook", // New category
  LinkedIn = "linkedin", // LinkedIn added
}

interface CreateContentModalProps {
  open: boolean; // Specifies whether the modal is open
  onClose: () => void; // Function to handle closing the modal
}

// Controlled component
export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
      "https://secondbrain-o8wu.onrender.com/api/v1/content",
      {
        link,
        title,
        type,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    onClose();
  }

  return (
    <div>
      {open && (
        <div>
          {/* Background overlay */}
          <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-60"></div>

          {/* Modal content */}
          <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center text-white">
            <div className="bg-gray-900 border-2 border-gray-700 bg-opacity-95 p-4 sm:p-6 md:p-8 rounded-lg max-w-sm w-full mx-4 shadow-xl transform transition-transform duration-300">
              {/* Close button */}
              <div className="flex justify-end">
                <div
                  onClick={onClose}
                  className="cursor-pointer text-gray-400 hover:text-white transition duration-200"
                >
                  <CrossIcon />
                </div>
              </div>

              {/* Form content */}
              <div className="space-y-4">
                {/* Title input */}
                <Input reference={titleRef} placeholder="Title" />

                {/* Link input */}
                <Input reference={linkRef} placeholder="Link" />

                {/* Content Type selection */}
                <div>
                  <h1 className="text-lg font-medium text-center sm:text-left">
                    Content Type
                  </h1>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-2">
                    <Button
                      text="Youtube"
                      variant={
                        type === ContentType.Youtube ? "primary" : "secondary"
                      }
                      onClick={() => setType(ContentType.Youtube)}
                    />
                    <Button
                      text="Twitter"
                      variant={
                        type === ContentType.Twitter ? "primary" : "secondary"
                      }
                      onClick={() => setType(ContentType.Twitter)}
                    />
                    <Button
                      text="Instagram"
                      variant={
                        type === ContentType.Instagram ? "primary" : "secondary"
                      }
                      onClick={() => setType(ContentType.Instagram)}
                    />
                    <Button
                      text="Facebook"
                      variant={
                        type === ContentType.Facebook ? "primary" : "secondary"
                      }
                      onClick={() => setType(ContentType.Facebook)}
                    />
                    <Button
                      text="LinkedIn"
                      variant={
                        type === ContentType.LinkedIn ? "primary" : "secondary"
                      }
                      onClick={() => setType(ContentType.LinkedIn)}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <Button onClick={addContent} variant="primary" text="Submit" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
