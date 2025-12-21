import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const recipes = [
    {
        title: "Misty Mountain Tea",
        category: "Beverage",
        difficulty: 2,
        image: "https://placehold.co/400x400/png?text=Tea+Pixel",
        price: "15 GP",
        description: "A calming tea harvested from the misty peaks."
    },
    {
        title: "Goblin's Green Brownie",
        category: "Edible",
        difficulty: 4,
        image: "https://placehold.co/400x400/22c55e/black/png?text=Brownie",
        price: "25 GP",
        description: "A chewy treat with a magical kick."
    },
    {
        title: "Elixir of Relaxation",
        category: "Potion",
        difficulty: 1,
        image: "https://placehold.co/400x400/3b82f6/white/png?text=Elixir",
        price: "50 GP",
        description: "Instantly calms the nerves."
    },
    {
        title: "Dwarven Stout",
        category: "Beverage",
        difficulty: 3,
        image: "https://placehold.co/400x400/713f12/white/png?text=Stout",
        price: "10 GP",
        description: "Thick, dark, and strong."
    },
    {
        title: "Fairy Dust Cupcake",
        category: "Edible",
        difficulty: 5,
        image: "https://placehold.co/400x400/e879f9/white/png?text=Cupcake",
        price: "30 GP",
        description: "Light as air and sparkles in the dark."
    }
];

async function main() {
    try {
        // Authenticate as admin
        // You can replace these with your admin credentials
        const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
        const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';

        console.log(`Authenticating as ${adminEmail}...`);
        await pb.admins.authWithPassword(adminEmail, adminPassword);

        console.log('Checking for "recipes" collection...');

        try {
            await pb.collections.getOne('recipes');
            console.log('"recipes" collection already exists.');
        } catch (err: any) {
            if (err.status === 404) {
                console.log('Creating "recipes" collection...');
                await pb.collections.create({
                    name: 'recipes',
                    type: 'base',
                    fields: [
                        { name: 'title', type: 'text', required: true },
                        { name: 'category', type: 'text', required: true },
                        { name: 'difficulty', type: 'number', required: false },
                        { name: 'image', type: 'url', required: false },
                        { name: 'price', type: 'text', required: false },
                        { name: 'description', type: 'text', required: false }
                    ]
                });
            } else {
                throw err;
            }
        }

        console.log('Seeding data...');
        for (const recipe of recipes) {
            try {
                // Check if recipe exists to avoid duplicates (optional, based on title)
                const existing = await pb.collection('recipes').getList(1, 1, {
                    filter: `title = "${recipe.title}"`
                });

                if (existing.items.length === 0) {
                    await pb.collection('recipes').create(recipe);
                    console.log(`Created: ${recipe.title}`);
                } else {
                    console.log(`Skipped (already exists): ${recipe.title}`);
                }
            } catch (e) {
                console.error(`Failed to create ${recipe.title}:`, e);
            }
        }

        console.log('Done!');

    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

main();
