export function load({ data }) {
	
	return {
		...data,
		images: data.images || []
	};
}