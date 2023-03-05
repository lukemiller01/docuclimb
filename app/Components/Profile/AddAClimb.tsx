"use client";

// Functional
import React, { useState } from "react";

// Icons
import { PlusCircleIcon } from "@heroicons/react/24/outline";

// Components
import CreateModal from "../ClimbModal/CreateModal";

interface CurrentUser {
  currentUser: string
}

const AddAClimb = ({ currentUser }: CurrentUser) => {

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
        actionType={"Create"}
        climb={undefined} // NA, Adding a new climb
        currentUser={currentUser}
        id={currentUser}
        url={undefined} // NA, Adding a new climb
      />
      <div className="flex flex-row justify-center gap-4 items-center">
        <button
          type="button"
          className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-brand-green"
        >
          <span className="sr-only">Add a climb</span>
          <PlusCircleIcon
            className="h-6 w-6"
            aria-hidden="true"
            onClick={() => openModal()}
          />
        </button>
        <p className="text-l">Add a climb</p>
      </div>
    </>
  );
};

export default AddAClimb;
