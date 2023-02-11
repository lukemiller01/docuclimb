'use client'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProfileHeaderSkeleton = () => {
  return (
    <div className="flex items-start sm:items-center justify-center py-4 sm:py-8 flex-col px-4">
        <div>
            <div className="flex flex-row">
                <div className="object-center mr-4">
                <Skeleton width={96} height={96} circle/>
                </div>
                <div className="col-span-4 flex flex-col gap-4"> 
                    <div className="text-gray-800 flex flex-col gap-5 items-start sm:flex-row">
                        <Skeleton width={125} height={34}></Skeleton>
                    </div>
                    <div className="text-gray-800 flex flex-row gap-5 sm:gap-10 items-center">
                        <div> 
                            <Skeleton width={63} height={24}></Skeleton>
                        </div>
                        <div> 
                            <Skeleton width={63} height={24}></Skeleton>
                        </div>
                    </div>
                    
                    <div className="text-gray-800 flex-col hidden sm:flex"> 
                        <Skeleton width={275} height={20}></Skeleton>
                        <Skeleton width={275} height={20}></Skeleton>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-gray-800 flex-col flex items-start sm:hidden pt-4"> 
            <Skeleton width={275} height={20}></Skeleton>
            <Skeleton width={275} height={20}></Skeleton>
        </div>
    </div>
  )
}

export default ProfileHeaderSkeleton