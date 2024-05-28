
import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'

type Props = {}

function Footer({}: Props) {
  return (
    <footer className='w-full border-t py-10 bg-white relative mt-auto'>
        <MaxWidthWrapper className='text-center text-sm font-semibold'>
           <div className=" h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
            <div className="text-center md:text-left pb-2 md:pb-0">
              <p> Copyright &copy; <span className='text-green-600'>PhoneCase </span> {new Date().getFullYear()}</p>
            </div>
            <div className="flex items-center justify-center ">
              <div className="flex space-x-8">
                <Link href={"#"} className='text-sm text-muted-foreground hover:text-gray-600'>Terms</Link>
                <Link href={"#"} className='text-sm text-muted-foreground hover:text-gray-600'>Privacy Policy</Link>
                <Link href={"#"} className='text-sm text-muted-foreground hover:text-gray-600'>Cookie Policy</Link>
              </div>
            </div>
           </div>
        </MaxWidthWrapper>
    </footer>
  )
}

export default Footer