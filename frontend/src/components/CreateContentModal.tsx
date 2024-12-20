import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Instagram = "instagram",  // New category
  Facebook = "facebook",    // New category
  LinkedIn = "linkedin"    // LinkedIn added
}

// controlled component
export function CreateContentModal({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        link,
        title,
        type
      },
      {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }
    );

    onClose();
  }

  return (
    <div>
      {open && (
        <div>
          {/* Background overlay */}
          <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-60 flex justify-center "></div>

          {/* Modal content */}
          <div className="w-screen h-screen fixed top-0 left-0 text-white flex justify-center items-center">
            <div className="flex justify-center items-center w-full h-full">
              <span className="bg-gray-900 border-2 border-gray-700 bg-opacity-95 p-8 rounded-lg max-w-md w-full shadow-xl transform transition-transform duration-300 hover:scale-105">
                <div className="flex justify-end">
                  <div
                    onClick={onClose}
                    className="cursor-pointer text-gray-400 hover:text-white transition duration-200"
                  >
                    <CrossIcon />
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Title input */}
                  <Input
                    reference={titleRef}
                    placeholder="Title"
                  />

                  {/* Link input */}
                  <Input
                    reference={linkRef}
                    placeholder="Link"
                  />

                  {/* Content Type selection */}
                  <div>
                    <h1 className="text-lg m-4 font-medium">Content Type</h1>
                    <div className="grid grid-cols-2 gap-4 pb-2"> {/* Create a 2-column grid */}
                      <Button
                        text="Youtube"
                        variant={type === ContentType.Youtube ? "primary" : "secondary"}
                        onClick={() => {
                          setType(ContentType.Youtube);
                        }}
                        className="w-full" // Full width
                      />
                      <Button
                        text="Twitter"
                        variant={type === ContentType.Twitter ? "primary" : "secondary"}
                        onClick={() => {
                          setType(ContentType.Twitter);
                        }}
                        className="w-full" // Full width
                      />
                      <Button
                        text="Instagram"
                        variant={type === ContentType.Instagram ? "primary" : "secondary"}
                        onClick={() => {
                          setType(ContentType.Instagram);
                        }}
                        className="w-full" // Full width
                      />
                      <Button
                        text="Facebook"
                        variant={type === ContentType.Facebook ? "primary" : "secondary"}
                        onClick={() => {
                          setType(ContentType.Facebook);
                        }}
                        className="w-full" // Full width
                      />
                      <Button
                        text="LinkedIn"
                        variant={type === ContentType.LinkedIn ? "primary" : "secondary"}
                        onClick={() => {
                          setType(ContentType.LinkedIn);
                        }}
                        className="w-full" // Full width
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <Button
                      onClick={addContent}
                      variant="primary"
                      text="Submit"
                    />
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
