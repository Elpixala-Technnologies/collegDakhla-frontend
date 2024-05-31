import { getDefaultImageUrl } from "@/query/schema";
import { useQuery } from "@apollo/client";

function GetDefaultMedia(name: String) {
	const { loading, error, data: defaultImageData } = useQuery(getDefaultImageUrl, {
		variables: { name }
	});
	return defaultImageData?.uploadFiles?.data[0]?.attributes?.url
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

export function GetDefaultImage(type: string) {

	if (type == "logo") {
		return "https://images.shiksha.com/mediadata/images/1605086820phpSFQlAR_s.jpg"
	}
	else if (type == "banner") {
		return "https://images.collegedunia.com/public/college_data/images/appImage/1509430807cover.jpg?h=300&w=250&mode=stretch"
	}
}
