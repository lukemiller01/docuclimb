"use client";

// Functional
import { Fragment, useState } from "react";

// Components
import { Dialog, Transition } from "@headlessui/react";

// Images / icons
import { ArrowPathIcon } from "@heroicons/react/24/outline";

import { useRouter } from "next/navigation";

// Pocketbase
import { pb } from "../../Pocketbasefunctions/pocketbase";

interface VerificationResult {
  result: boolean;
}

export default function VerifyEmail({ result }: VerificationResult) {
  const router = useRouter();

  function closeModal() {
    router.push("/");
  }

  const [buttonDisabled, setButtonDisabled] = useState(false); // Is the button disabled?
  const [email, setEmail] = useState(""); // User input
  const [sent, setSent] = useState(false); // Was a message sent?

  const resend = async (e: any) => {
    e.preventDefault();
    setButtonDisabled(true);

    await pb.collection("users").requestVerification(email);
    setButtonDisabled(false);
    setSent(true);
    // !! Fix error on React.FormEvent<HTMLFormElement>: Property 'reset' does not exist on type 'EventTarget'.
    e.target.reset(); // resets value but keeps email for pop-up message
  };

  return (
    <>
      <Transition appear show={true} as={Fragment}>
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
                    {result
                      ? "Verification Successful"
                      : "Verification Unsuccessful"}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {result
                        ? "Thank you for verifying your email."
                        : "An error occured while verifying your email."}
                    </p>
                  </div>

                  {!result ? (
                    <form
                      className="mt-8 space-y-6"
                      onSubmit={(e) => resend(e)}
                    >
                      <input
                        type="hidden"
                        name="remember"
                        defaultValue="true"
                      />
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
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                          {buttonDisabled ? (
                            <ArrowPathIcon className="animate-spin h-5 w-5"></ArrowPathIcon>
                          ) : (
                            "Resend"
                          )}
                        </button>
                      </div>
                    </form>
                  ) : null}
                  {sent && !result ? (
                    <p className="text-sm text-gray-500 text-center mt-4">
                      Message sent to {email}
                    </p>
                  ) : null}

                  {result ? (
                    <div className="mt-4">
                      <button
                        type="button"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-brand-green py-2 px-4 text-sm font-medium text-white hover:bg-brand-green-tint"
                        onClick={closeModal}
                      >
                        Home
                      </button>
                    </div>
                  ) : null}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
