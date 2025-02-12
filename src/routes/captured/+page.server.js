import { Storage } from '@google-cloud/storage';

export async function load({params}) {

    const bucketName = 'social-museum';
    const storage = new Storage();

    try {
        const [files] = await storage.bucket(bucketName).getFiles({
            prefix: 'captured',
        });

        const images = files
            .filter((file) => file.name.endsWith('.jpg'))
            .map((file) => ({
                name: file.name,
                src: `https://storage.googleapis.com/${bucketName}/${file.name}`,
                timestamp: file.metadata.timeCreated,
                date: new Date(file.metadata.timeCreated).toLocaleString(),
                type: 'captured',
                link: `https://storage.googleapis.com/${bucketName}/${file.name}`
            }))
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        return {
            cache: false,
            images:images
        }

    } catch (error) {
        console.error('ERROR:', error);
    }

}