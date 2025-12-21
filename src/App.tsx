import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AgeGate } from './components/AgeGate';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { RecipePage } from './pages/RecipePage';
import { DosageGuide } from './pages/DosageGuide';

function App() {
  const [ageVerified, setAgeVerified] = useState(false);

  if (!ageVerified) {
    return (
      <AgeGate onVerify={() => setAgeVerified(true)} />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipe/:id" element={<RecipePage />} />
          <Route path="dosage-guide" element={<DosageGuide />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
