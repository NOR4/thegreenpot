import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// Extended Recipe Type
interface SeedRecipe {
    title: string;
    category: string;
    difficulty: number;
    image: string;
    price: string;
    description: string;
    time: string;
    ingredients: string[];
    instructions: string[];
}

const recipes: SeedRecipe[] = [
    {
        title: "Misty Mountain Tea",
        category: "Beverage",
        difficulty: 2,
        image: "https://placehold.co/400x400/png?text=Tea+Pixel",
        price: "15 GP",
        description: "A calming tea harvested from the misty peaks.",
        time: "10 MIN",
        ingredients: ["1 tsp Misty Tea Leaves", "1 Cup Hot Water", "1 drop Honey"],
        instructions: ["Boil water.", "Steep leaves for 5 mins.", "Add honey."]
    },
    {
        title: "Goblin's Green Brownie",
        category: "Edible",
        difficulty: 4,
        image: "https://placehold.co/400x400/22c55e/black/png?text=Brownie",
        price: "25 GP",
        description: "A chewy treat with a magical kick.",
        time: "45 MIN",
        ingredients: ["2 Cups Flour", "1 Cup Cocoa", "Magic Dust"],
        instructions: ["Mix dry ingredients.", "Add wet ingredients.", "Bake at 350F for 20 mins."]
    },
    {
        title: "Elixir of Relaxation",
        category: "Potion",
        difficulty: 1,
        image: "https://placehold.co/400x400/3b82f6/white/png?text=Elixir",
        price: "50 GP",
        description: "Instantly calms the nerves.",
        time: "5 MIN",
        ingredients: ["1 Blue Flower", "1 Vial Spirit Water"],
        instructions: ["Crush flower.", "Mix with water.", "Shake well."]
    },
    {
        title: "Dwarven Stout",
        category: "Beverage",
        difficulty: 3,
        image: "https://placehold.co/400x400/713f12/white/png?text=Stout",
        price: "10 GP",
        description: "Thick, dark, and strong.",
        time: "7 DAYS",
        ingredients: ["Barley", "Hops", "Dwarven Yeast"],
        instructions: ["Brew for 7 days in the dark."]
    },
    {
        title: "Fairy Dust Cupcake",
        category: "Edible",
        difficulty: 5,
        image: "https://placehold.co/400x400/e879f9/white/png?text=Cupcake",
        price: "30 GP",
        description: "Light as air and sparkles in the dark.",
        time: "1 HR",
        ingredients: ["Fairy Flour", "Sparkle Sugar"],
        instructions: ["Whisk gently.", "Bake with love."]
    }
];

const products = [
    { name: "Magical Grinder", price: "25 GP", image: "https://placehold.co/200x200/444/fff?text=Grinder", affiliate_link: "https://amazon.com" },
    { name: "Crystal Infuser", price: "15 GP", image: "https://placehold.co/200x200/444/fff?text=Infuser", affiliate_link: "https://amazon.com" },
    { name: "Alchemist Jars", price: "10 GP", image: "https://placehold.co/200x200/444/fff?text=Jars", affiliate_link: "https://amazon.com" }
];

async function main() {
    try {
        const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
        const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';

        console.log(`Authenticating as ${adminEmail}...`);
        await pb.admins.authWithPassword(adminEmail, adminPassword);

        // --- RECIPES COLLECTION ---
        console.log('Checking "recipes" collection...');
        let recipesCollectionId = '';
        try {
            const collection = await pb.collections.getOne('recipes');
            recipesCollectionId = collection.id;
            console.log('"recipes" exists. Updating schema...');

            // Check if fields exist, if not add them. 
            // NOTE: Simplest way is to define full schema. PocketBase merges/updates.
            await pb.collections.update(collection.id, {
                fields: [
                    ...collection.fields.filter(f => !['ingredients', 'instructions', 'time'].includes(f.name)),
                    { name: 'ingredients', type: 'json' },
                    { name: 'instructions', type: 'json' },
                    { name: 'time', type: 'text', required: false }
                ]
            });
            console.log('"recipes" schema updated.');

        } catch (err: any) {
            if (err.status === 404) {
                console.log('Creating "recipes" collection...');
                const collection = await pb.collections.create({
                    name: 'recipes',
                    type: 'base',
                    fields: [
                        { name: 'title', type: 'text', required: true },
                        { name: 'category', type: 'text', required: true },
                        { name: 'difficulty', type: 'number', required: false },
                        { name: 'image', type: 'url', required: false },
                        { name: 'price', type: 'text', required: false },
                        { name: 'description', type: 'text', required: false },
                        { name: 'ingredients', type: 'json' },
                        { name: 'instructions', type: 'json' },
                        { name: 'time', type: 'text', required: false },
                        { name: 'total_votes', type: 'number', required: false }
                    ]
                });
                recipesCollectionId = collection.id;
                console.log('Created "recipes" collection.');
            } else {
                throw err;
            }
        }

        // Update schema if it exists to ensure total_votes is there
        try {
            const collection = await pb.collections.getOne('recipes');
            await pb.collections.update(collection.id, {
                fields: [
                    ...collection.fields.filter(f => f.name !== 'total_votes'),
                    { name: 'total_votes', type: 'number', required: false }
                ]
            });
            console.log('Updated "recipes" schema with total_votes.');
        } catch (e) {
            console.log('Error updating schema (might already be up to date):', e);
        }

        // --- 3. Manage Products Collection (Standalone Catalog) ---
        console.log('Checking "products" collection...');
        let productsCollectionId = '';
        try {
            const collection = await pb.collections.getOne('products');
            productsCollectionId = collection.id;
            console.log('"products" collection exists. Updating schema...');

            // Remove old recipe field if it exists (not strictly necessary to delete, but good for cleanup)
            // Add 'clicks' field
            await pb.collections.update(collection.id, {
                fields: [
                    ...collection.fields.filter(f => f.name !== 'recipe'), // Remove recipe link from product side
                    { name: 'clicks', type: 'number', required: false }
                ]
            });

        } catch (err: any) {
            if (err.status === 404) {
                console.log('Creating "products" collection...');
                try {
                    const collection = await pb.collections.create({
                        name: 'products',
                        type: 'base',
                        fields: [
                            { name: 'name', type: 'text', required: true },
                            { name: 'image', type: 'url', required: true },
                            { name: 'affiliate_link', type: 'url', required: true },
                            { name: 'price', type: 'text' },
                            { name: 'clicks', type: 'number', required: false }
                        ]
                    });
                    productsCollectionId = collection.id;
                    console.log('Created "products" collection.');
                } catch (e: any) {
                    console.error('Failed to create products collection:', JSON.stringify(e.data, null, 2));
                    throw e;
                }
            } else {
                throw err;
            }
        }

        // --- 4. Update Recipes Schema for Relation ---
        console.log('Updating "recipes" schema for product relations...');
        const recipesCollection = await pb.collections.getOne('recipes');
        await pb.collections.update(recipesCollection.id, {
            fields: [
                ...recipesCollection.fields,
                {
                    name: 'products',
                    type: 'relation',
                    required: false,
                    collectionId: productsCollectionId,
                    options: { maxSelect: null, collectionId: productsCollectionId } // Multiple products
                }
            ]
        });


        // --- USERS & LIKES/COMMENTS (Preserve existing logic roughly) ---
        const usersCollection = await pb.collections.getOne('users');
        const usersCollectionId = usersCollection.id;

        // Ensure likes/comments exist (simplified from previous steps, assuming they work now)
        try { await pb.collections.getOne('likes'); } catch {
            await pb.collections.create({
                name: 'likes',
                type: 'base',
                fields: [
                    { name: 'recipe', type: 'relation', required: true, collectionId: recipesCollectionId, cascadeDelete: true, maxSelect: 1, options: { collectionId: recipesCollectionId, cascadeDelete: true, maxSelect: 1 } },
                    { name: 'user', type: 'relation', required: true, collectionId: usersCollectionId, cascadeDelete: true, maxSelect: 1, options: { collectionId: usersCollectionId, cascadeDelete: true, maxSelect: 1 } }
                ],
                indexes: ['CREATE UNIQUE INDEX idx_recipe_user ON likes (recipe, user)']
            });
        }
        try { await pb.collections.getOne('comments'); } catch {
            await pb.collections.create({
                name: 'comments',
                type: 'base',
                fields: [
                    { name: 'text', type: 'text', required: true },
                    { name: 'recipe', type: 'relation', required: true, collectionId: recipesCollectionId, cascadeDelete: true, maxSelect: 1, options: { collectionId: recipesCollectionId, cascadeDelete: true, maxSelect: 1 } },
                    { name: 'user', type: 'relation', required: true, collectionId: usersCollectionId, cascadeDelete: true, maxSelect: 1, options: { collectionId: usersCollectionId, cascadeDelete: true, maxSelect: 1 } }
                ]
            });
        }


        // --- 5. Seed Data ---

        // A. Seed Product Catalog
        console.log('Seeding products catalog...');
        const catalogData = [
            { name: 'Magical Herb Grinder', image: 'https://placehold.co/200x200/444/fff?text=Grinder', affiliate_link: 'https://amazon.com', price: '25 GP', clicks: 0 },
            { name: 'Crystal Infuser', image: 'https://placehold.co/200x200/444/fff?text=Infuser', affiliate_link: 'https://amazon.com', price: '15 GP', clicks: 0 },
            { name: 'Alchemist Jars', image: 'https://placehold.co/200x200/444/fff?text=Jars', affiliate_link: 'https://amazon.com', price: '10 GP', clicks: 0 },
            { name: 'Obsidian Mortar', image: 'https://placehold.co/200x200/444/fff?text=Mortar', affiliate_link: 'https://amazon.com', price: '35 GP', clicks: 0 },
            { name: 'Dragon Fire Torch', image: 'https://placehold.co/200x200/444/fff?text=Torch', affiliate_link: 'https://amazon.com', price: '100 GP', clicks: 0 }
        ];

        const productIds: string[] = [];

        for (const p of catalogData) {
            const existing = await pb.collection('products').getList(1, 1, { filter: `name="${p.name}"` });
            if (existing.items.length === 0) {
                const record = await pb.collection('products').create(p);
                productIds.push(record.id);
                console.log(`Created product: ${p.name}`);
            } else {
                productIds.push(existing.items[0].id);
                console.log(`Product exists: ${p.name}`);
            }
        }


        // B. Seed Recipes with Relations
        console.log('Seeding recipes...');

        for (const recipe of recipes) {
            try {
                const existing = await pb.collection('recipes').getList(1, 1, { filter: `title="${recipe.title}"` });

                // Randomly assign 2-3 products to each recipe
                const shuffled = productIds.sort(() => 0.5 - Math.random());
                const selectedProducts = shuffled.slice(0, 2 + Math.floor(Math.random() * 2));

                const recipeData = { ...recipe, products: selectedProducts };

                if (existing.items.length === 0) {
                    await pb.collection('recipes').create(recipeData);
                    console.log(`Created recipe: ${recipe.title}`);
                } else {
                    // Always update to ensure links are established and new fields are present
                    const rec = existing.items[0];
                    await pb.collection('recipes').update(rec.id, recipeData);
                    console.log(`Updated recipe: ${recipe.title}`);
                }
            } catch (e) {
                console.error(`Failed to process ${recipe.title}:`, e);
            }
        }

        console.log('Done!');

    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

main();
