import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const updates = [
    { name: "Misty Tea Leaves", thc_mg: 2 },
    { name: "Magic Dust", thc_mg: 15 },
    { name: "Blue Flower", thc_mg: 0 },
    { name: "Dwarven Yeast", thc_mg: 0 },
    { name: "Fairy Flour", thc_mg: 5 },
    { name: "Sparkle Sugar", thc_mg: 1 }
];

async function main() {
    try {
        const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
        const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';
        await pb.admins.authWithPassword(adminEmail, adminPassword);

        for (const update of updates) {
            try {
                const record = await pb.collection('ingredients').getFirstListItem(`name="${update.name}"`);
                await pb.collection('ingredients').update(record.id, {
                    thc_mg: update.thc_mg
                });
                console.log(`Updated ${update.name} with ${update.thc_mg}mg THC`);
            } catch (e) {
                console.error(`Failed to update ${update.name}:`, e);
            }
        }
        console.log("Done updating THC values.");

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();
