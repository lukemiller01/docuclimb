// Functional
import React from "react";

// Auth
import { cookies } from "next/headers";
import { getUserFromUsername } from "@/app/Pocketbasefunctions/getUserFromUsername";
import { getUserFromCookie } from "@/app/Pocketbasefunctions/getUserFromCookie";
import { ReadonlyRequestCookies } from "next/dist/server/app-render";

// Components
import Climb from "./Climb";
import ProfileHeader from "@/app/Components/Profile/ProfileHeader";
import NoClimbsYet from "@/app/Components/Profile/NoClimbsYet";
import AddAClimb from "@/app/Components/Profile/AddAClimb";

// Coming from Pocketbase fetch
interface Climb {
  id: string;
  grade: string;
  color: string;
  image: string;
  base64: string;
  date: string;
  username: string;
  imageUrl: string;
  uid: string;
}

// Next's built-in query parameters
interface QueryParams {
  params: {
    username: string;
  };
}

// Gets the climbs for the current profile
async function getClimbs(id: string) {
  const res = await fetch(
    "https://api.docuclimb.com/api/collections/boulders/records?page=1&perPage=30",
    { cache: "no-store" }
  );

  const data = await res.json(); // Convert response to json

  // Filter out the climbs that don't belong to the user
  var filteredData = data.items.filter((a: Climb) => a.uid === id);
  data.items = filteredData;

  return data?.items as Array<Climb>;
}

// Gets the user who the page belongs to
async function getUser(username: string) {
  const user = await getUserFromUsername(username);
  return user;
}

// Gets the currently signed in user
function getProfile() {
  const user = getUserFromCookie(cookies() as ReadonlyRequestCookies);
  return user;
}

export default async function Profile({ params }: QueryParams) {
  const usernameURL = params.username;

  // Get user's info
  const user = await getUser(usernameURL);
  const { avatar, base64 } = user || {};
  if (avatar) {
    var profile = `https://api.docuclimb.com/api/files/_pb_users_auth_/${user?.id}/${avatar}`;
  } else {
    var profile = "/avatar.svg";
  }

  // Get user's feed
  const climbs = await getClimbs(user?.id ? user?.id : "0");

  // Get currently signed in user
  const auth = getProfile();

  return (
    <div className="bg-light-grey h-full">
      <ProfileHeader
        username={usernameURL}
        profile={profile}
        first={user?.first ? user?.first : '0'}
        numClimbs={climbs.length}
        currentUser={auth?.username ? auth?.username : '0'}
        description={user?.description ? user?.description : '0'}
        base64={base64 ? base64 : '0'}
      />
      {climbs?.length === 0 ? (
        auth?.username === usernameURL ? (
          <AddAClimb currentUser={auth?.id} />
        ) : (
          <NoClimbsYet />
        )
      ) : (
        <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="mt-6 grid gap-y-4 gap-x-4 grid-cols-2 xl:gap-x-8 sm:grid-cols-3 lg:grid-cols-4 sm:gap-y-10 sm:gap-x-6">
            {climbs?.reverse().map((climb, index) => {
              return <Climb key={climb.id} climb={climb} index={index} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
