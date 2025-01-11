export function load({ data }) {
	
	return {
		...data,
		taggedImages: data.taggedImages || [],
		postedImages: data.postedImages || []
	};
}