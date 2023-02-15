'use client'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProfileSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl px-2 h-full">
        <div className="py-2">
            <Skeleton width={66}/>
        </div>
        <Skeleton className='w-[100%] pt-[125%]'/>
        <div className="flex justify-center py-2">
            <Skeleton className='mx-auto' width={75} height={40}/>
        </div>
    </div>
  )
}

export default ProfileSkeleton