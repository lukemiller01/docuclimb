'use client'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const EditProfileSkeleton = () => {
  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
                <Skeleton  height={'60px'} className="m-4"/>
            </div>
        </div>
        <div className="md:col-span-2 m-4 shadow">
            <div className="sm:overflow-hidden sm:rounded-md">
                <div className='bg-white px-4 py-5 sm:p-6 gap-4'>
                    <Skeleton height={'40px'} className="my-4"/>
                    <Skeleton height={'40px'} className="my-4"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditProfileSkeleton