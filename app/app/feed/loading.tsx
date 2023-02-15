// Component:
import ClimbSkeleton from '@/app/Components/Skeletons/ClimbSkeleton'

// Functional
import React from 'react'

const loading = () => {
  return (
    <div className="mx-auto grid gap-12 py-12 px-4 bg-light-grey">
        <ClimbSkeleton/>
        <ClimbSkeleton/>
        <ClimbSkeleton/>
        <ClimbSkeleton/>
    </div>
  )
}

export default loading