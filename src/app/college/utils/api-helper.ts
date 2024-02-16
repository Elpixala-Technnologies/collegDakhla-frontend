import { getDefaultImageUrl } from "@/query/schema";
import { useQuery } from "@apollo/client";

function getDefaultMedia(name: String) {
	const { loading, error, data: defaultImageData } = useQuery(getDefaultImageUrl)
		;
	console.log("helper default image are ", defaultImageData);
}


export function getStrapiURL(path = '') {
	return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${path}`;
}

export function getStrapiMedia(url: string | null) {
	if (url == null) {
		return null;
	}

	// Return the full URL if the media is hosted on an external provider
	if (url.startsWith('http') || url.startsWith('//')) {
		return url;
	}

	// Otherwise prepend the URL path with the Strapi URL
	return `${getStrapiURL()}${url}`;
}

export function getDefaultImage(type: string) {
	//getDefaultMedia("agam")

	if (type == "logo") {
		return getStrapiMedia("/uploads/default_Logo_2b51b95a90.jpeg")
	}
	else if (type == "banner") {
		return getStrapiMedia("/uploads/banner_edb40a9e41.webp")
	}
}
