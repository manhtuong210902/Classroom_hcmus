import { BasicInfo, ContactInfo, EditAvatar } from "./components";
import React from "react";

const EditProfilePage: React.FC = () => {
    return (
        <div>
            <div className="flex flex-col items-center">
                <h2 className="text-4xl font-bold text-primary">Personal information</h2>
                <span className="mt-3">Information about you and your preferences on our services</span>
            </div>
            <div className="flex flex-col p-4 m-10 border max-w-[800px]  mx-auto rounded-md">
                <p className="text-base font-medium text-muted-foreground mt-1">
                    Personal information and options for managing that information. You can allow others to see some of
                    this data (such as contact information) so they can easily reach out to you. You can also view
                    summaries of your profiles.
                </p>
            </div>

            <div className="flex flex-col p-4 m-10 border max-w-[800px]  mx-auto rounded-md">
                <h2 className="text-3xl font-bold text-primary">Basic information</h2>
                <div className="flex flex-row items-center mt-4 p-5">
                    <div className="flex-1">Profile photo</div>
                    <div>
                        <EditAvatar />
                    </div>
                </div>
                <BasicInfo />
            </div>
            <div className="flex flex-col p-4 m-10 border max-w-[800px]  mx-auto rounded-md">
                <h2 className="text-3xl font-bold text-primary mb-20">Contact information</h2>
                <ContactInfo />
            </div>
        </div>
    );
};

export default EditProfilePage;
