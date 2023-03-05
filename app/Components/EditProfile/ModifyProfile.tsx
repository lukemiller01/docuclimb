"use client";

// Functional
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Pocketbase
import { pb } from "../../Pocketbasefunctions/pocketbase";

// Arrow icons
import { ArrowPathIcon, UserCircleIcon } from "@heroicons/react/24/outline";

interface Profile {
  id: string;
  username: string;
  first: string;
  description: string;
  profile: string;
}

export default function ModifyProfile({
  id,
  username,
  first,
  description,
  profile,
}: Profile) {
  const [userData, setUserData] = useState({
    first: first,
    username: username,
    description: description,
  }); // getting user data to send to Pocketbase if user decides to modify profile

  const [loadingImage, setLoadingImage] = useState(false); // If the user uploads a new image, add loading state
  const [previewImage, setPreviewImage] = useState(profile); // Temporary in-browser URL as image preview
  const [selectedImage, setSelectedImage] = useState<File>(); // File to include in formData
  const [buttonDisabled, setButtonDisabled] = useState(false); // Prevent user spamming button

  const router = useRouter();

  const update = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonDisabled(true);

    // Set formData for internal API
    const formData = new FormData();
    if (selectedImage) {
      formData.append("avatar", selectedImage);
    }
    formData.append("first", userData.first);
    formData.append("username", userData.username);
    formData.append("description", userData.description);
    formData.append("uid", id);
    await pb.collection("users").update(id, formData);
    router.refresh();
    await pb.collection("users").authRefresh(); // Updates cookie
    setButtonDisabled(false);
    router.push(`/app/profile/${userData.username}`); // Navigates to updated username profile
  };

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className=" text-xl font-bold leading-6 text-gray-900 p-4">
                Profile
              </h3>
            </div>
          </div>
          <div className="md:col-span-2 m-4">
            <form onSubmit={(e) => update(e)}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="first-name" className="sr-only">
                      first name
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      autoComplete="first name"
                      required
                      value={userData.first}
                      className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="First name"
                      onChange={(e) =>
                        setUserData({ ...userData, first: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="username" className="sr-only">
                      username
                    </label>
                    <input
                      id="username"
                      type="text"
                      autoComplete="username"
                      required
                      value={userData.username}
                      className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Username"
                      onChange={(e) =>
                        setUserData({ ...userData, username: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="sr-only">Photo</label>
                    <div className="mt-4 flex items-center justify-center">
                      {loadingImage ? (
                        <ArrowPathIcon className="animate-spin h-12 w-12"></ArrowPathIcon>
                      ) : previewImage ? (
                        <div className="w-12 h-12 relative">
                          <Image
                            src={previewImage}
                            alt="uploaded image"
                            fill
                            sizes="5vw"
                            className="object-cover rounded-[50%]"
                            priority={true}
                          ></Image>
                        </div>
                      ) : (
                        <UserCircleIcon className=" h-12 w-12" />
                      )}
                      <label
                        htmlFor="file-upload"
                        className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                      >
                        <span>Change</span>
                        <input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          accept=".png, .jpg, .jpeg, .heic, .heif"
                          onChange={async ({ target }) => {
                            if (target.files) {
                              setLoadingImage(true);
                              var imageFile = target.files[0];

                              // If the image is an heic file
                              if (imageFile.type === "image/heic") {
                                // Get the params from the file
                                const lastModified = imageFile.lastModified;
                                const name = imageFile.name;
                                // Convert to JPEG
                                const heic2any = (await import("heic2any"))
                                  .default;
                                const newBlob: any = await heic2any({
                                  blob: imageFile,
                                });
                                newBlob.lastModified = lastModified;
                                newBlob.name = name;
                                // Set the file again
                                imageFile = newBlob;
                              }
                              if (imageFile.size > 3000000) {
                                // Clip the size of the image
                                const options = {
                                  // Set the maximum file size
                                  maxSizeMB: 1,
                                  useWebWorker: true,
                                };
                                try {
                                  // Compress the image.
                                  const imageCompression = (
                                    await import("browser-image-compression")
                                  ).default;
                                  const compressedFile = await imageCompression(
                                    imageFile,
                                    options
                                  );
                                  imageFile = compressedFile;
                                } catch (error) {
                                  console.log(error);
                                }
                              }

                              setLoadingImage(false);
                              setSelectedImage(imageFile);

                              // Set URL for preview
                              setPreviewImage(URL.createObjectURL(imageFile));
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Description"
                      value={userData.description}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="w-36 truncate relative rounded-md border border-transparent bg-brand-green py-2 px-4 text-sm font-medium text-white hover:bg-brand-green-tint"
                      disabled={buttonDisabled}
                    >
                      {buttonDisabled ? (
                        <ArrowPathIcon className="animate-spin h-5 w-5 mx-auto"></ArrowPathIcon>
                      ) : (
                        "Update Profile"
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
