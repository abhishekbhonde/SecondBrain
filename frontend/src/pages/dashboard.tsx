import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CreateContentModal } from "@/components/CreateContentModal";
import { HeroHighlightDemo } from "@/components/HeroHighlightDemo";
import { BACKEND_URL } from "@/config";
import { useContent } from "@/hooks/useContent";
import axios from "axios";
import { PlusIcon, ShareIcon, Sidebar } from "lucide-react";
import { useEffect, useState } from "react";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        {/* Here, you can also apply the background gradient in the Dashboard container */}
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            variant="primary"
            text="Add content"
            startIcon={<PlusIcon />}
          />
          <Button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                {
                  share: true,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareUrl);
            }}
            variant="secondary"
            text="Share brain"
            startIcon={<ShareIcon />}
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          {contents.map(({ type, link, title }) => (
            <Card type={type} link={link} title={title} />
          ))}
        </div>
      </div>
      <HeroHighlightDemo />
    </div>
  );
}
