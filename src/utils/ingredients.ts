
export function parseIngredientName(raw: string): string {
    let name = raw;
    const units = ['cup', 'cups', 'tbsp', 'tsp', 'oz', 'lb', 'lbs', 'g', 'kg', 'ml', 'l', 'pinch', 'dash', 'clove', 'cloves', 'small', 'medium', 'large', 'slice', 'slices', 'piece', 'pieces', 'can', 'cans', 'bottle', 'bottles', 'package', 'packages', 'bunch', 'bunches', 'sprig', 'sprigs', 'stalk', 'stalks', 'leaf', 'leaves', 'teaspoon', 'tablespoon', 'pound', 'pounds', 'ounce', 'ounces', 'gram', 'grams', 'liter', 'liters', 'milliliter', 'milliliters'];
    const unitRegexStr = `^\\s*(${units.join('|')})\\s+(?:of\\s+)?`;
    const quantityRegexStr = `^[\\d\\s\\/\\.\\-\\+]+`; // Include + for "1 cup + 2 tbsp"

    // Iteratively remove quantity and unit patterns until clean
    let lastLen = name.length + 1;
    while (name.length < lastLen) {
        lastLen = name.length;
        name = name.replace(new RegExp(quantityRegexStr), ''); // Remove leading numbers/symbols
        name = name.replace(new RegExp(unitRegexStr, 'i'), ''); // Remove leading unit
    }

    // Remove text after comma or parentheses
    name = name.split(',')[0].split('(')[0];

    // Cleanup
    name = name.trim();
    if (name.toLowerCase().startsWith('plus ')) name = name.substring(5).trim();

    return name;
}
