import { readdirSync, existsSync, readFileSync, link } from 'fs';
import { parse } from 'csv-parse/sync';
import { join } from 'path';
import { get } from 'http';
import { base } from '$app/paths';

export function load() {

	const csvPath = join('static', 'data', 'new_image_order.csv');
	const csvData = readFileSync(csvPath, 'utf8');
	const allImageData = parse(csvData, { columns: true, skip_empty_lines: true });

	function sortByOrder(a, b) {
		const orderA = a.order || Infinity;
		const orderB = b.order || Infinity;
		return orderA - orderB;
	}

	const sortedImages = allImageData.sort(sortByOrder);
	
	return {
		images: sortedImages
	};
}
