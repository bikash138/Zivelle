import ConfirmOrder from '@/components/core/ConfirmOrder'
import React, {Suspense} from 'react'

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ConfirmOrder />
      </Suspense>
    </div>
  )
}

export default page