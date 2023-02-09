'use client'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

export default function FAQ() {
  return (
    <div className="w-full px-4 pt-16">
      <div className="mx-auto w-full max-w-lg rounded-2xl bg-white p-2 border border-brand-green">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium">
                <span>What is Docuclimb?</span>
                <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}/>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                Docuclimb is a place for you to document your bouldering progress.
                Post your sends and projects on an Instagram-like activity feed.
                Track your progression and climbing habits with charts and analytics.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium">
                <span>Is Docuclimb free?</span>
                <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}/>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                Yes.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium">
                <span>How is content moderated?</span>
                <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}/>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                Docuclimb&apos;s content is user moderated.
                If you see content from another user that you don&apos;t like, report it.
                All reports are sent directly to the creator.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium">
                <span>Does Docuclimb support feature/bug requests?</span>
                <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}/>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                Docuclimb is a side-project.
                New features may be introduced, but are unlikely.
                Bugs may patched and depend on severity.
                Have a great idea or found a bug? Please send me an email.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium">
                <span>If Docuclimb shuts down can I keep my data?</span>
                <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}/>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                If Docuclimb is decommissioned, users will be notified via email.
                Steps will be included in the message to retain a folder of your data.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}
