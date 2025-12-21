import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
        const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';
        await pb.admins.authWithPassword(adminEmail, adminPassword);

        const collectionsToUpdate = ['recipes', 'products', 'comments', 'likes'];

        for (const collectionName of collectionsToUpdate) {
            console.log(`Updating rules for "${collectionName}"...`);
            try {
                const collection = await pb.collections.getOne(collectionName);
                collection.listRule = "";
                collection.viewRule = "";

                if (collectionName === 'recipes') {
                    collection.updateRule = "";
                }

                await pb.collections.update(collection.id, collection);
                console.log(`Rules for "${collectionName}" updated successfully.`);
            } catch (err: any) {
                console.error(`Failed to update rules for "${collectionName}":`, err.message);
            }
        }

        // Delete likes collection if it exists
        try {
            const likesCollection = await pb.collections.getOne('likes');
            await pb.collections.delete(likesCollection.id);
            console.log('Deleted "likes" collection.');
        } catch (err: any) {
            console.log('"likes" collection already deleted or not found.');
        }

        console.log('All public read access rules enabled.');

    } catch (e) {
        console.error('Script error:', e);
    }
}

main();
