'use client'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ClimbSkeleton = () => {
  return (
    <div className="flex items-center flex-col bg-white rounded-2xl w-full x-sm:w-[445px] x-sm:h-[656px] mx-auto px-4">
        <div className="flex items-center py-2 w-full">
            <div className='flex flex-row items-center gap-2'>
                <Skeleton width={32} height={32} circle/>
                <div className='flex flex-row items-center gap-2'>
                    <Skeleton width={100}></Skeleton>
                    <Skeleton width={100}></Skeleton>
                </div>
            </div>
        </div>
        <div className='w-[100%] h-[55vh] x-sm:h-[550px]'>
            <Skeleton height={'100%'}/>
        </div>
        <div className=" items-center py-2 mx-auto">
            <Skeleton width={75} height={50}></Skeleton>
        </div>
    </div>
  )
}

export default ClimbSkeleton