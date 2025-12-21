import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
        const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';
        await pb.admins.authWithPassword(adminEmail, adminPassword);

        const collections = await pb.collections.getFullList();
        console.log('Collections Found:');
        collections.forEach(c => {
            console.log(`- ${c.name} (id: ${c.id})`);
            console.log(`  List Rule: ${c.listRule}`);
            console.log(`  View Rule: ${c.viewRule}`);
        });

        console.log('\nChecking some recipes and their products...');
        const recipes = await pb.collection('recipes').getList(1, 3, {
            expand: 'products'
        });

        recipes.items.forEach(r => {
            console.log(`Recipe: ${r.title}`);
            console.log(`- Products Filter string: ${r.products}`);
            console.log(`- Expanded Products:`, JSON.stringify(r.expand?.products || [], null, 2));
        });

        console.log('\nChecking products collection directly...');
        const products = await pb.collection('products').getList(1, 10);
        products.items.forEach(p => {
            console.log(`Product: ${p.name} (id: ${p.id})`);
        });

    } catch (e) {
        console.error('Script error:', e);
    }
}

main();
