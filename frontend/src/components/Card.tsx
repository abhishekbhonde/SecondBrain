"use client";
import { useState, useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { CrossIcon } from "../icons/CrossIcon"; // Import CrossIcon

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "instagram" | "facebook" | "linkedin"; // Added LinkedIn type
}

export function Card({ title, link, type }: CardProps) {
  const [isVisible, setIsVisible] = useState(true); // State to track card visibility

  // Function to dynamically load the Instagram embed script
  const loadInstagramEmbed = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(script);
  };

  // Function to dynamically load LinkedIn embed script
  const loadLinkedInEmbed = () => {
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/in.js";
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (type === "instagram") {
      loadInstagramEmbed(); // Load the Instagram embed script only when the type is Instagram
    }
    if (type === "linkedin") {
      loadLinkedInEmbed(); // Load the LinkedIn embed script only when the type is LinkedIn
    }
  }, [type]);

  // Handle the close button click
  const handleClose = () => {
    setIsVisible(false); // Hide the card when the cross icon is clicked
  };

  if (!isVisible) return null; // Don't render the card if it's not visible

  return (
    <div className="p-4 bg-gray-900 text-white rounded-md border border-gray-700 max-w-72 min-h-48 w-full mx-auto sm:w-80 sm:max-w-none">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex items-center text-sm sm:text-md text-gray-300">
          <div className="text-gray-500 pr-2">
            <ShareIcon />
          </div>
          {title}
        </div>
        <div className="flex justify-between sm:ml-4 items-center pt-3 sm:pt-0">
          <div className="pr-2 text-gray-500">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <ShareIcon />
            </a>
          </div>
          <div
            className="cursor-pointer text-gray-500"
            onClick={handleClose} // On click, remove the card
          >
            <CrossIcon />
          </div>
        </div>
      </div>

      <div className="pt-4">
        {/* YouTube Content */}
        {type === "youtube" && (
          <iframe
            className="w-full max-w-full"
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {/* Twitter Content */}
        {type === "twitter" && (
          <blockquote className="twitter-tweet w-full">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}

        {/* Instagram Content */}
        {type === "instagram" && (
          <blockquote className="instagram-media w-full" data-instgrm-permalink={link}>
            <a href={link}></a>
          </blockquote>
        )}

        {/* Facebook Content */}
        {type === "facebook" && (
          <div className="fb-post w-full" data-href={link} data-width="500"></div>
        )}

        {/* LinkedIn Content */}
        {type === "linkedin" && (
          <div className="linkedin-post w-full" data-href={link}>
            <script type="IN/Share" data-url={link}></script>
          </div>
        )}
      </div>
    </div>
  );
}
