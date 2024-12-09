
import { useState } from "react";
import Button from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import Plus from "../components/ui/icons/Plus";
import ShareIcon from "../components/ui/icons/ShareIcon";
import { SideBar } from "../components/ui/SideBar";

export const Dashbarod = () => {
    const [modalopen, setModalopen] = useState(false)
    return (
        <div>
            <SideBar />
            <div className="p-4 ml-72 bg-slate-100 min-h-screen border-2">
                <CreateContentModal open={modalopen} onClose={(() => {
                    setModalopen(false)
                })} />
                <div className="flex justify-end w-full">
                    <Button
                        varient="primary"
                        startIcon={<Plus size="lg" />}
                        size="lg"
                        text="add content"
                        onClick={() => {
                            setModalopen(true)
                        }}
                    />
                    <Button
                        varient="secondary"
                        startIcon={<ShareIcon size="lg" />}
                        size="lg"
                        text="Share Link"
                        onClick={() => { }}
                    />
                </div>
                <div className="flex flex-wrap pt-6 gap-3">
                    <Card title="Web vidfe" link="https://x.com/hey_ankita/status/1865275140009005469" type="twitter" />
                    <Card title="Web vidfe" link="https://www.youtube.com/watch?v=nWI00u-tivs" type="youtube" />
                </div>
            </div>
        </div>
    )
}

export default Dashbarod
