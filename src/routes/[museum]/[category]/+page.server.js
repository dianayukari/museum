import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

function getImagesFromPath(path) {
	if (existsSync(path)) {
		return readdirSync(path)
			.filter((file) => file.match(/\.(jpg|jpeg|png|gif)$/i))
			.map((file) => path.split('static')[1] + '/' + file);
	}
	return [];
}

export function load({ params }) {
	const { museum, category } = params;
	const basePath = join(process.cwd(), 'static', 'images', museum, category);

	const taggedPath = join(basePath, 'tagged');
	const postedPath = join(basePath, 'posted');

	const taggedImages = getImagesFromPath(taggedPath);
	const postedImages = getImagesFromPath(postedPath);

	return {
		museum,
		category,
		taggedImages,
		postedImages
	};
}
