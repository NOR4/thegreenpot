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
    ingredients_text: string[];
    instructions: string[];
}

const recipes: SeedRecipe[] = [
    {
        title: "Rollitos Índicos de Gambas con Salsa de Mango",
        category: "Edible",
        difficulty: 3,
        image: "/Users/madacluster/.gemini/antigravity/brain/6b8a391d-bdd6-4ba0-b8c0-b84350f7f51e/prawn_rolls_pixel_1766418297244.png",
        price: "45 GP",
        description: "Crispy prawn rolls with a sweet and spicy mango sauce, infused with THC oil.",
        time: "50 MIN",
        ingredients_text: [
            "1 Mango, peeled and diced",
            "1 Clove Garlic, finely chopped",
            "1 tbsp Sugar",
            "1 tbsp Ginger, coarsely chopped",
            "1/2 Small Habanero Pepper, seeded and chopped",
            "1/4 Cup Orange Juice",
            "2 tbsp Rice Wine Vinegar",
            "1 tsp THC Oil (for sauce)",
            "1/2 Cup + 3 tbsp THC Oil (for frying/cooking)",
            "1/4 Cup Shiitake Mushrooms, sliced",
            "1 tsp + 2 tbsp Soy Sauce",
            "1 tsp Sesame Oil",
            "1 tbsp Garlic, chopped",
            "1 tbsp Shallot, chopped",
            "1/3 Cup Carrots, julienned",
            "1/3 Cup Red and Yellow Bell Peppers, julienned",
            "1/2 Napa Cabbage, shredded",
            "2 tbsp Asian Chili Paste",
            "2 tsp Lime Juice",
            "2 tbsp Green Onions, sliced",
            "1 tbsp Ginger, chopped",
            "2 tbsp Cilantro, chopped",
            "1 lb Rock Shrimp, cleaned",
            "12 oz Spring Roll Wrappers",
            "1 Egg, beaten",
            "1/2 Cup Cornstarch"
        ],
        instructions: [
            "Make Sauce: Blend mango, garlic, sugar, 1 tbsp ginger, habanero, orange juice, vinegar, and 1 tsp THC Oil until smooth.",
            "Prepare Filling: Heat 1 tbsp THC Oil. Sauté mushrooms, soy sauce, sesame oil, chopped garlic, shallot, carrots, peppers, cabbage, chili paste, lime juice, green onions, ginger, and cilantro. Cool.",
            "Prepare Shrimp: Coat shrimp in cornstarch. Fry in oil until cooked. Chop and mix with filling.",
            "Assemble: Place filling in wrappers, brush edges with egg, and roll tightly.",
            "Fry: Fry rolls in remaining oil until golden brown. Serve with mango sauce."
        ]
    },
    {
        title: "Cannabis Infused Chicken Wings",
        category: "Edible",
        difficulty: 3,
        image: "/Users/madacluster/.gemini/antigravity/brain/6b8a391d-bdd6-4ba0-b8c0-b84350f7f51e/chicken_wings_pixel_1766418310456.png",
        price: "35 GP",
        description: "Sticky, savory, and potent wings with a Thai-inspired peanut glaze.",
        time: "1 HR 10 MIN",
        ingredients_text: [
            "2 lbs Chicken Wings",
            "1 tbsp Vegetable Oil",
            "1 tbsp Baking Powder",
            "1/4 tsp Salt",
            "1/4 tsp Sunflower Lecithin",
            "1/3 Cup Sweet Chili Sauce",
            "2 tbsp Creamy Peanut Butter",
            "2 tbsp Lime Juice",
            "1/2 tbsp Fish Sauce",
            "1 tbsp Sriracha",
            "Cannabis Infused Grapeseed Oil",
            "Crushed Peanuts (Garnish)",
            "Cilantro (Garnish)"
        ],
        instructions: [
            "Step 1: Dry and Refrigerate. Rinse wings and pat dry. Sprinkle with salt and baking powder. Refrigerate overnight or at least 3 hours.",
            "Step 2: Bake Wings. Toss wings in 1 tbsp vegetable oil. Bake at 180°C (350°F) on a rack for 45-50 minutes.",
            "Step 3: Make Sauce. In a saucepan, mix sweet chili sauce, peanut butter, lime juice, fish sauce, and sriracha. Whisk with metal whisk.",
            "Step 4: Add Infusion. Turn off heat. Add Cannabis Infused Grapeseed Oil and sunflower lecithin. Whisk well to emulsify.",
            "Step 5: Coat and Finish. Coat wings with half the sauce. Bake 3-5 mins. Repeat if desired.",
            "Step 6: Garnish. Top with crushed peanuts and cilantro."
        ]
    }
];

const ingredientsData = [
    { name: "THC Oil", description: "Potent cannabis-infused oil for cooking.", category: "Oil", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=THC+Oil", calories: 120, allergies: "None", rarity: "Common", effects: "Relaxation, Euphoria", thc_mg: 50 },
    { name: "Mango", description: "Sweet, ripe mango.", category: "Fruit", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Mango", calories: 60, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Rock Shrimp", description: "Fresh rock shrimp.", category: "Seafood", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Shrimp", calories: 90, allergies: "Shellfish", rarity: "Common", effects: "None", thc_mg: 0 },
    // New Ingredients for Chicken Wings
    { name: "Chicken Wings", description: "Fresh chicken wings.", category: "Meat", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Wings", calories: 200, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Vegetable Oil", description: "Standard cooking oil.", category: "Oil", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Veg+Oil", calories: 120, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Baking Powder", description: "Leavening agent.", category: "Baking", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Baking+Powder", calories: 5, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Salt", description: "Table salt.", category: "Seasoning", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Salt", calories: 0, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Sunflower Lecithin", description: "Emulsifier to help bind THC.", category: "Supplement", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Lecithin", calories: 10, allergies: "None", rarity: "Uncommon", effects: "Bioavailability", thc_mg: 0 },
    { name: "Sweet Chili Sauce", description: "Sweet and spicy sauce.", category: "Condiment", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Chili+Sauce", calories: 40, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Creamy Peanut Butter", description: "Smooth peanut butter.", category: "Condiment", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=PB", calories: 190, allergies: "Peanuts", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Lime Juice", description: "Freshly squeezed lime juice.", category: "Fruit", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Lime", calories: 10, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Fish Sauce", description: "Savory fermented fish sauce.", category: "Condiment", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Fish+Sauce", calories: 15, allergies: "Fish", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Sriracha", description: "Spicy chili sauce.", category: "Condiment", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Sriracha", calories: 5, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Cannabis Infused Grapeseed Oil", description: "Infused oil for cooking.", category: "Oil", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Canna+Oil", calories: 120, allergies: "None", rarity: "Rare", effects: "High", thc_mg: 100 },
    { name: "Crushed Peanuts", description: "Crushed peanuts for garnish.", category: "Nut", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Peanuts", calories: 160, allergies: "Peanuts", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Cilantro", description: "Fresh cilantro leaves.", category: "Herb", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Cilantro", calories: 1, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },

    // Rollitos Índicos Ingredients
    { name: "Garlic", description: "Pungent aromatic bulb used as a flavor base.", category: "Vegetable", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Garlic", calories: 4, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Sugar", description: "Sweet crystalline sucrose.", category: "Baking", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Sugar", calories: 49, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Ginger", description: "Spicy, aromatic root with zest.", category: "Vegetable", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Ginger", calories: 2, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Habanero Pepper", description: " intensely hot chili pepper.", category: "Vegetable", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Habanero", calories: 5, allergies: "None", rarity: "Uncommon", effects: "None", thc_mg: 0 },
    { name: "Orange Juice", description: "Freshly squeezed juice from oranges.", category: "Beverage", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=OJ", calories: 110, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Rice Wine Vinegar", description: "Mild, slightly sweet vinegar.", category: "Condiment", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Vinegar", calories: 5, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Shiitake Mushrooms", description: "Savory, meaty mushrooms.", category: "Vegetable", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Shiitake", calories: 10, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Soy Sauce", description: "Salty liquid condiment made from fermented soybeans.", category: "Condiment", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Soy+Sauce", calories: 9, allergies: "Soy", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Sesame Oil", description: "Rich, nutty oil derived from sesame seeds.", category: "Oil", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Sesame+Oil", calories: 120, allergies: "Sesame", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Shallot", description: "Small bulb resembling an onion with a milder flavor.", category: "Vegetable", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Shallot", calories: 7, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Carrots", description: "Crunchy, sweet root vegetable.", category: "Vegetable", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Carrots", calories: 25, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Red and Yellow Bell Peppers", description: "Sweet, crisp peppers in vibrant colors.", category: "Vegetable", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Peppers", calories: 20, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Napa Cabbage", description: "Tender Chinese cabbage with mild flavor.", category: "Vegetable", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Cabbage", calories: 13, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Asian Chili Paste", description: "Spicy paste made from chili peppers.", category: "Condiment", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Chili+Paste", calories: 15, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Green Onions", description: "Fresh onions with green stalks and white bulbs.", category: "Vegetable", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Green+Onions", calories: 5, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Spring Roll Wrappers", description: "Thin sheets of dough wrappers.", category: "Pantry", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Wrappers", calories: 60, allergies: "Gluten", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Egg", description: "Fresh chicken egg.", category: "Dairy", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Egg", calories: 70, allergies: "Egg", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Cornstarch", description: "Fine white powder used as a thickener.", category: "Pantry", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Cornstarch", calories: 30, allergies: "Corn", rarity: "Common", effects: "None", thc_mg: 0 }
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
                if (url.startsWith('http')) {
                    console.log(`Downloading image: ${url}`);
                    const res = await fetch(url);
                    if (!res.ok) {
                        console.error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
                        return null;
                    }
                    return await res.blob();
                } else if (url.startsWith('/')) {
                    console.log(`Reading local image: ${url}`);
                    try {
                        const file = Bun.file(url);
                        if (await file.exists()) {
                            const buffer = await file.arrayBuffer();
                            return new Blob([buffer]);
                        } else {
                            console.error(`Local file not found: ${url}`);
                            return null;
                        }
                    } catch (err) {
                        console.error(`Error reading local file ${url}:`, err);
                        return null;
                    }
                }
                return null;
            } catch (err) {
                console.error(`Error processing image ${url}:`, err);
                return null;
            }
        }

        // --- CLEANUP FANTASY DATA ---
        console.log('Cleaning up fantasy data...');
        const fantasyRecipes = ["Misty Mountain Tea", "Goblin's Green Brownie", "Elixir of Relaxation", "Dwarven Stout", "Fairy Dust Cupcake"];
        for (const title of fantasyRecipes) {
            try {
                const existing = await pb.collection('recipes').getFirstListItem(`title="${title}"`);
                await pb.collection('recipes').delete(existing.id);
                console.log(`Deleted recipe: ${title}`);
            } catch (e) { /* ignore 404 */ }
        }

        const fantasyIngredients = ["Misty Tea Leaves", "Magic Dust", "Blue Flower", "Dwarven Yeast", "Fairy Flour", "Sparkle Sugar"];
        for (const name of fantasyIngredients) {
            try {
                const existing = await pb.collection('ingredients').getFirstListItem(`name="${name}"`);
                await pb.collection('ingredients').delete(existing.id);
                console.log(`Deleted ingredient: ${name}`);
            } catch (e) { /* ignore 404 */ }
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
                    { name: 'effects', type: 'text', required: false },
                    { name: 'thc_mg', type: 'number', required: false }
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
                        { name: 'effects', type: 'text', required: false },
                        { name: 'thc_mg', type: 'number', required: false }
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
            if (ing.image && (ing.image.startsWith('http') || ing.image.startsWith('/'))) {
                const blob = await downloadImage(ing.image);
                if (blob) {
                    const formData = new FormData();
                    formData.append('image', blob, `${ing.name.toLowerCase().replace(/\s+/g, '_')}.png`);

                    // Add other fields to FormData
                    for (const key in data) {
                        if (key !== 'image') {
                            formData.append(key, String(data[key]));
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



            // Remove image from data if we get here (meaning download failed or no image)
            // to avoid sending a URL string to a file field
            delete data.image;

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
                    ...collection.fields.filter(f => !['ingredients', 'ingredients_text', 'instructions', 'time', 'base_ingredients', 'base_ingredients_v2', 'base_ingredients_v3', 'base_ingredients_v4', 'base_ingredientes_v5', 'base_ingredients_json', 'ingredients_json', 'image'].includes(f.name)),
                    { name: 'image', type: 'file', required: false, options: { maxSelect: 1, maxSize: 5242880, mimeTypes: ['image/png', 'image/jpeg', 'image/webp'] } },
                    { name: 'ingredients_text', type: 'json' }, // Renamed from ingredients
                    { name: 'instructions', type: 'json' },
                    { name: 'time', type: 'text', required: false },
                    { name: 'ingredients', type: 'relation', collectionId: ingredientsCollectionId, options: { maxSelect: null, collectionId: ingredientsCollectionId } }, // New relation field
                    { name: 'ingredients_json', type: 'json' } // Fallback
                ],
                listRule: "",
                viewRule: "",
            });
            console.log('"recipes" schema updated.');

            // Verify schema immediately
            const updatedCollection = await pb.collections.getOne('recipes');
            const relationField = updatedCollection.fields.find(f => f.name === 'ingredients');
            console.log('[DEBUG] ingredients relation field:', JSON.stringify(relationField, null, 2));

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
                        { name: 'ingredients_text', type: 'json' },
                        { name: 'instructions', type: 'json' },
                        { name: 'time', type: 'text', required: false },
                        { name: 'total_votes', type: 'number', required: false },
                        { name: 'ingredients', type: 'relation', collectionId: ingredientsCollectionId, options: { maxSelect: null, collectionId: ingredientsCollectionId } },
                        { name: 'ingredients_json', type: 'json' }
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
            if (p.image && (p.image.startsWith('http') || p.image.startsWith('/'))) {
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

                // Helper to parse ingredient name from string
                function parseIngredientName(raw: string): string {
                    let name = raw;
                    const units = ['cup', 'cups', 'tbsp', 'tsp', 'oz', 'lb', 'lbs', 'g', 'kg', 'ml', 'l', 'pinch', 'dash', 'clove', 'cloves', 'small', 'medium', 'large', 'slice', 'slices', 'piece', 'pieces', 'can', 'cans', 'bottle', 'bottles', 'package', 'packages', 'bunch', 'bunches', 'sprig', 'sprigs', 'stalk', 'stalks', 'leaf', 'leaves', 'teaspoon', 'tablespoon', 'pound', 'pounds', 'ounce', 'ounces', 'gram', 'grams', 'liter', 'liters', 'milliliter', 'milliliters'];
                    const unitRegexStr = `^\\s*(${units.join('|')})\\s+(?:of\\s+)?`;
                    const quantityRegexStr = `^[\\d\\s\\/\\.\\-\\+]+`; // Include + for "1 cup + 2 tbsp"

                    // Iteratively remove quantity and unit patterns until clean
                    // e.g. "1 cup + 2 tbsp Sugar" -> "+ 2 tbsp Sugar" -> "Sugar"
                    // Also simple "1 egg" -> "egg"
                    let lastLen = name.length + 1;
                    while (name.length < lastLen) {
                        lastLen = name.length;
                        name = name.replace(new RegExp(quantityRegexStr), ''); // Remove leading numbers/symbols
                        name = name.replace(new RegExp(unitRegexStr, 'i'), ''); // Remove leading unit
                    }

                    // 3. Remove text after comma or parentheses (often prep info like ", chopped" or "(optional)")
                    name = name.split(',')[0].split('(')[0];

                    // 4. Special cases and cleanup
                    name = name.trim();
                    if (name.toLowerCase().startsWith('plus ')) name = name.substring(5).trim();

                    return name;
                }

                for (const ingString of recipe.ingredients_text) {
                    const parsedName = parseIngredientName(ingString);
                    if (!parsedName || parsedName.length < 2) continue; // Skip if empty or too short

                    // Check if ingredient exists in our map (case-insensitive check)
                    let foundId = Object.keys(ingredientMap).find(key => key.toLowerCase() === parsedName.toLowerCase());

                    if (foundId) {
                        recipeBaseIngredients.push(ingredientMap[foundId]);
                    } else {
                        // Check if it really exists in DB but not in map (double check)
                        // Or just create it
                        console.log(`Auto-creating ingredient: "${parsedName}" from "${ingString}"`);

                        try {
                            const newIngData = {
                                name: parsedName,
                                description: `Auto-generated ingredient from recipe import.`,
                                category: "Uncategorized",
                                image: null, // No image for auto-generated
                                calories: 0,
                                allergies: "None",
                                rarity: "Common",
                                effects: "None",
                                thc_mg: 0
                            };

                            // Check if it already exists in DB to avoid dupes
                            try {
                                const existingIng = await pb.collection('ingredients').getFirstListItem(`name="${parsedName}"`);
                                ingredientMap[parsedName] = existingIng.id;
                                recipeBaseIngredients.push(existingIng.id);
                                console.log(`  -> Found existing in DB, linked.`);
                            } catch (err: any) {
                                // Not found, create it
                                const record = await pb.collection('ingredients').create(newIngData);
                                ingredientMap[parsedName] = record.id;
                                recipeBaseIngredients.push(record.id);
                                console.log(`  -> Created new record.`);
                            }
                        } catch (e) {
                            console.error(`  -> Failed to auto-create ingredient "${parsedName}":`, e);
                        }
                    }
                }

                // Remove duplicates in the list
                const uniqueBaseIngredients = [...new Set(recipeBaseIngredients)];

                console.log(`[DEBUG] Recipe: ${recipe.title}`);
                console.log(`[DEBUG] Base Ingredients Count: ${uniqueBaseIngredients.length}`);
                console.log(`[DEBUG] Base Ingredients IDs:`, uniqueBaseIngredients);

                const existing = await pb.collection('recipes').getList(1, 1, { filter: `title="${recipe.title}"` });
                const shuffled = productIds.sort(() => 0.5 - Math.random());
                const selectedProducts = shuffled.slice(0, 2);

                const recipeData: any = {
                    ...recipe,
                    products: selectedProducts,
                    // ingredients relation populated in 2nd step
                };

                // Handle image upload
                if (recipe.image && (recipe.image.startsWith('http') || recipe.image.startsWith('/'))) {
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

                        let recordId;
                        if (existing.items.length === 0) {
                            const record = await pb.collection('recipes').create(formData);
                            recordId = record.id;
                            console.log(`Created recipe (with image): ${recipe.title}`);
                        } else {
                            const record = await pb.collection('recipes').update(existing.items[0].id, formData);
                            recordId = record.id;
                            console.log(`Updated recipe (with image): ${recipe.title}`);
                        }

                        // Update relations
                        await pb.collection('recipes').update(recordId, {
                            ingredients: uniqueBaseIngredients,
                            ingredients_json: uniqueBaseIngredients
                        });
                        console.log(`Linked ${uniqueBaseIngredients.length} ingredients to ${recipe.title}`);

                        continue;
                    }
                }

                if (existing.items.length === 0) {
                    delete recipeData.image;

                    const created = await pb.collection('recipes').create(recipeData);
                    console.log(`Created recipe shell: ${recipe.title}`);

                    await pb.collection('recipes').update(created.id, {
                        ingredients: uniqueBaseIngredients, // New relation field
                        ingredients_json: uniqueBaseIngredients // Fallback
                    });
                    console.log(`Linked ${uniqueBaseIngredients.length} ingredients to ${recipe.title}`);

                    // Verify
                    const verify = await pb.collection('recipes').getOne(created.id);
                    console.log(`[VERIFY] ingredients relation count: ${Array.isArray(verify.ingredients) ? verify.ingredients.length : (verify.ingredients ? 1 : 0)}`);
                    console.log(`[VERIFY] json count: ${Array.isArray(verify.ingredients_json) ? verify.ingredients_json.length : 0}`);

                } else {
                    await pb.collection('recipes').delete(existing.items[0].id);

                    delete recipeData.image;

                    const created = await pb.collection('recipes').create(recipeData);
                    console.log(`Re-created recipe shell: ${recipe.title}`);

                    await pb.collection('recipes').update(created.id, {
                        ingredients: uniqueBaseIngredients, // New relation field
                        ingredients_json: uniqueBaseIngredients
                    });
                    console.log(`Linked ${uniqueBaseIngredients.length} ingredients to ${recipe.title}`);

                    // Verify
                    const verify = await pb.collection('recipes').getOne(created.id);
                    console.log(`[VERIFY] ingredients relation count: ${Array.isArray(verify.ingredients) ? verify.ingredients.length : (verify.ingredients ? 1 : 0)}`);
                    console.log(`[VERIFY] json count: ${Array.isArray(verify.ingredients_json) ? verify.ingredients_json.length : 0}`);
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

