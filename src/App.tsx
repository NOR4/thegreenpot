import { useState } from 'react';
import { AgeGate } from './components/AgeGate';
import { RecipeCard } from './components/RecipeCard';
import { PixelButton } from './components/PixelButton';
import { IconShoppingCart } from './components/icons';

function App() {
  const [ageVerified, setAgeVerified] = useState(false);

  if (!ageVerified) {
    return (
      <AgeGate onVerify={() => setAgeVerified(true)} />
    );
  }

  return (
    <div className="min-h-screen p-8 flex flex-col gap-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center border-b-4 border-black pb-4">
        <h1 className="font-retro text-2xl md:text-4xl text-[#4ade80] drop-shadow-md">
          THE GREEN POT
        </h1>
        <div className="flex gap-4">
          <PixelButton variant="primary" size="md">
            <IconShoppingCart className="w-5 h-5" /> CART (0)
          </PixelButton>
        </div>
      </header>

      <main>
        <div className="mb-8">
          <h2 className="font-retro text-xl mb-4">LATEST SCROLLS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <RecipeCard
              title="Misty Mountain Tea"
              category="Beverage"
              difficulty={2}
              image="https://placehold.co/400x400/png?text=Tea+Pixel"
              price="15 GP"
            />
            <RecipeCard
              title="Goblin's Green Brownie"
              category="Edible"
              difficulty={4}
              image="https://placehold.co/400x400/22c55e/black/png?text=Brownie"
            />
            <RecipeCard
              title="Elixir of  Relaxation"
              category="Potion"
              difficulty={1}
              image="https://placehold.co/400x400/3b82f6/white/png?text=Elixir"
              price="50 GP"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
