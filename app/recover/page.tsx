'use client'

// Functional
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { pb } from '../Pocketbasefunctions/pocketbase'

// Images/icons
import logo from '../../public/docuclimb.svg'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

// Components:
import ErrorMessage from '../Components/ErrorMessage';

// Allows users to recover their account if they forgot a password
export default function Recover() {

  const [email, setEmail] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Error
  const [error, setError] = useState('');

  const router = useRouter();

  const recover = async(e:any) => {
    e.preventDefault();
    setButtonDisabled(true);
    setError('');

    try {
      await pb.collection('users').requestPasswordReset(email);
      router.push('/login');
    } catch (error:any) {
      console.log(error.data)
      setError(error.message)
    }
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image className='mx-auto h-12 w-auto' src={logo} alt='docuclimb logo' width={50} height={50}/>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Password Recovery
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={(e) => recover(e)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">
                  email
                </label>
                <input
                  id="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                              : 'Reset Password' }
              </button>
            </div>
          </form>
          {error? <ErrorMessage error={error}/> : null}
        </div>
      </div>
    </>
  )
}