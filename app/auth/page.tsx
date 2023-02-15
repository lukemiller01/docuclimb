import React from 'react'

// Since users are being redirected from Postmark's "safe address" feature
// The below line is required. See below:
// https://github.com/vercel/next.js/issues/43077
export const dynamic='force-dynamic';

import { redirect } from 'next/navigation';

// Import pocketbase
import { pb } from '../Pocketbasefunctions/pocketbase';

// Modals
import VerifyEmail from '../Components/Authentication/VerifyEmail';
import UpdateEmail from '../Components/Authentication/UpdateEmail';
import ResetPassword from '../Components/Authentication/ResetPassword';

// Checks if the token is valid, if the user is trying to validate their email
async function getVerified(token:string) {

  // Get all climb data
  try {
    const result = await pb.collection('users').confirmVerification(token);
    return true;
  }
  catch (error) {
    return false;
  }
}

// Display corrrect UI based on the mode
export default async function Auth({searchParams,}: {searchParams?: { [key: string]: string | string[] | undefined };}) {

  // If there's no search params / redirect to home
  if(searchParams === undefined || !searchParams['token'] || !searchParams['mode']) {
    redirect('/');
  }

  // If the user is verifying their email
  var result;
  if(searchParams.mode === 'verifyEmail') {
    result = await getVerified(searchParams['token'] as string);
  }

  return (
    <>
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
      </div>
      { searchParams['mode'] === 'verifyEmail' ? <VerifyEmail result={result}/> : null}
      { searchParams['mode'] === 'updateEmail' ? <UpdateEmail token={searchParams.token}/> : null}
      { searchParams['mode'] === 'resetPassword' ? <ResetPassword token={searchParams.token}/> : null}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <svg
              className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9089FC" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
      </div>
    </>
  );
}
