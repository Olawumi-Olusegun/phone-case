import { Metadata } from "next";

type constructMetaDataTypes = {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
}

export function constructMetaData<constructMetaDataTypes>({
    title = "PhoneCase - Custom high-quality phone case",
    description = "Create custom high-quality phone case in seconds",
    image = "/thumbnail.png",
    icons= "/favicon.ico"
} = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [{url: image}]
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@olawumi_ade"
        },
        icons,
        metadataBase: new URL("https://phone-case-omega.vercel.app")
    }
}