import MailPro from "@image/img_mail_pro.svg";

const Content = () => {
    return (
        <div className="grid grid-cols-4 gap-4 w-full">
            <div className="col-span-4 md:col-span-1 flex flex-col gap-4">
                <div className="rounded-lg border-border border p-4">
                    <h1 className="text-base font-semibold mb-4">Upcomming</h1>
                    <div className="flex items-center gap-4">
                        <p className="text-foreground text-xs">No work due soon</p>
                    </div>
                </div>
            </div>
            <div className="col-span-4 md:col-span-3 flex flex-col gap-4">
                <div className="rounded-lg border-border border p-4 flex items-center gap-5">
                    <img src={MailPro} alt="" className="w-28 object-cover" />
                    <div>
                        <h1 className="text-xl font-semibold mb-4">This is where you can talk to your class</h1>
                        <p className="text-foreground text-sm font-bold">
                            Use the stream to share announcements, post assignments, and respond to student questions
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;
