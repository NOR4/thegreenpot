import { Outlet, NavLink } from 'react-router-dom';
import { PixelButton } from './PixelButton';
import { IconShoppingCart } from './icons';

export function Layout() {
    return (
        <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="sticky top-8 flex flex-col gap-6">
                    <h1 className="font-retro text-2xl md:text-3xl text-[#4ade80] drop-shadow-md mb-4 md:hidden">
                        THE GREEN POT
                    </h1>

                    <nav className="flex flex-col gap-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `font-retro text-lg p-3 border-4 transition-all ${isActive
                                    ? 'bg-[#4ade80] border-black text-black shadow-hard transform -translate-y-1'
                                    : 'bg-white border-black text-black hover:bg-[#eec39a]'
                                }`
                            }
                        >
                            SCROLLS
                        </NavLink>
                        <NavLink
                            to="/dosage-guide"
                            className={({ isActive }) =>
                                `font-retro text-lg p-3 border-4 transition-all ${isActive
                                    ? 'bg-[#4ade80] border-black text-black shadow-hard transform -translate-y-1'
                                    : 'bg-white border-black text-black hover:bg-[#eec39a]'
                                }`
                            }
                        >
                            DOSAGE GUIDE
                        </NavLink>
                        <NavLink
                            to="/ingredients"
                            className={({ isActive }) =>
                                `font-retro text-lg p-3 border-4 transition-all ${isActive
                                    ? 'bg-[#4ade80] border-black text-black shadow-hard transform -translate-y-1'
                                    : 'bg-white border-black text-black hover:bg-[#eec39a]'
                                }`
                            }
                        >
                            PANTRY
                        </NavLink>
                    </nav>

                    <div className="hidden md:block p-4 border-4 border-black bg-white mt-auto">
                        <p className="font-retro text-xs text-center leading-relaxed">
                            EST. 2024<br />
                            PIXEL DISPENSARY
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0">
                <header className="hidden md:flex justify-between items-center border-b-4 border-black pb-4 mb-8">
                    <h1 className="font-retro text-4xl text-[#4ade80] drop-shadow-md">
                        THE GREEN POT
                    </h1>
                    <div className="flex gap-4">
                        <PixelButton variant="primary" size="md">
                            <IconShoppingCart className="w-5 h-5" /> CART (0)
                        </PixelButton>
                    </div>
                </header>

                {/* Mobile Header Elements (Cart) */}
                <div className="md:hidden flex justify-end mb-4">
                    <PixelButton variant="primary" size="md">
                        <IconShoppingCart className="w-5 h-5" /> CART (0)
                    </PixelButton>
                </div>

                <Outlet />
            </main>
        </div>
    );
}
