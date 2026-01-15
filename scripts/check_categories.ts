import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
        const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';

        await pb.admins.authWithPassword(adminEmail, adminPassword);

        const recipes = await pb.collection('recipes').getFullList();
        console.log("Total recipes:", recipes.length);
        recipes.forEach(r => {
            console.log(`- Title: ${r.title}, Category: '${r.category}'`);
        });

    } catch (err) {
        console.error(err);
    }
}

main();
