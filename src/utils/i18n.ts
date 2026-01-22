/**
 * Helper to get localized field value based on current language
 */
export function getLocalizedField<T>(enValue: T, esValue: T | undefined, currentLang: string): T {
    if (currentLang === 'es' && esValue !== undefined && esValue !== null) {
        // If it's a string and empty, return English value
        if (typeof esValue === 'string' && esValue.trim() === '') {
            return enValue;
        }
        // If it's an array and empty, return English value
        if (Array.isArray(esValue) && esValue.length === 0) {
            return enValue;
        }
        return esValue;
    }
    return enValue;
}
