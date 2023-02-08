'use client'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ClimbSkeleton = () => {
  return (
    <div>
        <div className="flex items-center flex-col bg-white rounded-2xl x-sm:w-[445px] x-sm:h-[656px] mx-auto">
            <div className=" w-[90%] flex justify-center items-center py-2">
                <div className='flex flex-row items-center gap-2'>
                    <Skeleton width={32} height={32} circle/>
                    <div className='flex flex-row items-center gap-2'>
                        <Skeleton width={100}></Skeleton>
                        <Skeleton width={100}></Skeleton>
                    </div>
                </div>
            </div>
            <div className='w-[90%] h-[50vh] x-sm:h-[500px]'>
                <Skeleton height={'100%'}/>
            </div>
            <div className=" items-center py-2 mx-auto">
                <Skeleton width={75} height={50}></Skeleton>
            </div>
        </div>
    </div>
  )
}

export default ClimbSkeleton