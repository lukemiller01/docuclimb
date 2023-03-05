// Functional
import React from "react";
import { cookies } from "next/headers";
import { getUserFromCookie } from "@/app/Pocketbasefunctions/getUserFromCookie";
import { getUserFromId } from "@/app/Pocketbasefunctions/getUserFromId";
import { ReadonlyRequestCookies } from "next/dist/server/app-render";

// Components
import ModifyProfile from "@/app/Components/EditProfile/ModifyProfile";
import ResetCredentials from "@/app/Components/EditProfile/ResetCredentials";
import DeleteAccount from "@/app/Components/EditProfile/DeleteAccount";

// Allows user to change their account
export default async function Edit() {
  const token = cookies().get("pb_auth");

  const user = getUserFromCookie(cookies() as ReadonlyRequestCookies);
  const { id, username, email } = user || {};

  // Avatar isn't stored in cookies. Need Pocketbase function:
  const userModel = await getUserFromId(id ? id : "0");

  // If the user doesn't have an avatar, load the default
  if (userModel?.avatar) {
    var profile = `https://api.docuclimb.com/api/files/_pb_users_auth_/${id}/${userModel?.avatar}`;
  } else {
    var profile = "/avatar.svg";
  }

  // ModifyProfile: Change username/firstname/description
  // ResetCredentials: sends transactional email to change email/password
  // DeleteAccount: button to delete the account
  return (
    <>
      <ModifyProfile
        id={id? id : '0'}
        username={username? username : '0'}
        first={userModel?.first ? userModel?.first : '0'}
        description={userModel?.description ? userModel?.description : '0'}
        profile={profile}
      />
      <ResetCredentials email={email? email : '0'} />
      <DeleteAccount id={id ? id : '0'} />
    </>
  );
}
