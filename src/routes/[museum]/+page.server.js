import { readdirSync, existsSync, readFileSync, link } from 'fs';
import { parse } from 'csv-parse/sync';
import { join } from 'path';
import { get } from 'http';

export function load({ params }) {
	const { museum } = params;

	const csvPath = join(process.cwd(), 'static', 'data', 'image_order.csv');
	const csvData = readFileSync(csvPath, 'utf8');
	const allImageData = parse(csvData, { columns: true, skip_empty_lines: true });
	const museumImageData = allImageData.filter((d) => d.museum == museum);

	function sortByOrder(a, b) {
		const orderA = a.order || Infinity;
		const orderB = b.order || Infinity;
		return orderA - orderB;
	}

	const basePath = join('https://storage.googleapis.com/social-museum/', museum);

	const taggedPath = join(basePath, 'tagged');
	const postedPath = join(basePath, 'posted');

	const sortedTaggedImages = museumImageData.filter((d) => d.type == 'tagged').sort(sortByOrder);
	const sortedPostedImages = museumImageData.filter((d) => d.type == 'posted').sort(sortByOrder);

	return {
		museum,
		taggedImages: sortedTaggedImages,
		postedImages: sortedPostedImages
	};
}
