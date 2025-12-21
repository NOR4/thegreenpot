import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
        const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';
        await pb.admins.authWithPassword(adminEmail, adminPassword);

        console.log('Fetching "recipes" collection...');
        const collection = await pb.collections.getOne('recipes');

        // Allow public read access (empty string or rule expression)
        // "" = public (careful, some older versions used null, but API usually expects string rules)
        // For public list/view: ""
        collection.listRule = "";
        collection.viewRule = "";

        console.log('Updating "recipes" rules...');
        await pb.collections.update(collection.id, collection);

        console.log('Rules updated successfully. Public read access enabled.');

    } catch (e) {
        console.error('Script error:', e);
    }
}

main();
