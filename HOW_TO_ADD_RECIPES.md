# How to Add New Recipes

There are two primary ways to add recipes to the application:

## 1. Using the Admin Panel (Fastest, No Code)
The application uses PocketBase as a backend, which comes with a built-in Admin UI.

1.  **Access the Admin UI**: Go to `http://127.0.0.1:8090/_/` (or your deployed URL).
2.  **Login**: Use your admin credentials.
3.  **Navigate to Collections**: Click on the **"recipes"** collection in the sidebar.
4.  **Create Record**: Click the **"New record"** button (top right).
5.  **Fill Details**:
    *   **Title**: Name of the recipe.
    *   **Category**: Edible, Drink, Tropical, etc.
    *   **Image**: Upload a file.
    *   **Description**: Short summary.
    *   **Ingredients Text**: JSON array of strings (e.g. `["1 cup Flour", "2 Eggs"]`).
    *   **Instructions**: JSON array of strings.
6.  **Save**: Click Create.

## 2. Using the Seed Script (Permanent, Version Controlled)
For developers, adding recipes to `scripts/seed_recipes.ts` ensures they are preserved and can be re-seeded if the database is reset.

1.  **Open Script**: Edit `scripts/seed_recipes.ts`.
2.  **Add to Array**: Locate the `recipes` const and add a new object:
    ```typescript
    {
        title: "My New Recipe",
        category: "Edible",
        difficulty: 1,
        // Use an absolute path to a local image or a URL
        image: "/absolute/path/to/image.png", 
        price: "50 GP",
        description: "Delicious and potent.",
        time: "30 MIN",
        ingredients_text: [
            "1 Cup Flour",
            "1/2 Cup Sugar"
        ],
        instructions: [
            "Mix ingredients.",
            "Bake at 350F."
        ]
    }
    ```
3.  **Run Seed**: Execute the script in your terminal:
    ```bash
    bun run scripts/seed_recipes.ts
    ```
    *Note: The script is smart enough to create new ingredients if they don't exist.*
