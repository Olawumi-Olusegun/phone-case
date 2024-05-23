
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Steps from '@/components/Steps';
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode;
}

function UploadRoot({children}: Props) {
  return (
    <MaxWidthWrapper className='flex flex-col flex-1 min-h-screen'>
      <Steps />
        {children}
    </MaxWidthWrapper>
  )
}

export default UploadRoot