// Component:
import EditProfileSkeleton from '@/app/Components/Skeletons/EditProfileSkeleton'

// Functional:
import React from 'react'

const loading = () => {
  return (
    <>
        <EditProfileSkeleton/>
        <EditProfileSkeleton/>
        <EditProfileSkeleton/>
        <EditProfileSkeleton/>
    </>
  )
}

export default loading