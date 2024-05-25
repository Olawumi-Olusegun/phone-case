
import React, { Suspense } from 'react'
import ThankYou from './ThankYou'

type Props = {}

function ThankyouPage({}: Props) {
  return (
    <Suspense>
        <ThankYou />
    </Suspense>
  )
}

export default ThankyouPage