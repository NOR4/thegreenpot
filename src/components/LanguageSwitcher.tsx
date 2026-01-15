import { useTranslation } from 'react-i18next';
import { PixelButton } from './PixelButton';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    // Show the current language flag
    const currentLanguage = i18n.language === 'es' ? '🇪🇸 ES' : '🇬🇧 EN';

    return (
        <PixelButton
            variant="secondary"
            size="sm"
            onClick={toggleLanguage}
            className="font-retro"
        >
            {currentLanguage}
        </PixelButton>
    );
}
