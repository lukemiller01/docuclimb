'use client'

// Functional
import React from 'react'
import Image from 'next/image';

// Icons
import { Cog8ToothIcon } from '@heroicons/react/24/outline'

const ProfileHeader = ({username, profile, first, numClimbs}:any) => {
  return (
    <div className="flex items-start sm:items-center justify-center py-4 sm:py-8 flex-col px-4">
        <div>
            <div className="flex flex-row">
                <div className="object-center mr-4">
                    <Image className="h-24 w-24 rounded-full" src={profile} alt='profile' width={50} height={50}/>
                </div>
                <div className="col-span-4 flex flex-col gap-4"> 
                    <div className="text-gray-800 flex flex-col gap-5 items-start sm:flex-row">
                        <p className="text-2xl">{username}</p>
                        <div className='flex flex-row gap-5'>
                            <button className="text-xs font-bold border border-gray-300 p-2 rounded">
                                Edit Profile
                            </button>
                            <Cog8ToothIcon className=' w-6'/>
                        </div>
                    </div>
                    <div className="text-gray-800 flex flex-row gap-5 sm:gap-10 items-center">
                        <div> 
                            <span className="font-semibold"> {numClimbs} </span> {numClimbs > 1? 'Climbs' : 'Climb'} 
                        </div>
                        <div> 
                            <span className="font-semibold"> 100 </span> Followers 
                        </div>
                    </div>
                    
                    <div className="text-gray-800 flex-col hidden sm:flex"> 
                        <p className="font-bold">{first}</p>
                        <p>Hi there!</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-gray-800 flex-col flex items-start sm:hidden pt-4"> 
            <p className="font-bold">{first}</p>
            <p>Hi there!</p>
        </div>
    </div>
  )
}

export default ProfileHeader