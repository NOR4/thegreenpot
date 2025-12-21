import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
        const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';
        await pb.admins.authWithPassword(adminEmail, adminPassword);

        try {
            await pb.collections.delete('recipes');
            console.log('Collection "recipes" currently deleted.');
        } catch (e: any) {
            console.log('Error deleting collection (maybe it did not exist):', e.status);
        }

    } catch (e) {
        console.error('Script error:', e);
    }
}

main();
