
import prismadb from '@/lib/prismadb';
import { notFound, redirect } from 'next/navigation';
import React from 'react'
import DesignPreview from './DesignPreview';

type Props = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}

async function PreviewPage({searchParams}: Props) {
    const { id  } = searchParams;
    
    if(!id || typeof id !== "string") {
        return redirect("/");
    }

    const configuration = await prismadb.configuration.findUnique({
        where: { id },

    });

    if(!configuration) {
        return notFound();
    }


  return <DesignPreview configuration={configuration} />
}

export default PreviewPage