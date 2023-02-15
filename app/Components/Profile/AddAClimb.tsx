'use client'
import React, { useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import CreateModal from '../ClimbModal/CreateModal'

const AddAClimb = ({currentUser}:any) => {

let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
    <CreateModal isOpen={isOpen} closeModal={closeModal} actionType={'Create'} climb={undefined} currentUser={currentUser} profile={true}/>
    <div className='flex flex-row justify-center gap-4 items-center'>
        <button
        type="button"
        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-brand-green"
      >
        <span className="sr-only">Add a climb</span>
        <PlusCircleIcon className="h-6 w-6" aria-hidden="true" onClick={() => openModal()} />
      </button>
        <p className='text-l'>Add a climb</p>
    </div>
    </>
  )
}

export default AddAClimb