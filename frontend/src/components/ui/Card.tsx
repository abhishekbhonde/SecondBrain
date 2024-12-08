import ShareIcon from "./icons/ShareIcon";

interface CardProps {
    title: string;
    type: "youtube" | "twitter";
    link: string;
}

export function Card({ title, type, link }: CardProps) {
    return (
        <div className="max-w-72 bg-white py-4 px-4 shadow-md rounded-md border border-slate-200 h-full">
            <div className="flex justify-around">
                <div className="flex items-center ">
                    <button className="pr-2 text-slate-600">
                        <ShareIcon size="lg" />
                    </button>
                    {title}
                </div>
                <div className="flex items-center">
                    <button className="pr-2 text-slate-600">
                        <ShareIcon size="lg" />
                    </button>
                    <button className="pr-2 text-slate-600">
                            <a href="">    <ShareIcon size="lg" /></a>
                    </button>

                </div>
            </div>
            <div className="pt-4">
                <div>
                    {type == "youtube" && (
                        <iframe
                            className="w-full"
                            src={link.replace("watch", "embed").replace("?v=", "/")}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>
                <div>
                    {type == "twitter" && (
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}
                </div>
            </div>
            <div></div>
        </div>
    );
}
