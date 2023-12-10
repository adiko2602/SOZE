import ProfileForm from "@/components/profile/ProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

function Profile() {
  return (
    <div className="w-full flex justify-center flex-row p-2">
      <div className="max-w-lg w-full">
        <Card>
          <CardHeader>
            <CardTitle>Twój profil</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
