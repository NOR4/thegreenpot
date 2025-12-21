import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
        const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';
        await pb.admins.authWithPassword(adminEmail, adminPassword);

        try {
            const collection = await pb.collections.getOne('recipes');
            console.log('Found collection "recipes":');
            console.log(JSON.stringify(collection, null, 2));
        } catch (e: any) {
            if (e.status === 404) {
                console.log('Collection "recipes" NOT found.');
            } else {
                console.error('Error fetching collection:', e);
            }
        }

    } catch (e) {
        console.error('Script error:', e);
    }
}

main();
