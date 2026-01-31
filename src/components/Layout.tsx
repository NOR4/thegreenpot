import { Outlet, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PixelButton } from './PixelButton';
import { IconUser } from './icons';
import potIcon from '../assets/pot-icon.png';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Layout() {
    const { t } = useTranslation();
    const { user, isAuthModalOpen, openAuthModal, closeAuthModal } = useAuth();

    const handleAuthClick = () => {
        openAuthModal();
    };

    return (
        <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
            <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />

            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="sticky top-8 flex flex-col gap-6">
                    <div className="flex items-center gap-3 md:hidden mb-4">
                        <img src={potIcon} alt="The Green Pot" className="w-12 h-12 pixelated" style={{ imageRendering: 'pixelated' }} />
                        <h1 className="font-retro text-2xl text-[#4ade80] drop-shadow-md">
                            THE GREEN POT
                        </h1>
                    </div>

                    <nav className="flex flex-col gap-4">
                        <NavLink
                            to="/recipes"
                            className={({ isActive }) =>
                                `font-retro text-lg p-3 border-4 transition-all break-all leading-tight ${isActive
                                    ? 'bg-[#4ade80] border-black text-black shadow-hard transform -translate-y-1'
                                    : 'bg-white border-black text-black hover:bg-[#eec39a]'
                                }`
                            }
                        >
                            {t('nav.recipes')}
                        </NavLink>
                        <NavLink
                            to="/dosage-guide"
                            className={({ isActive }) =>
                                `font-retro text-lg p-3 border-4 transition-all break-all leading-tight ${isActive
                                    ? 'bg-[#4ade80] border-black text-black shadow-hard transform -translate-y-1'
                                    : 'bg-white border-black text-black hover:bg-[#eec39a]'
                                }`
                            }
                        >
                            {t('nav.dosageGuide')}
                        </NavLink>
                        <NavLink
                            to="/calculator"
                            className={({ isActive }) =>
                                `font-retro text-lg p-3 border-4 transition-all break-all leading-tight ${isActive
                                    ? 'bg-[#4ade80] border-black text-black shadow-hard transform -translate-y-1'
                                    : 'bg-white border-black text-black hover:bg-[#eec39a]'
                                }`
                            }
                        >
                            {t('nav.calculator')}
                        </NavLink>
                        <NavLink
                            to="/decarboxylation"
                            className={({ isActive }) =>
                                `font-retro text-lg p-3 border-4 transition-all break-all leading-tight ${isActive
                                    ? 'bg-[#4ade80] border-black text-black shadow-hard transform -translate-y-1'
                                    : 'bg-white border-black text-black hover:bg-[#eec39a]'
                                }`
                            }
                        >
                            {t('nav.decarbolixation')}
                        </NavLink>
                        <NavLink
                            to="/ingredients"
                            className={({ isActive }) =>
                                `font-retro text-lg p-3 border-4 transition-all break-all leading-tight ${isActive
                                    ? 'bg-[#4ade80] border-black text-black shadow-hard transform -translate-y-1'
                                    : 'bg-white border-black text-black hover:bg-[#eec39a]'
                                }`
                            }
                        >
                            {t('nav.pantry')}
                        </NavLink>
                    </nav>

                    <div className="hidden md:block p-4 border-4 border-black bg-white mt-auto">
                        <p className="font-retro text-xs text-center leading-relaxed">
                            {t('nav.est')}<br />
                            {t('nav.dispensary')}
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0">
                <header className="hidden md:flex justify-between items-center border-b-4 border-black pb-4 mb-8">
                    <div className="flex items-center gap-4">
                        <img src={potIcon} alt="The Green Pot" className="w-16 h-16 pixelated" style={{ imageRendering: 'pixelated' }} />
                        <h1 className="font-retro text-4xl text-[#4ade80] drop-shadow-md">
                            THE GREEN POT
                        </h1>
                    </div>
                    <div className="flex gap-4">
                        <LanguageSwitcher />
                        <PixelButton variant="primary" size="md" onClick={handleAuthClick}>
                            <IconUser className="w-5 h-5" />
                            {user ? (user.name || user.email) : t('auth.loginSignup')}
                        </PixelButton>
                    </div>
                </header>

                {/* Mobile Header Elements (Auth) */}
                <div className="md:hidden flex justify-between mb-4">
                    <LanguageSwitcher />
                    <PixelButton variant="primary" size="md" onClick={handleAuthClick}>
                        <IconUser className="w-5 h-5" />
                        {user ? (user.name || user.email) : t('auth.login')}
                    </PixelButton>
                </div>

                <Outlet />
            </main>
        </div>
    );
}
