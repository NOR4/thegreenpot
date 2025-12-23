import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
        const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';
        await pb.admins.authWithPassword(adminEmail, adminPassword);

        const collection = await pb.collections.getOne('recipes');
        const field = collection.fields.find(f => f.name === 'base_ingredients');

        console.log('Field definition:', JSON.stringify(field, null, 2));

    } catch (err) {
        console.error('Error:', err);
    }
}

main();
