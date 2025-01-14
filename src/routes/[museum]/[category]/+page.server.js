import { readdirSync, existsSync, readFileSync, link } from 'fs';
import { parse } from 'csv-parse/sync';
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

	const csvPath = join(process.cwd(), 'static', 'data', 'image_order.csv');
	const csvData = readFileSync(csvPath, 'utf8');
	const allImageData = parse(csvData, { columns: true, skip_empty_lines: true });


	function sortImages(images, type) {
		const imageData = allImageData.filter(
			item => item.museum == museum && item.cat == category && item.type == type
		);

		const orderMap = new Map();
		const linkMap = new Map();

		for (let item of imageData) {
			orderMap.set(item.image_id, parseInt(item.order));
			linkMap.set(item.image_id, item.post_url);
		}


		return images
			.map((image) => {
                const id = getImageId(image);
                return {
				src: image,
				id: id,
				link: linkMap.get(getImageId(image)) || '#'
                }
			})
			.sort((a, b) => {
				const orderA = orderMap.get(a.id) || Infinity;
				const orderB = orderMap.get(b.id) || Infinity;
				return orderA - orderB;
			})
	}

	const basePath = join(process.cwd(), 'static', 'images', museum, category);

	const taggedPath = join(basePath, 'tagged');
	const postedPath = join(basePath, 'posted');

	const taggedImages = getImagesFromPath(taggedPath);
	const postedImages = getImagesFromPath(postedPath);

	const sortedTaggedImages = sortImages(taggedImages, 'tagged');
	const sortedPostedImages = sortImages(postedImages, 'posted');

	return {
		museum,
		category,
		taggedImages: sortedTaggedImages,
		postedImages: sortedPostedImages
	};
}

function getImageId(imagePath) {
	return imagePath.split('/').pop().split('.')[0];
}
