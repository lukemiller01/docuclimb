import React from 'react'
import { FaceFrownIcon } from '@heroicons/react/24/outline'

const NoClimbsYet = () => {
  return (
    <div className='flex flex-row justify-center gap-4 items-center'>
        <FaceFrownIcon className='h-6 w-6'/>
        <p className='text-l'>No climbs yet</p>
    </div>
  )
}

export default NoClimbsYet