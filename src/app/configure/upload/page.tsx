"use client";

import { Progress } from '@/components/ui/progress';
import { useUploadThing } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';
import { ImageIcon, Loader2, MousePointerSquareDashed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react'
import Dropzone, {FileRejection} from 'react-dropzone';
import { toast } from 'sonner';


type Props = {}

function UploadPage({}: Props) {

    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isPending, starTransition] = useTransition();
    const router = useRouter();

    const {startUpload, isUploading} = useUploadThing("imageUploader", {
        onClientUploadComplete: ([data]) => {
            const configId = data.serverData.configId;
            starTransition(() => {
                router.push(`/configure/design?id=${configId}`)
            })
        },
        onUploadProgress(p) {
            setUploadProgress(p)
        }
    })

    const onDropRejected = (rejectedFile: FileRejection[]) => {
        const [file] = rejectedFile;
        setIsDragOver(false);
        toast.error(`${file.file.type} type is not supper`, {
            description: "Please choose a PNG, JPG, JPEG image instead",
            position: "bottom-center",
        });
    }

    const onDropAccepted = (acceptedFiles: File[]) => {
        startUpload(acceptedFiles, { configId: undefined})
        setIsDragOver(false);
    }
    
  return (
    <div className={cn("relative duration-300 h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center", {
        "ring-blue-900/25 bg-blue-900/10": isDragOver
    })}>
        <div className="relative flex flex-col flex-1 items-center w-full">
            <Dropzone 
            onDropRejected={onDropRejected}
            onDropAccepted={onDropAccepted}
            accept={{
                "image/png": [".png"],
                "image/jpg": [".jpg"],
                "image/jpeg": [".jpeg"],
            }}
            onDragEnter={() => setIsDragOver(true)}
            onDragLeave={() => setIsDragOver(false)}
            >
                {({getRootProps, getInputProps}) => (
                    <div className="h-full cursor-pointer w-full flex-1 flex flex-col items-center justify-center" {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isDragOver 
                        ? <MousePointerSquareDashed className='h-6 w-6 text-zince-500 mb-2' /> 
                        : isUploading || isPending
                        ? <Loader2 className="animate-spin w-6 h-6 text-zince-500 mb-2" />
                        : <ImageIcon className='h-6 w-6 text-zinc-500 mb-2' />
                        }
                        <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                            { 
                            isUploading
                            ? <div className="flex flex-col items-center">
                                <p className="">Uploading...</p>
                                <Progress value={uploadProgress} className='mt-2 w-40 h-2 bg-gray-300' />

                            </div> 
                            : isPending
                            ? <div className="flex flex-col items-center">
                                <p>Redirecting, please wait</p>
                            </div>
                            : isDragOver 
                            ? <span>
                                <p> <span className='font-semibold'>Drop File</span> to upload</p>
                            </span>
                            : <span>
                                <p> <span className='font-semibold'>Click to upload</span> or drag and drop</p>
                            </span>
                        }
                        { isPending ? null : <p className='text-xs text-center text-zinc-500'>
                            PNG, JPG, JPEG
                        </p> }
                        </div>
                    </div>
                )}
            </Dropzone>
        </div>
    </div>
  )
}

export default UploadPage