'use client'

// Functional
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { pb } from '../functions/pocketbase';
import axios from 'axios';

// Images/icons
import logo from '../../public/docuclimb.svg'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { ArrowPathIcon, UserCircleIcon  } from '@heroicons/react/24/outline'
import avatar from '../../public/avatar.svg'

export default function Register() {

  const [userData, setUserData] = useState({first: '', username: '', email: '', password: '', passwordConfirm: '', featureUpdates: false});
  const [selectedImage, setSelectedImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const router = useRouter();

  const login = async(e:any) => {
    e.preventDefault();
    setButtonDisabled(true);

    // Set formData for internal API
    const formData = new FormData();
    if(selectedImage) {
      formData.append("avatar", selectedImage);
    }
    formData.append("first", userData.first);
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("passwordConfirm", userData.passwordConfirm);
    formData.append("featureUpdates", userData.featureUpdates.toString());

    await axios.post('api/user/create/', formData);
    
    await pb.collection('users').requestVerification(userData.email);

    await pb.collection('users').authWithPassword(
      userData.username,
      userData.password,
    );

    router.replace('/app/feed');
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image className='mx-auto h-12 w-auto' src={logo} alt='docuclimb logo' width={50} height={50}/>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Register
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={(e) => login(e)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md">
            <div>
                <label htmlFor="first-name" className="sr-only">
                  first name
                </label>
                <input
                  id="first-name"
                  type="text"
                  autoComplete="first name"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="First name"
                  onChange={(e) => setUserData({...userData, first: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  email
                </label>
                <input
                  id="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email"
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
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
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Username"
                  onChange={(e) => setUserData({...userData, username: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setUserData({...userData, password: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm Password"
                  onChange={(e) => setUserData({...userData, passwordConfirm: e.target.value})}
                />
              </div>

              <div>
                <label className="sr-only">Photo</label>
                <div className="mt-4 flex items-center justify-center">
                  {loadingImage 
                    ? <ArrowPathIcon className="animate-spin h-12 w-12"></ArrowPathIcon>
                    : previewImage? <div className='w-12 h-12 relative'><Image src={previewImage} alt='uploaded image' fill className='object-cover rounded-[50%]'></Image></div>: <UserCircleIcon className=' h-12 w-12'/>
                  }
                    <label
                      htmlFor="file-upload"
                      className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                    >
                      <span>Change</span>
                      <input id="file-upload" type="file" className="sr-only" accept=".png, .jpg, .jpeg, .heic, .heif" onChange={ async ({target}) => {
                        if(target.files) {
                          setLoadingImage(true);
                          var imageFile = target.files[0];

                          // If the image is an heic file
                          if (imageFile.type === "image/heic") {
                            // Get the params from the file
                            const lastModified = imageFile.lastModified;
                            const name = imageFile.name;
                            // Convert to JPEG
                            const heic2any = (await import("heic2any")).default;
                            const newBlob: any = await heic2any({ blob: imageFile});
                            newBlob.lastModified = lastModified;
                            newBlob.name = name;
                            // Set the file again
                            imageFile = newBlob;
                          }
                          if(imageFile.size > 3000000) {
                            // Clip the size of the image
                            const options = { // Set the maximum file size
                              maxSizeMB: 1,
                              useWebWorker: true
                            }
                            try { // Compress the image.
                              const imageCompression = (await import("browser-image-compression")).default;
                              const compressedFile = await imageCompression(imageFile, options);
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
                      }}/>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  onChange={(e) => setUserData({...userData, featureUpdates: e.target.checked})}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Notify me about new features
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-brand-green py-2 px-4 text-sm font-medium text-white hover:bg-brand-green-tint"
                disabled={buttonDisabled}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                {buttonDisabled
                              ? <ArrowPathIcon className="animate-spin h-5 w-5"></ArrowPathIcon>
                              : 'Sign Up' }
              </button>
            </div>
            <p className="mt-2 text-center text-sm text-gray-600">
              {'Have an account? '}
              <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}