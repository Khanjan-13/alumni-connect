import PersonalInfo from "@/components/webComponents/profile/ProfileDetails";
import ProfileNavbar from "@/components/webComponents/profile/ProfileNavbar";
import React from "react";

function Profile() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 lg:p-8 ">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-[250px_1fr] mt-24">
            <ProfileNavbar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
