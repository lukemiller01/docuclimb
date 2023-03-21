// Functional
import React from "react";
import Image from "next/image";
import Link from "next/link";

// Icons
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

interface Profile {
  username: string;
  profile: string;
  first: string;
  numClimbs: number;
  currentUser: string;
  description: string;
  base64: string;
}

const ProfileHeader = ({
  username,
  profile,
  first,
  numClimbs,
  currentUser,
  description,
  base64,
}: Profile) => {
  return (
    <div className="flex items-start sm:items-center justify-center py-4 sm:py-8 flex-col px-4">
      <div>
        <div className="flex flex-row">
          <div className="object-center mr-4">
            <div className="w-24 h-24 relative">
              <Image
                src={profile}
                alt="profile"
                fill
                sizes="20vw"
                className="object-cover rounded-[50%]"
                priority={true}
                placeholder="blur"
                blurDataURL={`${base64}`}
              ></Image>
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-4">
            <div className="text-gray-800 flex flex-row gap-5 sm:flex-row items-center">
              <p className="text-2xl">{username}</p>
              {username === currentUser ? (
                <Link
                  className="flex flex-row gap-5"
                  href={`/app/profile/${currentUser}/edit`}
                >
                  <Cog8ToothIcon className="w-6" />
                </Link>
              ) : null}
            </div>
            <div className="text-gray-800 flex flex-row gap-5 sm:gap-10 items-center">
              <div>
                <span className="font-semibold"> {numClimbs} </span>{" "}
                {numClimbs > 1 ? "Climbs" : "Climb"}
              </div>
              {/* <div>
                <span className="font-semibold"> 100 </span> Followers
              </div> */}
            </div>

            <div className="text-gray-800 flex-col hidden sm:flex">
              <p className="font-bold">{first}</p>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-gray-800 flex-col flex items-start sm:hidden pt-4">
        <p className="font-bold">{first}</p>
        <p>Hi there!</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
