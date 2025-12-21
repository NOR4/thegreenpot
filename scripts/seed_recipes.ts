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

const ingredientsData = [
    { name: "Misty Tea Leaves", description: "Silver-green leaves that shimmer in the moonlight. Harvested from the highest peaks of the Misty Mountains.", category: "Herb", image: "https://placehold.co/200x200/png?text=Leaves", calories: 5, allergies: "None", rarity: "Rare", effects: "Calm, Clarity" },
    { name: "Magic Dust", description: "Fine glowing powder that sparkles with arcane energy. Handle with care!", category: "Catalyst", image: "https://placehold.co/200x200/png?text=Dust", calories: 0, allergies: "Arcane Sensitivity", rarity: "Epic", effects: "Energy, Levitation" },
    { name: "Blue Flower", description: "A rare azure bloom that only grows in deep forest shade. Known for its sedative properties.", category: "Herb", image: "https://placehold.co/200x200/png?text=Flower", calories: 10, allergies: "Pollen", rarity: "Common", effects: "Sleep, Relaxation" },
    { name: "Dwarven Yeast", description: "Ancient fermented spores passed down through generations of mountain smiths.", category: "Ferment", image: "https://placehold.co/200x200/png?text=Yeast", calories: 45, allergies: "Gluten", rarity: "Common", effects: "Strength, Resilience" },
    { name: "Fairy Flour", description: "Extra-fine flour ground from enchanted wheat. So light it can float on a breeze.", category: "Grain", image: "https://placehold.co/200x200/png?text=Flour", calories: 120, allergies: "Gluten", rarity: "Rare", effects: "Lightness, Joy" },
    { name: "Sparkle Sugar", description: "Sugar crystals that literally pop and glow when touched. Adds a delightful sparkle to any treat.", category: "Sweetener", image: "https://placehold.co/200x200/png?text=Sugar", calories: 80, allergies: "None", rarity: "Common", effects: "Excitement, Glow" }
];

async function main() {
    try {
        const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
        const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';

        console.log(`Authenticating as ${adminEmail}...`);
        await pb.admins.authWithPassword(adminEmail, adminPassword);

        // Helper to download image and return as Blob
        async function downloadImage(url: string): Promise<Blob | null> {
            try {
                const response = await fetch(url);
                if (!response.ok) return null;
                return await response.blob();
            } catch (e) {
                console.error(`Failed to download image from ${url}:`, e);
                return null;
            }
        }

        // --- 1. INGREDIENTS COLLECTION ---
        console.log('Checking "ingredients" collection...');
        let ingredientsCollectionId = '';
        try {
            const collection = await pb.collections.getOne('ingredients');
            ingredientsCollectionId = collection.id;
            console.log('"ingredients" exists. Updating schema...');

            // Update fields to include new ones and change image to file
            await pb.collections.update(collection.id, {
                fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'description', type: 'text', required: true },
                    { name: 'image', type: 'file', required: false, options: { maxSelect: 1, maxSize: 5242880, mimeTypes: ['image/png', 'image/jpeg', 'image/webp'] } },
                    { name: 'category', type: 'text', required: false },
                    { name: 'calories', type: 'number', required: false },
                    { name: 'allergies', type: 'text', required: false },
                    { name: 'rarity', type: 'text', required: false },
                    { name: 'effects', type: 'text', required: false }
                ],
                listRule: "",
                viewRule: "",
            });
            console.log('"ingredients" schema updated.');
        } catch (err: any) {
            if (err.status === 404) {
                console.log('Creating "ingredients" collection...');
                const collection = await pb.collections.create({
                    name: 'ingredients',
                    type: 'base',
                    fields: [
                        { name: 'name', type: 'text', required: true },
                        { name: 'description', type: 'text', required: true },
                        { name: 'image', type: 'file', required: false, options: { maxSelect: 1, maxSize: 5242880, mimeTypes: ['image/png', 'image/jpeg', 'image/webp'] } },
                        { name: 'category', type: 'text', required: false },
                        { name: 'calories', type: 'number', required: false },
                        { name: 'allergies', type: 'text', required: false },
                        { name: 'rarity', type: 'text', required: false },
                        { name: 'effects', type: 'text', required: false }
                    ],
                    listRule: "",
                    viewRule: "",
                });
                ingredientsCollectionId = collection.id;
                console.log('Created "ingredients" collection.');
            } else {
                throw err;
            }
        }

        // Seed Ingredients
        console.log('Seeding ingredients...');
        const ingredientMap: Record<string, string> = {};
        for (const ing of ingredientsData) {
            const existing = await pb.collection('ingredients').getList(1, 1, { filter: `name="${ing.name}"` });

            // Handle image upload
            const data: any = { ...ing };
            if (ing.image && ing.image.startsWith('http')) {
                const blob = await downloadImage(ing.image);
                if (blob) {
                    const formData = new FormData();
                    formData.append('image', blob, `${ing.name.toLowerCase().replace(/\s+/g, '_')}.png`);

                    // Add other fields to FormData
                    for (const key in data) {
                        if (key !== 'image') {
                            formData.append(key, data[key]);
                        }
                    }

                    if (existing.items.length === 0) {
                        const record = await pb.collection('ingredients').create(formData);
                        ingredientMap[ing.name] = record.id;
                        console.log(`Created ingredient (with image): ${ing.name}`);
                    } else {
                        const record = await pb.collection('ingredients').update(existing.items[0].id, formData);
                        ingredientMap[ing.name] = record.id;
                        console.log(`Updated ingredient (with image): ${ing.name}`);
                    }
                    continue;
                }
            }

            if (existing.items.length === 0) {
                const record = await pb.collection('ingredients').create(data);
                ingredientMap[ing.name] = record.id;
                console.log(`Created ingredient: ${ing.name}`);
            } else {
                const record = await pb.collection('ingredients').update(existing.items[0].id, data);
                ingredientMap[ing.name] = record.id;
                console.log(`Updated ingredient: ${ing.name}`);
            }
        }

        // --- 2. RECIPES COLLECTION ---
        console.log('Checking "recipes" collection...');
        let recipesCollectionId = '';
        try {
            const collection = await pb.collections.getOne('recipes');
            recipesCollectionId = collection.id;
            console.log('"recipes" exists. Updating schema...');

            await pb.collections.update(collection.id, {
                fields: [
                    ...collection.fields.filter(f => !['ingredients', 'instructions', 'time', 'base_ingredients', 'image'].includes(f.name)),
                    { name: 'image', type: 'file', required: false, options: { maxSelect: 1, maxSize: 5242880, mimeTypes: ['image/png', 'image/jpeg', 'image/webp'] } },
                    { name: 'ingredients', type: 'json' },
                    { name: 'instructions', type: 'json' },
                    { name: 'time', type: 'text', required: false },
                    { name: 'base_ingredients', type: 'relation', collectionId: ingredientsCollectionId, options: { maxSelect: null, collectionId: ingredientsCollectionId } }
                ],
                listRule: "",
                viewRule: "",
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
                        { name: 'image', type: 'file', required: false, options: { maxSelect: 1, maxSize: 5242880, mimeTypes: ['image/png', 'image/jpeg', 'image/webp'] } },
                        { name: 'price', type: 'text', required: false },
                        { name: 'description', type: 'text', required: false },
                        { name: 'ingredients', type: 'json' },
                        { name: 'instructions', type: 'json' },
                        { name: 'time', type: 'text', required: false },
                        { name: 'total_votes', type: 'number', required: false },
                        { name: 'base_ingredients', type: 'relation', collectionId: ingredientsCollectionId, options: { maxSelect: null, collectionId: ingredientsCollectionId } }
                    ],
                    listRule: "",
                    viewRule: "",
                });
                recipesCollectionId = collection.id;
                console.log('Created "recipes" collection.');
            } else {
                throw err;
            }
        }

        // --- 3. PRODUCTS COLLECTION ---
        console.log('Checking "products" collection...');
        let productsCollectionId = '';
        try {
            const collection = await pb.collections.getOne('products');
            productsCollectionId = collection.id;
            console.log('"products" collection exists.');
            await pb.collections.update(collection.id, {
                listRule: "",
                viewRule: "",
            });
        } catch (err: any) {
            if (err.status === 404) {
                console.log('Creating "products" collection...');
                const collection = await pb.collections.create({
                    name: 'products',
                    type: 'base',
                    fields: [
                        { name: 'name', type: 'text', required: true },
                        { name: 'image', type: 'file', required: false, options: { maxSelect: 1, maxSize: 5242880, mimeTypes: ['image/png', 'image/jpeg', 'image/webp'] } },
                        { name: 'affiliate_link', type: 'url', required: true },
                        { name: 'price', type: 'text' },
                        { name: 'clicks', type: 'number', required: false }
                    ],
                    listRule: "",
                    viewRule: "",
                });
                productsCollectionId = collection.id;
                console.log('Created "products" collection.');
            } else {
                throw err;
            }
        }

        // Update recipes for products relation IF NOT ALREADY THERE
        try {
            const recipesCollection = await pb.collections.getOne('recipes');
            if (!recipesCollection.fields.find(f => f.name === 'products')) {
                await pb.collections.update(recipesCollection.id, {
                    fields: [
                        ...recipesCollection.fields,
                        {
                            name: 'products',
                            type: 'relation',
                            required: false,
                            collectionId: productsCollectionId,
                            options: { maxSelect: null, collectionId: productsCollectionId }
                        }
                    ]
                });
            }
        } catch (e) {
            console.log('Error updating products relation:', e);
        }

        // Seed Products
        const catalogData = [
            { name: 'Magical Herb Grinder', image: 'https://placehold.co/200x200/444/fff?text=Grinder', affiliate_link: 'https://amazon.com', price: '25 GP', clicks: 0 },
            { name: 'Crystal Infuser', image: 'https://placehold.co/200x200/444/fff?text=Infuser', affiliate_link: 'https://amazon.com', price: '15 GP', clicks: 0 },
            { name: 'Alchemist Jars', image: 'https://placehold.co/200x200/444/fff?text=Jars', affiliate_link: 'https://amazon.com', price: '10 GP', clicks: 0 },
            { name: 'Obsidian Mortar', image: 'https://placehold.co/200x200/444/fff?text=Mortar', affiliate_link: 'https://amazon.com', price: '35 GP', clicks: 0 }
        ];

        const productIds: string[] = [];
        for (const p of catalogData) {
            const existing = await pb.collection('products').getList(1, 1, { filter: `name="${p.name}"` });

            // Handle image upload
            const data: any = { ...p };
            if (p.image && p.image.startsWith('http')) {
                const blob = await downloadImage(p.image);
                if (blob) {
                    const formData = new FormData();
                    formData.append('image', blob, `${p.name.toLowerCase().replace(/\s+/g, '_')}.png`);

                    for (const key in data) {
                        if (key !== 'image') {
                            formData.append(key, data[key]);
                        }
                    }

                    if (existing.items.length === 0) {
                        const record = await pb.collection('products').create(formData);
                        productIds.push(record.id);
                        console.log(`Created product (with image): ${p.name}`);
                    } else {
                        const record = await pb.collection('products').update(existing.items[0].id, formData);
                        productIds.push(record.id);
                        console.log(`Updated product (with image): ${p.name}`);
                    }
                    continue;
                }
            }

            if (existing.items.length === 0) {
                const record = await pb.collection('products').create(p);
                productIds.push(record.id);
                console.log(`Created product: ${p.name}`);
            } else {
                productIds.push(existing.items[0].id);
                console.log(`Product exists: ${p.name}`);
            }
        }

        // --- 4. SEED RECIPES ---
        console.log('Seeding recipes...');
        for (const recipe of recipes) {
            try {
                // Determine base ingredients for this recipe
                const recipeBaseIngredients: string[] = [];
                for (const ingName of recipe.ingredients) {
                    // Check if the ingredient name exists (partial match)
                    const found = Object.keys(ingredientMap).find(name => ingName.toLowerCase().includes(name.toLowerCase()));
                    if (found) {
                        recipeBaseIngredients.push(ingredientMap[found]);
                    }
                }

                const existing = await pb.collection('recipes').getList(1, 1, { filter: `title="${recipe.title}"` });
                const shuffled = productIds.sort(() => 0.5 - Math.random());
                const selectedProducts = shuffled.slice(0, 2);

                const recipeData: any = {
                    ...recipe,
                    products: selectedProducts,
                    base_ingredients: recipeBaseIngredients
                };

                // Handle image upload
                if (recipe.image && recipe.image.startsWith('http')) {
                    const blob = await downloadImage(recipe.image);
                    if (blob) {
                        const formData = new FormData();
                        formData.append('image', blob, `${recipe.title.toLowerCase().replace(/\s+/g, '_')}.png`);

                        // Add other fields to FormData
                        for (const key in recipeData) {
                            if (key !== 'image') {
                                if (Array.isArray(recipeData[key])) {
                                    recipeData[key].forEach((val: any) => formData.append(key, val));
                                } else {
                                    formData.append(key, recipeData[key]);
                                }
                            }
                        }

                        if (existing.items.length === 0) {
                            await pb.collection('recipes').create(formData);
                            console.log(`Created recipe (with image): ${recipe.title}`);
                        } else {
                            await pb.collection('recipes').update(existing.items[0].id, formData);
                            console.log(`Updated recipe (with image): ${recipe.title}`);
                        }
                        continue;
                    }
                }

                if (existing.items.length === 0) {
                    await pb.collection('recipes').create(recipeData);
                    console.log(`Created recipe: ${recipe.title}`);
                } else {
                    await pb.collection('recipes').update(existing.items[0].id, recipeData);
                    console.log(`Updated recipe: ${recipe.title}`);
                }
            } catch (e) {
                console.error(`Failed to process ${recipe.title}:`, e);
            }
        }

        console.log('Done!');

    } catch (err: any) {
        console.error('Error:', err);
        if (err.response) {
            console.error('Error Details:', JSON.stringify(err.response.data, null, 2));
        }
        process.exit(1);
    }
}

main();

