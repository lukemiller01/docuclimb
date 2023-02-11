import ProfileHeaderSkeleton from '@/app/Components/ProfileHeaderSkeleton'
import ProfileSkeleton from '@/app/Components/ProfileSkeleton'
import React from 'react'

const loading = () => {
  return (
    <div className='bg-light-grey h-full'>
      <ProfileHeaderSkeleton/>
      <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="mt-6 grid gap-y-4 gap-x-4 grid-cols-2 xl:gap-x-8 sm:grid-cols-3 lg:grid-cols-4 sm:gap-y-10 sm:gap-x-6">
          <ProfileSkeleton/>
          <ProfileSkeleton/>
          <ProfileSkeleton/>
          <ProfileSkeleton/>
        </div>
      </div>
  </div>
  )
}

export default loading