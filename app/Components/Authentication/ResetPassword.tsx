'use client'

// Functional
import React from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

// Icons
import { ArrowPathIcon } from '@heroicons/react/24/outline';

import { useRouter } from 'next/navigation';

// Pocketbase
import { pb } from '../../Pocketbasefunctions/pocketbase';
import ErrorMessage from '../ErrorMessage';

const ResetPassword = ({token}:any) => {

    // Error
    const [error, setError] = useState('');

    const router = useRouter();

    function closeModal() {
      setIsOpen(false);
      router.push('/');
    }

    const [passwordData, setPasswordData] = useState({password: '', confirmPassword: ''});
    const [buttonDisabled, setButtonDisabled] = useState(false); // Is the button disabled?
    const [isOpen, setIsOpen] = useState(true); // If the modal is open (needs refactor)
  
    const confirmChange = async(e:any) => {
        e.preventDefault();
        setButtonDisabled(true);
        setError('');

        try {
          await pb.collection('users').confirmPasswordReset(token, passwordData.password, passwordData.confirmPassword,);
          pb.authStore.clear();
          router.push('/login');
        } catch (error:any) {
          setError(error.message);
        }

        setButtonDisabled(false);
    }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                    >
                    Update Your Email
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Please confirm your email change
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={(e) => confirmChange(e)}>
                        <div className='hidden'>
                            <label htmlFor="username" className="sr-only">
                            username
                            </label>
                            <input
                            id="username"
                            type="text"
                            autoComplete="username"
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
                            onChange={(e) => setPasswordData({...passwordData, password: e.target.value})}
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
                            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Confirm Password"
                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-brand-green py-2 px-4 text-sm font-medium text-white hover:bg-brand-green-tint"
                                disabled={buttonDisabled}>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                </span>
                                {buttonDisabled
                                            ? <ArrowPathIcon className="animate-spin h-5 w-5"></ArrowPathIcon>
                                            : 'Confirm' }
                            </button>
                        </div>
                    </form>
                    {error? <ErrorMessage error={error}/> : null}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ResetPassword