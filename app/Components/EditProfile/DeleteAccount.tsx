"use client";

// Functional
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Pocketbase
import { pb } from "../../Pocketbasefunctions/pocketbase";

// Arrow icons
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface AccountID {
  id: string;
}

export default function DeleteAccount({ id }: AccountID) {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const deleteAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonDisabled(true);

    // Get all records associated with a user
    const records = await pb.collection("boulders").getFullList(200, {
      filter: `uid= "${id}"`,
    });

    // Remove records from DB
    for (let i = 0; i < records.length; i++) {
      await pb.collection("boulders").delete(records[i].id);
    }

    await pb.collection("users").delete(id);

    setButtonDisabled(false);
    router.push("/");
  };

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className=" text-xl font-bold leading-6 text-gray-900 p-4">
                Danger Zone
              </h3>
            </div>
          </div>
          <div className="md:col-span-2 m-4">
            <form onSubmit={(e) => deleteAccount(e)}>
              <div className="sm:overflow-hidden sm:rounded-md">
                <div className="flex justify-end bg-white px-4 py-5 sm:p-6">
                  <div>
                    <button
                      type="submit"
                      className="w-36 flex justify-center truncate relative rounded-md border border-transparent bg-climb-red py-2 px-4 text-sm font-medium text-white hover:bg-red-accent"
                      disabled={buttonDisabled}
                    >
                      {buttonDisabled ? (
                        <ArrowPathIcon className="animate-spin h-5 w-5"></ArrowPathIcon>
                      ) : (
                        "Delete Account"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
