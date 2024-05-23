
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import React from 'react'
import DesignConfigurator from './DesignConfigurator';

type Props = {
    searchParams: {
        [key:string]: string | string[] | undefined;
    }
}

async function DesignPage({searchParams}: Props) {

    const {id} = searchParams;

    if(!id || typeof id !== "string") {
        return redirect("/")
    }

    const configuration = await prismadb.configuration.findUnique({
        where: {
            id
        },
        select: {
            width: true,
            height: true,
            imageUrl: true,
            id: true,
        }
    })

    if(!configuration) {
        return redirect("/")
    }

    const {width, height, imageUrl } = configuration;

  return (
    <>
        <DesignConfigurator
            configId={configuration.id}
            imageUrl={imageUrl}
            imageDimensions={{ width, height }}
        />
    </>
  )
}

export default DesignPage