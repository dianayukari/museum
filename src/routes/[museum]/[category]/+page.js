import data from '$lib/data/museums.json';

export async function load({ params }) {
	const { museum, category } = params;

	// Validate museum
	if (!data.museums.includes(museum)) {
		throw error(404, `Museum "${museum}" not found.`);
	}

	// Validate category
	if (!data.categories.includes(category)) {
		throw error(404, `Category "${category}" not found.`);
	}

	return {
		museum,
		category,
		message: `You are viewing the ${category} of ${museum}.`
	};
}
