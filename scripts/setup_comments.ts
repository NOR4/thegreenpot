import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
        const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';

        console.log(`Authenticating as ${adminEmail}...`);
        await pb.admins.authWithPassword(adminEmail, adminPassword);

        console.log('Checking "comments" collection...');
        try {
            const collection = await pb.collections.getOne('comments');
            console.log('"comments" collection found.');

            // Fix the rules
            console.log('Updating API rules...');
            await pb.collections.update(collection.id, {
                createRule: "@request.auth.id != ''",
                updateRule: "@request.auth.id = user.id",
                deleteRule: "@request.auth.id = user.id",
            });
            console.log('Successfully updated "comments" collection rules.');

        } catch (err: any) {
            console.error('Error finding or updating collection:', err);
        }

    } catch (err) {
        console.error('Error:', err);
    }
}

main();
