import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        const title = "Rollitos Índicos de Gambas con Salsa de Mango";
        console.log(`Fetching recipe "${title}"...`);
        const result = await pb.collection('recipes').getList(1, 1, {
            filter: `title="${title}"`,
            expand: 'products,ingredients'
        });

        if (result.items.length > 0) {
            const recipe = result.items[0];
            console.log(JSON.stringify(recipe, null, 2));

            // Frontend Simulation
            if (recipe.ingredients_json && Array.isArray(recipe.ingredients_json)) {
                console.log(`[FRONTEND SIM] Found ${recipe.ingredients_json.length} IDs in JSON.`);

                // Check relation field as well
                if (recipe.expand && recipe.expand.ingredients) {
                    const relation = Array.isArray(recipe.expand.ingredients) ? recipe.expand.ingredients : [recipe.expand.ingredients];
                    console.log(`[RELATION CHECK] Found ${relation.length} ingredients via 'ingredients' relation.`);
                } else {
                    console.log(`[RELATION CHECK] No ingredients found via 'ingredients' relation.`);
                    console.log(`[RAW FIELD]`, recipe.ingredients);
                }

                const filter = recipe.ingredients_json.map((id: string) => `id="${id}"`).join(' || ');
                const ingredients = await pb.collection('ingredients').getFullList({ filter });
                console.log(`[FRONTEND SIM] Manually fetched ${ingredients.length} ingredients.`);
                if (ingredients.length === 23) {
                    console.log("[SUCCESS] All ingredients visible via JSON workaround.");
                } else {
                    console.log("[FAILURE] Count mismatch.");
                }
            } else {
                console.log("[FRONTEND SIM] No JSON data found.");
            }

        } else {
            console.log("Recipe not found.");
        }
    } catch (err) {
        console.error('Error fetching recipe:', err);
    }
}

main();
