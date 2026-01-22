import PocketBase from 'pocketbase';
import fs from 'fs/promises';
import path from 'path';

const pb = new PocketBase('http://127.0.0.1:8090');

// Extended Recipe Type
interface SeedRecipe {
    title: string;
    category: string[];
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
        category: ["Appetizer"],
        difficulty: 3,
        image: "/Users/madacluster/.gemini/antigravity/brain/b49f8f83-0252-46ca-b848-327a88c4a5e8/prawn_rolls_pixel_1768934862014.png",
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
            "1. Make Sauce: Blend mango, garlic, sugar, 1 tbsp ginger, habanero, orange juice, vinegar, and 1 tsp THC Oil until smooth.",
            "2. Prepare Filling: Heat 1 tbsp THC Oil. Sauté mushrooms, soy sauce, sesame oil, chopped garlic, shallot, carrots, peppers, cabbage, chili paste, lime juice, green onions, ginger, and cilantro. Cool.",
            "3. Prepare Shrimp: Coat shrimp in cornstarch. Fry in oil until cooked. Chop and mix with filling.",
            "4. Assemble: Place filling in wrappers, brush edges with egg, and roll tightly.",
            "5. Fry: Fry rolls in remaining oil until golden brown. Serve with mango sauce."
        ]
    },
    {
        title: "Cannabis Infused Chicken Wings",
        category: ["Chicken"],
        difficulty: 3,
        image: "/Users/madacluster/.gemini/antigravity/brain/b49f8f83-0252-46ca-b848-327a88c4a5e8/chicken_wings_pixel_1768934876731.png",
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
    },
    {
        title: "Rasta Pasta",
        category: ["Pasta"],
        difficulty: 2,
        image: "/Users/madacluster/.gemini/antigravity/brain/b49f8f83-0252-46ca-b848-327a88c4a5e8/rasta_pasta_pixel_1768934891872.png",
        price: "40 GP",
        description: "A colorful Jamaican-inspired pasta with jerk seasoning and a creamy cannabis coconut milk sauce.",
        time: "30 MIN",
        ingredients_text: [
            "12 oz Penne Pasta",
            "1 each Red, Green, and Yellow Bell Pepper, sliced",
            "2 tbsp Jerk Seasoning",
            "1 Cup Heavy Cream",
            "1/2 Cup Cannabis Infused Coconut Oil",
            "3 Green Onions, chopped",
            "1/2 Cup Parmesan Cheese"
        ],
        instructions: [
            "1. Cook penne according to package directions.",
            "2. In a large skillet, melt Cannabis Coconut Oil over medium heat. Sauté bell peppers until tender.",
            "3. Stir in jerk seasoning, then add heavy cream. Bring to a light simmer.",
            "4. Add cooked pasta and parmesan cheese to the skillet. Toss until the sauce thickens and coats the pasta.",
            "5. Garnish with green onions and serve warm."
        ]
    },
    {
        title: "Canna-Linguini",
        category: ["Pasta"],
        difficulty: 2,
        image: "/Users/madacluster/.gemini/antigravity/brain/b49f8f83-0252-46ca-b848-327a88c4a5e8/canna_linguini_pixel_1768934914976.png",
        price: "32 GP",
        description: "A simple yet elegant linguini tossed in a lemon-garlic cannabis butter sauce.",
        time: "20 MIN",
        ingredients_text: [
            "12 oz Linguini",
            "4 Cloves Garlic, minced",
            "1/4 Cup Cannabis Infused Butter",
            "1/4 Cup Extra Virgin Olive Oil",
            "1 Lemon, zested and juiced",
            "1/4 tsp Red Pepper Flakes",
            "1/4 Cup Fresh Parsley, chopped"
        ],
        instructions: [
            "1. Boil linguini in salted water until al dente.",
            "2. In a pan, combine olive oil and Cannabis Infused Butter over low-medium heat.",
            "3. Sauté garlic and red pepper flakes for 1-2 minutes (do not burn the garlic).",
            "4. Add lemon juice and zest. Toss in the cooked linguini.",
            "5. Remove from heat, stir in parsley, and serve immediately."
        ]
    },
    {
        title: "Pumpkin Cream",
        category: ["Creams and Soups"],
        difficulty: 1,
        image: "/Users/madacluster/.gemini/antigravity/brain/b49f8f83-0252-46ca-b848-327a88c4a5e8/pumpkin_cream_pixel_1768934930905.png",
        price: "22 GP",
        description: "Velvety pumpkin soup infused with THC oil for a warming, relaxing experience.",
        time: "35 MIN",
        ingredients_text: [
            "2 Cups Pumpkin Purée",
            "1 Onion, diced",
            "2 Cups Vegetable Broth",
            "1/2 Cup Heavy Cream",
            "1 tbsp THC Oil",
            "1/2 tsp Nutmeg",
            "Salt and Pepper to taste"
        ],
        instructions: [
            "1. Sauté onions in a pot until translucent.",
            "2. Stir in pumpkin purée, vegetable broth, and nutmeg. Bring to a boil, then simmer for 15 minutes.",
            "3. Use an immersion blender to smooth the soup.",
            "4. Stir in heavy cream and THC Oil. Do not let it boil after adding the THC oil.",
            "5. Season and serve with a swirl of cream on top."
        ]
    },
    {
        title: "Chickpeas Cream with Bacon",
        category: ["Creams and Soups"],
        difficulty: 2,
        image: "/Users/madacluster/.gemini/antigravity/brain/b49f8f83-0252-46ca-b848-327a88c4a5e8/chickpea_bacon_pixel_1768934947162.png",
        price: "28 GP",
        description: "Hearty chickpea purée topped with crispy bacon and infused with cannabis oil.",
        time: "40 MIN",
        ingredients_text: [
            "2 Cans (15oz) Chickpeas, drained",
            "4 Slices Bacon, chopped",
            "1 Onion, chopped",
            "2 Cloves Garlic",
            "3 Cups Chicken Broth",
            "1 tbsp Cannabis Infused Oil",
            "1 tsp Cumin"
        ],
        instructions: [
            "1. In a pot, fry bacon until crispy. Remove bacon and set aside, keeping the fat in the pot.",
            "2. Sauté onion and garlic in the bacon fat. Add cumin and chickpeas.",
            "3. Add chicken broth and simmer for 20 minutes.",
            "4. Blend the mixture until completely smooth.",
            "5. Stir in the Cannabis Infused Oil and top with the crispy bacon bits before serving."
        ]
    },
    {
        title: "Ceviche Tropical",
        category: ["Fish and Seafood", "Appetizers"],
        difficulty: 3,
        image: "/Users/madacluster/.gemini/antigravity/brain/e899239d-7e1c-461f-b948-6b548bc07dac/ceviche_tropical_pixel_1768144438627.png",
        price: "48 GP",
        description: "Fresh white fish cured in lime juice and infused citrus-cannabis oil.",
        time: "25 MIN",
        ingredients_text: [
            "1 lb Fresh White Fish (Sea Bass or Tilapia), cubed",
            "1/2 Cup Lime Juice",
            "1/2 Red Onion, thinly sliced",
            "1/4 Cup Cilantro, chopped",
            "1 tsp Cannabis Infused Grapeseed Oil",
            "1 Sweet Potato, boiled and sliced",
            "1 Corn on the cob, kernels removed"
        ],
        instructions: [
            "1. In a glass bowl, combine the fish and lime juice. Ensure fish is submerged. Refrigerate for 15-20 minutes.",
            "2. Drain about half the lime juice.",
            "3. Add red onion, cilantro, and corn kernels.",
            "4. Gently fold in the Cannabis Infused Grapeseed Oil.",
            "5. Serve cold on a plate with slices of sweet potato on the side."
        ]
    },
    {
        title: "Classic Pot Brownies",
        category: ["Dessert"],
        difficulty: 2,
        image: "/Users/madacluster/.gemini/antigravity/brain/46cc6c03-a365-46bd-8587-58b9fd6c9e8b/pot_brownies_1767559535857.png",
        price: "20 GP",
        description: "Fudgy, rich chocolate brownies with a magical kick. A classic favorite.",
        time: "45 MIN",
        ingredients_text: [
            "1/2 Cup Cannabis Infused Butter, melted",
            "1 Cup White Sugar",
            "2 Eggs",
            "1 tsp Vanilla Extract",
            "1/3 Cup Unsweetened Cocoa Powder",
            "1/2 Cup All-Purpose Flour",
            "1/4 tsp Salt",
            "1/4 tsp Baking Powder"
        ],
        instructions: [
            "1. Preheat oven to 350°F (175°C). Grease and flour an 8-inch square pan.",
            "2. In a large bowl, mix melted cannabis butter and sugar. Beat in eggs and vanilla.",
            "3. In a separate bowl, whisk cocoa, flour, salt, and baking powder. Stir into the wet mixture.",
            "4. Pour batter into the prepared pan.",
            "5. Bake for 25 to 30 minutes. Do not overcook.",
            "6. Cool completely before cutting into squares."
        ]
    },
    {
        title: "Creamy Canna-Pesto Pasta",
        category: ["Pasta"],
        difficulty: 2,
        image: "/Users/madacluster/.gemini/antigravity/brain/e899239d-7e1c-461f-b948-6b548bc07dac/creamy_canna_pesto_pasta_pixel_1768144463741.png",
        price: "30 GP",
        description: "Fresh basil pesto with pine nuts and a potent infusion of cannabis olive oil.",
        time: "25 MIN",
        ingredients_text: [
            "12 oz Linguine or Spaghetti",
            "2 Cups Fresh Basil Leaves",
            "1/2 Cup Parmesan Cheese, grated",
            "1/3 Cup Pine Nuts, toasted",
            "3 Cloves Garlic",
            "1/4 Cup Cannabis Infused Olive Oil",
            "1/4 Cup Extra Virgin Olive Oil",
            "1/2 tsp Salt",
            "1/4 tsp Black Pepper"
        ],
        instructions: [
            "1. Boil Pasta: Cook pasta in salted water according to package directions. Reserve 1/2 cup pasta water.",
            "2. Blend Pesto: In a food processor, pulse basil, garlic, and pine nuts until coarsely chopped.",
            "3. Emulsify: While blending, slowly drizzle in the Extra Virgin Olive Oil and the Cannabis Infused Olive Oil.",
            "4. Combine: Stir in Parmesan cheese, salt, and pepper.",
            "5. Toss: Mix the pesto with the warm pasta, adding reserved water if needed for creaminess. Do not boil the sauce to preserve THC potency."
        ]
    },
    {
        title: "Honey-Glazed Salmon with Infused Butter",
        category: ["Fish and Seafood"],
        difficulty: 3,
        image: "https://dummyimage.com/600x400/cccccc/000000.png?text=Infused+Salmon",
        price: "55 GP",
        description: "Pan-seared salmon fillet finished with a sweet honey and cannabis-butter glaze.",
        time: "30 MIN",
        ingredients_text: [
            "2 Salmon Fillets (6 oz each)",
            "2 tbsp Honey",
            "1 tbsp Soy Sauce",
            "1 tbsp Lemon Juice",
            "2 tbsp Cannabis Infused Butter",
            "1 tsp Smoked Paprika",
            "1/2 tsp Black Pepper",
            "1 tbsp Olive Oil (for searing)"
        ],
        instructions: [
            "1. Season: Pat salmon dry and season with salt, pepper, and smoked paprika.",
            "2. Sear: Heat olive oil in a pan over medium-high heat. Sear salmon skin-side down for 4-5 minutes. Flip and cook for 2 more minutes.",
            "3. Make Glaze: In a small bowl, whisk honey, soy sauce, and lemon juice.",
            "4. Finish: Lower heat to low. Add the honey mixture and the Cannabis Infused Butter to the pan. Spoon the melting butter and glaze over the salmon for 1-2 minutes until glossy.",
            "5. Serve: Plate immediately, pouring any remaining pan sauce over the fish."
        ]
    },
    {
        title: "Infused Guacamole",
        category: ["Appetizer"],
        difficulty: 1,
        image: "/Users/madacluster/.gemini/antigravity/brain/46cc6c03-a365-46bd-8587-58b9fd6c9e8b/infused_guacamole_1767559550681.png",
        price: "15 GP",
        description: "Fresh, zesty guacamole infused with cannabis oil. Perfect for sharing.",
        time: "15 MIN",
        ingredients_text: [
            "3 Ripe Avocados, peeled and pitted",
            "1 Lime, juiced",
            "1 tsp Salt",
            "1/2 Cup Diced Onion",
            "3 tbsp Fresh Cilantro, chopped",
            "2 Tomatoes, diced",
            "1 tsp Minced Garlic",
            "1 tbsp Cannabis Infused Oil"
        ],
        instructions: [
            "In a medium bowl, mash avocados with lime juice and salt.",
            "Mix in onion, cilantro, tomatoes, and garlic.",
            "Stir in the cannabis infused oil until well distributed.",
            "Refrigerate for 10 minutes to let flavors blend before serving."
        ]
    },
    {
        title: "Cannabis Green Tea",
        category: ["Drink"],
        difficulty: 1,
        image: "/Users/madacluster/.gemini/antigravity/brain/46cc6c03-a365-46bd-8587-58b9fd6c9e8b/cannabis_tea_1767559565193.png",
        price: "10 GP",
        description: "A soothing warm tea infused with cannabis butter or oil. Great for relaxation.",
        time: "10 MIN",
        ingredients_text: [
            "1 Green Tea Bag",
            "1 Cup Boiling Water",
            "1 tsp Cannabis Infused Butter or Oil",
            "1 tsp Honey (optional)",
            "Lemon slice (optional)"
        ],
        instructions: [
            "Place the tea bag and cannabis butter/oil in a mug.",
            "Pour boiling water over the tea bag and oil.",
            "Steep for 3-5 minutes.",
            "Remove tea bag, stir well to help oil disperse (or use a little milk/cream to bind).",
            "Add honey and lemon if desired."
        ]
    },
    {
        title: "Tropical Mango Canna-Salad",
        category: ["Salad"],
        difficulty: 1,
        image: "https://dummyimage.com/600x400/cccccc/000000.png?text=Mango+Salad",
        price: "18 GP",
        description: "A refreshing, vibrant mango salad with a zesty lime and cannabis-infused honey dressing.",
        time: "15 MIN",
        ingredients_text: [
            "2 Ripe Mangoes, cubed",
            "1 Red Bell Pepper, finely diced",
            "1/2 Red Onion, thinly sliced",
            "1/4 Cup Fresh Cilantro, chopped",
            "1 Jalapeño, seeded and minced",
            "2 tbsp Lime Juice",
            "1 tbsp Cannabis Infused Honey",
            "1 tbsp Extra Virgin Olive Oil"
        ],
        instructions: [
            "1. In a large bowl, combine the cubed mangoes, bell pepper, red onion, cilantro, and jalapeño.",
            "2. In a small jar or bowl, whisk together the lime juice, Cannabis Infused Honey, and olive oil until emulsified.",
            "3. Pour the dressing over the salad and toss gently to coat.",
            "4. Let it sit for 5 minutes in the fridge before serving to let the flavors meld."
        ]
    },
    {
        title: "Infused Tuna, Egg & Asparagus Salad",
        category: ["Salad"],
        difficulty: 2,
        image: "https://dummyimage.com/600x400/cccccc/000000.png?text=Tuna+Asparagus+Salad",
        price: "28 GP",
        description: "A protein-packed salad featuring blanched asparagus, hard-boiled eggs, and tuna with a cannabis-vinaigrette.",
        time: "25 MIN",
        ingredients_text: [
            "1 bunch Asparagus, ends trimmed",
            "2 Large Eggs",
            "1 Can (5oz) High-quality Tuna, drained",
            "1 Cup Cherry Tomatoes, halved",
            "1 tbsp Cannabis Infused Olive Oil",
            "1 tbsp Dijon Mustard",
            "1 tbsp Apple Cider Vinegar",
            "Salt and Black Pepper to taste"
        ],
        instructions: [
            "1. Blanch Asparagus: Cook asparagus in boiling water for 3 minutes, then immediately plunge into ice water. Drain and pat dry.",
            "2. Boil Eggs: Place eggs in boiling water for 9 minutes for a hard boil. Peel and quarter.",
            "3. Make Vinaigrette: Whisk the Cannabis Infused Olive Oil, Dijon mustard, and vinegar until smooth. Season with salt and pepper.",
            "4. Assemble: Lay the asparagus on a platter. Top with flaked tuna, cherry tomatoes, and egg quarters.",
            "5. Finish: Drizzle the cannabis vinaigrette over the top just before serving."
        ]
    },
    {
        title: "Cannabis-Infused Ribeye Steak",
        category: ["Meat"],
        difficulty: 4,
        image: "https://placehold.co/600x400/444/fff?text=Ribeye+Steak",
        price: "75 GP",
        description: "A premium ribeye steak grilled to perfection and topped with a potent cannabis-infused herb butter.",
        time: "35 MIN",
        ingredients_text: [
            "1 lb Ribeye Steak",
            "2 tbsp Cannabis Infused Butter",
            "1 tbsp Fresh Rosemary, chopped",
            "2 Cloves Garlic, minced",
            "Salt and Black Pepper to taste",
            "1 tbsp Olive Oil"
        ],
        instructions: [
            "1. Season the steak generously with salt and pepper on both sides.",
            "2. Heat olive oil in a cast-iron skillet over high heat until smoking.",
            "3. Sear the steak for 3-4 minutes per side for medium-rare.",
            "4. In a small bowl, mix the Cannabis Infused Butter with rosemary and minced garlic.",
            "5. Remove steak from heat and immediately top with the infused herb butter. Let it rest for 5 minutes before serving."
        ]
    },
    {
        title: "Space Cakes with Cannabutter Frosting",
        category: ["Dessert"],
        difficulty: 3,
        image: "https://placehold.co/600x400/444/fff?text=Space+Cakes",
        price: "30 GP",
        description: "Light and fluffy chocolate cupcakes with a rich, medicated green frosting.",
        time: "55 MIN",
        ingredients_text: [
            "1 1/2 Cups All-Purpose Flour",
            "1 Cup Sugar",
            "1/2 Cup Cocoa Powder",
            "1 tsp Baking Soda",
            "1/2 Cup Vegetable Oil",
            "1 Cup Water",
            "1 tsp Vanilla Extract",
            "1/2 Cup Cannabis Infused Butter (for frosting)",
            "2 Cups Powdered Sugar",
            "2 tbsp Milk",
            "Green Food Coloring"
        ],
        instructions: [
            "1. Preheat oven to 350°F (175°C) and line a cupcake tin.",
            "2. Whisk flour, sugar, cocoa, and baking soda. Add oil, water, and vanilla. Mix until smooth.",
            "3. Pour into liners and bake for 20-22 minutes. Cool completely.",
            "4. Make Frosting: Beat Cannabis Infused Butter until creamy. Gradually add powdered sugar, milk, and food coloring.",
            "5. Frost the cooled cupcakes and enjoy responsibly."
        ]
    },
    {
        title: "High-Tide Cannabis Margarita",
        category: ["Drink"],
        difficulty: 2,
        image: "https://placehold.co/600x400/444/fff?text=Canna-Margarita",
        price: "25 GP",
        description: "A zesty, refreshing margarita infused with a touch of cannabis tincture or oil.",
        time: "10 MIN",
        ingredients_text: [
            "2 oz Tequila",
            "1 oz Lime Juice",
            "1/2 oz Agave Nectar",
            "1 tsp THC Oil",
            "Salt (for rim)",
            "Lime slice (for garnish)",
            "Ice cubes"
        ],
        instructions: [
            "1. Rim a glass with salt using a lime wedge.",
            "2. In a shaker, combine tequila, lime juice, agave nectar, and THC Oil.",
            "3. Add ice and shake vigorously for 15 seconds.",
            "4. Strain into the prepared glass over fresh ice.",
            "5. Garnish with a lime slice."
        ]
    },
    {
        title: "Garlic & Herb Infused Hummus",
        category: ["Appetizer"],
        difficulty: 1,
        image: "https://placehold.co/600x400/444/fff?text=Infused+Hummus",
        price: "18 GP",
        description: "Creamy, homemade hummus infused with cannabis olive oil and plenty of garlic.",
        time: "15 MIN",
        ingredients_text: [
            "1 Can (15oz) Chickpeas, drained and rinsed",
            "1/4 Cup Tahini",
            "2 tbsp Lemon Juice",
            "2 Cloves Garlic, minced",
            "2 tbsp Cannabis Infused Olive Oil",
            "1/2 tsp Cumin",
            "Salt to taste",
            "Paprika and Parsley (for garnish)"
        ],
        instructions: [
            "1. Combine chickpeas, tahini, lemon juice, garlic, and cumin in a food processor.",
            "2. Pulse while slowly drizzling in the Cannabis Infused Olive Oil until smooth.",
            "3. Add a splash of water if needed to reach desired consistency.",
            "4. Season with salt. Transfer to a bowl.",
            "5. Garnish with paprika, parsley, and an extra drizzle of oil. Serve with pita or veggies."
        ]
    },
    {
        title: "Canna-infused Avocado Toast",
        category: ["Appetizer"],
        difficulty: 2,
        image: "https://placehold.co/600x400/444/fff?text=Avocado+Toast",
        price: "22 GP",
        description: "The ultimate breakfast quest: sourdough toast topped with creamy avocado and a cannabis-oil drizzle.",
        time: "15 MIN",
        ingredients_text: [
            "1 Slice Sourdough Bread",
            "1/2 Ripe Avocado",
            "1 tsp Cannabis Infused Oil",
            "1 Large Egg (optional, poached)",
            "Red Pepper Flakes",
            "Salt and Black Pepper",
            "Lemon wedge"
        ],
        instructions: [
            "1. Toast the sourdough bread until golden and crisp.",
            "2. In a small bowl, mash the avocado with a squeeze of lemon, salt, and pepper.",
            "3. Spread the avocado over the toast.",
            "4. If using, poach the egg for 3 minutes and place it on top of the avocado.",
            "5. Drizzle with Cannabis Infused Oil and sprinkle with red pepper flakes."
        ]
    },
    {
        title: "Potent Pasta a la Vodka",
        category: ["Pasta"],
        difficulty: 3,
        image: "https://placehold.co/600x400/444/fff?text=Pasta+Vodka",
        price: "35 GP",
        description: "A rich, creamy tomato sauce with a splash of vodka and a potent cannabis infusion.",
        time: "30 MIN",
        ingredients_text: [
            "12 oz Penne Pasta",
            "1 tbsp Cannabis Infused Butter",
            "2 Cloves Garlic, minced",
            "1/2 Cup Vodka",
            "1 Can (28oz) Crushed Tomatoes",
            "1/2 Cup Heavy Cream",
            "1/4 Cup Parmesan Cheese",
            "Fresh Basil"
        ],
        instructions: [
            "1. Cook pasta according to package directions.",
            "2. Sauté garlic in Cannabis Infused Butter over medium heat.",
            "3. Add vodka and simmer for 2 minutes. Stir in tomatoes and simmer for 10 minutes.",
            "4. Stir in cream and parmesan. Toss with pasta and garnish with basil."
        ]
    },
    {
        title: "Cosmic Curry",
        category: ["Creams and Soups"],
        difficulty: 3,
        image: "https://placehold.co/600x400/444/fff?text=Cosmic+Curry",
        price: "28 GP",
        description: "A spicy, fragrant chickpea curry infused with cannabis coconut oil.",
        time: "40 MIN",
        ingredients_text: [
            "2 Cans Chickpeas",
            "1 Onion, diced",
            "2 tbsp Curry Powder",
            "1 Can Coconut Milk",
            "2 tbsp Cannabis Infused Coconut Oil",
            "Fresh Spinach",
            "Rice for serving"
        ],
        instructions: [
            "1. Sauté onion in Cannabis Coconut Oil. Add curry powder and cook until fragrant.",
            "2. Add chickpeas and coconut milk. Simmer for 20 minutes.",
            "3. Stir in spinach until wilted. Serve over rice."
        ]
    },
    {
        title: "Herbal Gnocchi",
        category: ["Pasta"],
        difficulty: 4,
        image: "https://placehold.co/600x400/444/fff?text=Herbal+Gnocchi",
        price: "42 GP",
        description: "Hand-rolled potato gnocchi served with a cannabis-infused sage butter sauce.",
        time: "1 HR",
        ingredients_text: [
            "1 lb Potato Gnocchi",
            "4 tbsp Cannabis Infused Butter",
            "10 Fresh Sage Leaves",
            "Parmesan Cheese",
            "Lemon Zest"
        ],
        instructions: [
            "1. Cook gnocchi in boiling water until they float.",
            "2. Melt Cannabis Infused Butter in a pan. Add sage leaves and fry until crisp.",
            "3. Toss gnocchi in the butter sauce. Top with parmesan and lemon zest."
        ]
    },
    {
        title: "Mary Jane's Muffins",
        category: ["Dessert"],
        difficulty: 2,
        image: "https://placehold.co/600x400/444/fff?text=Muffins",
        price: "15 GP",
        description: "Moist blueberry muffins with a secret ingredient in every bite.",
        time: "35 MIN",
        ingredients_text: [
            "1 1/2 Cups Flour",
            "3/4 Cup Sugar",
            "2 tsp Baking Powder",
            "1/3 Cup Cannabis Infused Oil",
            "1 Egg",
            "1/3 Cup Milk",
            "1 Cup Fresh Blueberries"
        ],
        instructions: [
            "1. Preheat oven to 400°F (200°C).",
            "2. Mix dry ingredients. Combine oil, egg, and milk; stir into dry ingredients.",
            "3. Fold in blueberries. Bake for 20-25 minutes."
        ]
    },
    {
        title: "Magical Mushroom Risotto",
        category: ["Pasta"],
        difficulty: 4,
        image: "https://placehold.co/600x400/444/fff?text=Mushroom+Risotto",
        price: "50 GP",
        description: "Creamy arborio rice with earthy mushrooms and a potent cannabis butter finish.",
        time: "45 MIN",
        ingredients_text: [
            "1 1/2 Cups Arborio Rice",
            "1 lb Mixed Mushrooms",
            "4 Cups Vegetable Broth",
            "1/2 Cup White Wine",
            "2 tbsp Cannabis Infused Butter",
            "Shallots and Garlic"
        ],
        instructions: [
            "1. Sauté shallots and mushrooms. Add rice and toast slightly.",
            "2. Add wine, then broth one ladle at a time, stirring until absorbed.",
            "3. Finish by stirring in Cannabis Infused Butter and parmesan."
        ]
    },
    {
        title: "High-Octane Banana Bread",
        category: ["Dessert"],
        difficulty: 2,
        image: "https://placehold.co/600x400/444/fff?text=Banana+Bread",
        price: "20 GP",
        description: "Sweet, moist banana bread infused with cannabis coconut oil.",
        time: "1 HR 10 MIN",
        ingredients_text: [
            "3 Ripe Bananas",
            "1/3 Cup Cannabis Infused Coconut Oil",
            "3/4 Cup Sugar",
            "1 Egg",
            "1 1/2 Cups Flour",
            "1 tsp Baking Soda"
        ],
        instructions: [
            "1. Mash bananas and mix with melted oil and sugar.",
            "2. Add egg, then fold in flour and baking soda.",
            "3. Bake at 350°F (175°C) for 60 minutes."
        ]
    },
    {
        title: "Chronic Chocolate Chip Cookies",
        category: ["Dessert"],
        difficulty: 2,
        image: "https://placehold.co/600x400/444/fff?text=Cookies",
        price: "12 GP",
        description: "Classic chewy cookies with a very special kind of butter.",
        time: "25 MIN",
        ingredients_text: [
            "1/2 Cup Cannabis Infused Butter",
            "1/2 Cup Sugar",
            "1/2 Cup Brown Sugar",
            "1 Egg",
            "1 1/2 Cups Flour",
            "1 Cup Chocolate Chips"
        ],
        instructions: [
            "1. Cream butter and sugars. Add egg.",
            "2. Mix in flour, then chocolate chips.",
            "3. Bake at 350°F (175°C) for 10-12 minutes."
        ]
    }
];

const ingredientsData = [
    { name: "THC Oil", description: "Potent cannabis-infused oil for cooking.", category: "Oil", image: "/Users/madacluster/.gemini/antigravity/brain/6b8a391d-bdd6-4ba0-b8c0-b84350f7f51e/ingredient_thc_oil_1766488904968.png", calories: 120, allergies: "None", rarity: "Common", effects: "Relaxation, Euphoria", thc_mg: 50 },
    { name: "Mango", description: "Sweet, ripe mango.", category: "Fruit", image: "/Users/madacluster/.gemini/antigravity/brain/6b8a391d-bdd6-4ba0-b8c0-b84350f7f51e/ingredient_mango_1766488918269.png", calories: 60, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Rock Shrimp", description: "Fresh rock shrimp.", category: "Seafood", image: "/Users/madacluster/.gemini/antigravity/brain/6b8a391d-bdd6-4ba0-b8c0-b84350f7f51e/ingredient_rock_shrimp_1766488935333.png", calories: 90, allergies: "Shellfish", rarity: "Common", effects: "None", thc_mg: 0 },
    // New Ingredients for Chicken Wings
    { name: "Chicken Wings", description: "Fresh chicken wings.", category: "Meat", image: "/Users/madacluster/.gemini/antigravity/brain/6b8a391d-bdd6-4ba0-b8c0-b84350f7f51e/ingredient_chicken_wings_raw_1766488968955.png", calories: 200, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Vegetable Oil", description: "Standard cooking oil.", category: "Oil", image: "/Users/madacluster/.gemini/antigravity/brain/6b8a391d-bdd6-4ba0-b8c0-b84350f7f51e/ingredient_vegetable_oil_1766488988239.png", calories: 120, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Baking Powder", description: "Leavening agent.", category: "Baking", image: "/Users/madacluster/.gemini/antigravity/brain/6b8a391d-bdd6-4ba0-b8c0-b84350f7f51e/ingredient_baking_powder_1766490166632.png", calories: 5, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Salt", description: "Table salt.", category: "Seasoning", image: "/Users/madacluster/.gemini/antigravity/brain/6b8a391d-bdd6-4ba0-b8c0-b84350f7f51e/ingredient_salt_1766490185666.png", calories: 0, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Sunflower Lecithin", description: "Emulsifier to help bind THC.", category: "Supplement", image: "/Users/madacluster/.gemini/antigravity/brain/6b8a391d-bdd6-4ba0-b8c0-b84350f7f51e/ingredient_sunflower_lecithin_1766493077861.png", calories: 10, allergies: "None", rarity: "Uncommon", effects: "Bioavailability", thc_mg: 0 },
    { name: "Sweet Chili Sauce", description: "Sweet and spicy sauce.", category: "Condiment", image: "/Users/madacluster/.gemini/antigravity/brain/6b8a391d-bdd6-4ba0-b8c0-b84350f7f51e/ingredient_sweet_chili_sauce_1766493103379.png", calories: 40, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Creamy Peanut Butter", description: "Smooth peanut butter.", category: "Condiment", image: "/Users/madacluster/.gemini/antigravity/brain/6b8a391d-bdd6-4ba0-b8c0-b84350f7f51e/ingredient_peanut_butter_1766507628323.png", calories: 190, allergies: "Peanuts", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Lime Juice", description: "Freshly squeezed lime juice.", category: "Fruit", image: "/Users/madacluster/.gemini/antigravity/brain/6b8a391d-bdd6-4ba0-b8c0-b84350f7f51e/ingredient_lime_juice_1766507641948.png", calories: 10, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Fish Sauce", description: "Savory fermented fish sauce.", category: "Condiment", image: "/Users/madacluster/.gemini/antigravity/brain/6b8a391d-bdd6-4ba0-b8c0-b84350f7f51e/ingredient_fish_sauce_1766507692568.png", calories: 15, allergies: "Fish", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Sriracha", description: "Spicy chili sauce.", category: "Condiment", image: "/Users/madacluster/.gemini/antigravity/brain/6b8a391d-bdd6-4ba0-b8c0-b84350f7f51e/ingredient_sriracha_1766507712859.png", calories: 5, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
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
    { name: "Cornstarch", description: "Fine white powder used as a thickener.", category: "Pantry", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Cornstarch", calories: 30, allergies: "Corn", rarity: "Common", effects: "None", thc_mg: 0 },

    { name: "Cannabis Infused Olive Oil", description: "Premium olive oil infused with decarboxylated cannabis.", category: "Oil", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Canna+Olive+Oil", calories: 120, allergies: "None", rarity: "Uncommon", effects: "Relaxation", thc_mg: 80 },
    { name: "Basil", description: "Fresh, aromatic green basil leaves.", category: "Herb", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Basil", calories: 1, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Pine Nuts", description: "Small edible seeds from female cones of a pine.", category: "Nut", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Pine+Nuts", calories: 190, allergies: "Tree Nuts", rarity: "Uncommon", effects: "None", thc_mg: 0 },
    { name: "Parmesan Cheese", description: "Hard, savory Italian cheese.", category: "Dairy", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Parmesan", calories: 110, allergies: "Dairy", rarity: "Common", effects: "None", thc_mg: 0 },

    // Salmon Ingredients
    { name: "Salmon Fillet", description: "Fresh Atlantic or Sockeye salmon.", category: "Seafood", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Salmon", calories: 350, allergies: "Fish", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Honey", description: "Natural sweet syrup made by bees.", category: "Condiment", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Honey", calories: 60, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Cannabis Infused Butter", description: "High-quality butter infused with THC.", category: "Dairy", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Canna+Butter", calories: 100, allergies: "Dairy", rarity: "Uncommon", effects: "Euphoria, Sleepiness", thc_mg: 100 },
    { name: "Smoked Paprika", description: "Ground capsicum with a smoky flavor.", category: "Seasoning", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Paprika", calories: 6, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },

    //More  ingredients
    { name: "Penne Pasta", description: "Cylinder-shaped pieces of pasta.", category: "Baking", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Penne", calories: 200, allergies: "Gluten", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Cannabis Infused Coconut Oil", description: "Coconut oil infused with high-grade THC.", category: "Oil", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Canna+Coconut+Oil", calories: 120, allergies: "None", rarity: "Rare", effects: "Strong Body High", thc_mg: 120 },
    { name: "Jerk Seasoning", description: "Spicy Jamaican spice blend.", category: "Seasoning", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Jerk+Spice", calories: 5, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Pumpkin Purée", description: "Cooked and mashed pumpkin.", category: "Vegetable", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Pumpkin", calories: 50, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Chickpeas", description: "Nutritious legumes also known as garbanzo beans.", category: "Vegetable", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Chickpeas", calories: 260, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Bacon", description: "Salt-cured pork belly slices.", category: "Meat", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Bacon", calories: 150, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "White Fish", description: "Fresh lean fish like Sea Bass or Tilapia.", category: "Seafood", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Fish", calories: 130, allergies: "Fish", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Sweet Potato", description: "Starchy, sweet-tasting root vegetable.", category: "Vegetable", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Sweet+Potato", calories: 110, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Cannabis Infused Honey", description: "Sweet natural honey infused with decarboxylated cannabis extract.", category: "Condiment", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Canna+Honey", calories: 60, allergies: "None", rarity: "Uncommon", effects: "Uplifting, Sweet High", thc_mg: 40 },
    { name: "Jalapeño", description: "Fresh green chili pepper with moderate heat.", category: "Vegetable", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Jalapeno", calories: 4, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Asparagus", description: "Tender green stalks, rich in vitamins.", category: "Vegetable", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Asparagus", calories: 20, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Eggs", description: "Large farm-fresh eggs.", category: "Dairy", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Eggs", calories: 70, allergies: "Eggs", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Tuna", description: "Canned or fresh skipjack/albacore tuna.", category: "Seafood", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Tuna", calories: 120, allergies: "Fish", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Dijon Mustard", description: "Sharp, tangy French mustard.", category: "Condiment", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Mustard", calories: 5, allergies: "Mustard", rarity: "Common", effects: "None", thc_mg: 0 },
    { name: "Red Onion", description: "Sharp and crunchy purple-skinned onion.", category: "Vegetable", image: "https://dummyimage.com/200x200/cccccc/000000.png?text=Red+Onion", calories: 40, allergies: "None", rarity: "Common", effects: "None", thc_mg: 0 }
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
                        const buffer = await fs.readFile(url);
                        return new Blob([buffer]);
                    } catch (err) {
                        console.error(`Local file not found or error: ${url}`, err);
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
                delete data.image; // Remove image URL string if not uploading file
                const record = await pb.collection('products').create(data);
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

