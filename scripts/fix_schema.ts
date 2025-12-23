import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
        const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';
        await pb.admins.authWithPassword(adminEmail, adminPassword);

        const collection = await pb.collections.getOne('recipes');

        // Find the ingredients collection ID properly
        const ingCollection = await pb.collections.getOne('ingredients');
        const ingCollectionId = ingCollection.id;

        // Force update specifically for this field
        const baseIngredientsField = collection.fields.find(f => f.name === 'base_ingredients');

        if (baseIngredientsField) {
            console.log('Found field. Configuring as multi-select relation...');
            // Re-define the field completely to be safe
            baseIngredientsField.type = 'relation';
            baseIngredientsField.collectionId = ingCollectionId;
            baseIngredientsField.options = {
                maxSelect: null, // Enable multiple
                collectionId: ingCollectionId,
                cascadeDelete: false
            };

            await pb.collections.update(collection.id, {
                fields: collection.fields
            });
            console.log('Updated schema to allow multiple base_ingredients.');
        } else {
            console.log('Field base_ingredients not found. Adding it...');
            collection.fields.push({
                name: 'base_ingredients',
                type: 'relation',
                required: false,
                presentable: false,
                unique: false,
                options: {
                    collectionId: ingCollectionId,
                    cascadeDelete: false,
                    minSelect: null,
                    maxSelect: null,
                    displayFields: null
                }
            });
            await pb.collections.update(collection.id, { fields: collection.fields });
            console.log('Created base_ingredients field.');
        }

    } catch (err) {
        console.error('Error:', err);
    }
}

main();
