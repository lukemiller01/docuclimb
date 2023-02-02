import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function SettingSwitch({enabled, setEnabled}:any) {

  return (
    <div className='flex justify-center items-center gap-4'>
        <p className={`${enabled ? '' : 'font-bold'} text-base text-gray-400 sm:text-sm w-16 text-right`}>Indoor</p>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className=" bg-grey/25 relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <span className="sr-only">Indoor/Outdoor</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-green shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <p className={`${enabled ? 'font-bold' : ''} text-base text-gray-400 sm:text-sm w-16`}>Outdoor</p>
    </div>
  )
}