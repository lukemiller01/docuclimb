"use client";

// Icons
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

// Functional
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Components
import CreateModal from "@/app/Components/ClimbModal/CreateModal";

// Setting type of ColorArray to build an array below
interface ColorArray {
  red: string;
  orange: string;
  yellow: string;
  green: string;
  blue: string;
  purple: string;
  pink: string;
  white: string;
  black: string;
}

// Using the array to set the color of the text as a Tailwind class
const colorVariants: ColorArray = {
  red: "text-climb-red",
  orange: "text-climb-orange",
  yellow: "text-climb-yellow",
  green: "text-climb-green",
  blue: "text-climb-blue",
  purple: "text-climb-purple",
  pink: "text-climb-pink",
  white: "text-white",
  black: "text-black",
};

// Props coming from Server component
interface Climb {
  climb: {
      id: string,
      grade: string,
      color: string,
      image: string,
      base64: string,
      date: string,
      username: string,
      imageUrl: string,
      uid: string,
      environment: boolean,
  }
  index: number,
  currentUser: string,
}

// Imports:
// A climb object
// The index of the climb (to set next/image priority)
// The ID of the current user to check if it's their post (hiding/showing edit button)
export default function Climb({ climb, index, currentUser }: Climb) {
  const { id, grade, color, image, base64, date, username, imageUrl, uid } =
    climb || {};
  const url = `https://api.docuclimb.com/api/files/boulders/${id}/${image}`;

  //  Open modal
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <CreateModal
        isOpen={isOpen}
        closeModal={closeModal}
        actionType={"Edit"}
        id={id}
        climb={climb}
        url={url}
        currentUser={currentUser}
      />
      <div className="flex items-center flex-col bg-white rounded-2xl px-4">
        <div className=" w-full flex justify-between items-center py-2">
          <Link
            href={`/app/profile/${username}`}
            className="flex flex-row items-center gap-2"
          >
            <div className="w-8 h-8 relative">
              <Image
                src={imageUrl}
                alt="profile"
                fill
                sizes="5vw"
                className="object-cover rounded-[50%]"
              ></Image>
            </div>
            <div className="flex flex-col x-sm:flex-row x-sm:gap-2 items-start">
              <p className="text-sm font-bold hover:text-grey">{username}</p>
              <p className="text-sm font-bold hidden x-sm:block">•</p>
              <p className="text-sm text-grey">{date.substring(0, 10)}</p>
            </div>
          </Link>
          {uid === currentUser ? (
            <EllipsisHorizontalIcon
              className="h-8 w-8 cursor-pointer"
              onClick={() => openModal()}
            />
          ) : null}
        </div>
        <Image
          src={url}
          alt="Climb"
          width={414}
          height={553}
          className="h-auto"
          priority={index === 0}
          placeholder="blur"
          blurDataURL={`${base64}`}
        ></Image>
        <div className=" w-11/12 flex justify-between items-center py-2">
          <h2
            className={`${
              colorVariants[color.toLowerCase() as keyof ColorArray]
            } text-4xl font-bold text-shadow mx-auto`}
          >
            {grade}
          </h2>
        </div>
      </div>
    </>
  );
}
