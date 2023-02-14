'use client';

// Functional
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Pocketbase
import { pb } from '../../functions/pocketbase';

// Arrow icons
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function ResetCredentials( { email }:any ) {

    const [newEmail, setNewEmail] = useState('') // For updating email
    const [passswordResetEmail, setPasswordResetEmail] = useState(email) // For updating password
    
    const [emailButtonDisabled, setEmailButtonDisabled] = useState(false);
    const [emailSuccess, setEmailSuccess] = useState(false);

    const [passwordButtonDisabled, setPasswordButtonDisabled] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    const router = useRouter();

    const resetEmail = async(e:any) => {
        e.preventDefault();
        setEmailButtonDisabled(true);

        await pb.collection('users').requestEmailChange(newEmail);
        setEmailSuccess(true);
    }

    const resetPassword = async(e:any) => {
        e.preventDefault();
        setPasswordButtonDisabled(true); 

        await pb.collection('users').requestPasswordReset(passswordResetEmail);
        setPasswordSuccess(true);
    }

  return (
        <>
          <div>
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className=" text-xl font-bold leading-6 text-gray-900 p-4">Authentication</h3>
                </div>
              </div>
              <div className="md:col-span-2 m-4 shadow">
                <form onSubmit={(e) => resetEmail(e)}>
                  <div className="sm:overflow-hidden sm:rounded-md">
                    <div className=" bg-white px-4 py-5 sm:p-6 flex flex-row gap-4">
                        <div className=' w-full'>
                            <label htmlFor="new-email" className="sr-only">email</label>
                            <input
                            id="new-email"
                            type="text"
                            autoComplete="email"
                            required
                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="New Email"
                            onChange={(e) => setNewEmail(e.target.value)}
                            />
                        </div>

                        <div className='flex'>
                            <button
                                type="submit"
                                className="w-36 flex justify-center truncate relative rounded-md border border-transparent bg-brand-green py-2 px-4 text-sm font-medium text-white hover:bg-brand-green-tint"
                                disabled={emailButtonDisabled}
                            >
                                {emailButtonDisabled && !emailSuccess
                                            ? <ArrowPathIcon className="animate-spin h-5 w-5"></ArrowPathIcon>
                                            : !emailSuccess ? 'Update Email' : 'Reset Sent' }
                            </button>
                        </div>

                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1"></div>
              <div className="md:col-span-2 m-4 shadow">
                <form onSubmit={(e) => resetPassword(e)}>
                  <div className="sm:overflow-hidden sm:rounded-md">
                    <div className=" bg-white px-4 py-5 sm:p-6 flex flex-row gap-4">
                        <div className=' w-full'>
                            <label htmlFor="email" className="sr-only">email</label>
                            <input
                            id="email"
                            type="text"
                            autoComplete="email"
                            required
                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email"
                            value={passswordResetEmail}
                            onChange={(e) => setPasswordResetEmail(e.target.value)}
                            />
                        </div>

                        <div className='flex'>
                            <button
                                type="submit"
                                className="w-36 flex justify-center truncate relative rounded-md border border-transparent bg-brand-green py-2 px-4 text-sm font-medium text-white hover:bg-brand-green-tint"
                                disabled={passwordButtonDisabled}
                            >
                                {passwordButtonDisabled && !passwordSuccess
                                            ? <ArrowPathIcon className="animate-spin h-5 w-5"></ArrowPathIcon>
                                            : !passwordSuccess ? 'Reset Password' : 'Reset Sent' }
                            </button>
                        </div>

                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
    )
}