import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
        const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';
        await pb.admins.authWithPassword(adminEmail, adminPassword);

        // Find Goblin's Green Brownie
        const recipe = await pb.collection('recipes').getFirstListItem('title="Goblin\'s Green Brownie"', {
            expand: 'base_ingredients'
        });

        console.log(`Recipe: ${recipe.title}`);
        let baseIngredients = recipe.expand?.base_ingredients;
        if (baseIngredients && !Array.isArray(baseIngredients)) {
            baseIngredients = [baseIngredients];
        }

        console.log('Base Ingredients:', JSON.stringify(baseIngredients, null, 2));

        const totalTHC = baseIngredients?.reduce((sum: number, ing: any) => sum + (ing.thc_mg || 0), 0) || 0;
        console.log(`Total THC: ${totalTHC}`);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();
