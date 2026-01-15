import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
        const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';

        console.log(`Authenticating as ${adminEmail}...`);
        await pb.admins.authWithPassword(adminEmail, adminPassword);

        // --- UPDATE RECIPES COLLECTION ---
        console.log('Updating recipes collection schema...');
        const recipesCollection = await pb.collections.getOne('recipes');

        // Check if Spanish fields already exist
        const hasSpanishFields = recipesCollection.fields.some(f => f.name === 'title_es');

        if (!hasSpanishFields) {
            await pb.collections.update(recipesCollection.id, {
                fields: [
                    ...recipesCollection.fields,
                    { name: 'title_es', type: 'text', required: false },
                    { name: 'description_es', type: 'text', required: false },
                    { name: 'ingredients_text_es', type: 'json', required: false },
                    { name: 'instructions_es', type: 'json', required: false },
                    { name: 'category_es', type: 'text', required: false }
                ]
            });
            console.log('✓ Added Spanish fields to recipes collection');
        } else {
            console.log('✓ Spanish fields already exist in recipes collection');
        }

        // --- UPDATE INGREDIENTS COLLECTION ---
        console.log('Updating ingredients collection schema...');
        const ingredientsCollection = await pb.collections.getOne('ingredients');

        const hasIngredientSpanishFields = ingredientsCollection.fields.some(f => f.name === 'name_es');

        if (!hasIngredientSpanishFields) {
            await pb.collections.update(ingredientsCollection.id, {
                fields: [
                    ...ingredientsCollection.fields,
                    { name: 'name_es', type: 'text', required: false },
                    { name: 'description_es', type: 'text', required: false },
                    { name: 'category_es', type: 'text', required: false }
                ]
            });
            console.log('✓ Added Spanish fields to ingredients collection');
        } else {
            console.log('✓ Spanish fields already exist in ingredients collection');
        }

        console.log('\n✅ Schema migration completed successfully!');

    } catch (error) {
        console.error('❌ Error during migration:', error);
        process.exit(1);
    }
}

main();
