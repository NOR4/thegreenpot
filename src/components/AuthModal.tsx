import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PixelButton } from './PixelButton';
import { IconX } from './icons';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const { user, login, signup, logout } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                if (password !== passwordConfirm) {
                    throw new Error("Passwords don't match");
                }
                await signup(email, password, passwordConfirm, name);
            }
            onClose();
            // Reset form
            setEmail('');
            setPassword('');
            setPasswordConfirm('');
            setName('');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to authenticate');
        } finally {
            setLoading(false);
        }
    };

    const handleChangeUser = () => {
        logout();
        setIsLogin(true);
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setName('');
    };

    const handleLogout = () => {
        logout();
        onClose();
    };

    // If user is logged in, show Profile View
    if (user) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white border-4 border-black p-6 w-full max-w-md shadow-hard relative">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 p-1 hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all"
                    >
                        <IconX className="w-6 h-6 text-black" />
                    </button>

                    <h2 className="font-retro text-2xl text-center mb-6">
                        YOUR PROFILE
                    </h2>

                    <div className="flex flex-col gap-6 text-center">
                        <div className="bg-gray-100 p-4 border-4 border-black">
                            <p className="font-retro text-gray-500 text-sm mb-1">USERNAME</p>
                            <p className="font-pixel text-xl">{user.username || user.name || 'Adventurer'}</p>

                            <div className="h-4"></div>

                            <p className="font-retro text-gray-500 text-sm mb-1">EMAIL</p>
                            <p className="font-pixel text-lg">{user.email}</p>
                        </div>

                        <div className="border-t-4 border-black pt-4 flex gap-4">
                            <PixelButton
                                onClick={handleChangeUser}
                                fullWidth
                                size="md"
                                variant="secondary"
                            >
                                CHANGE USER
                            </PixelButton>
                            <PixelButton
                                onClick={handleLogout}
                                fullWidth
                                size="md"
                                variant="primary"
                            >
                                LOGOUT
                            </PixelButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white border-4 border-black p-6 w-full max-w-md shadow-hard relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all"
                >
                    <IconX className="w-6 h-6 text-black" />
                </button>

                <h2 className="font-retro text-2xl text-center mb-6">
                    {isLogin ? 'LOGIN' : 'SIGN UP'}
                </h2>

                {/* Tabs */}
                <div className="flex mb-6 border-b-4 border-black">
                    <button
                        className={`flex-1 font-retro py-2 text-lg transition-colors ${isLogin ? 'bg-[#4ade80] text-black' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        onClick={() => setIsLogin(true)}
                    >
                        LOGIN
                    </button>
                    <button
                        className={`flex-1 font-retro py-2 text-lg transition-colors ${!isLogin ? 'bg-[#4ade80] text-black' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        onClick={() => setIsLogin(false)}
                    >
                        SIGN UP
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 font-pixel text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {!isLogin && (
                        <div>
                            <label className="block font-retro text-sm mb-1 text-black">USERNAME</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full font-pixel p-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-purple-400 bg-gray-50 text-black"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block font-retro text-sm mb-1 text-black">EMAIL</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full font-pixel p-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-purple-400 bg-gray-50"
                            placeholder="user@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-retro text-sm mb-1 text-black">PASSWORD</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full font-pixel p-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-purple-400 bg-gray-50"
                            placeholder="••••••••"
                            required
                            minLength={8}
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block font-retro text-sm mb-1 text-black">CONFIRM PASSWORD</label>
                            <input
                                type="password"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                className="w-full font-pixel p-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-purple-400 bg-gray-50 text-black"
                                placeholder="••••••••"
                                required
                                minLength={8}
                            />
                        </div>
                    )}

                    <div className="mt-4">
                        <PixelButton
                            type="submit"
                            fullWidth
                            size="md"
                            variant="primary"
                            disabled={loading}
                        >
                            {loading ? 'PROCESSING...' : (isLogin ? 'ENTER THE POT' : 'JOIN THE PARTY')}
                        </PixelButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
