  import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { FloatingActions } from './components/FloatingActions';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { Services } from './pages/Services';
import { Spares } from './pages/Spares';
import { Contact } from './pages/Contact';

// Scroll to top component on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const AppContent: React.FC = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [productContext, setProductContext] = useState<string | undefined>(undefined);

  const handleOpenQuoteModal = (context?: string) => {
    setProductContext(context);
    setQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setQuoteModalOpen(false);
    setProductContext(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-trinex-dark text-slate-100 font-sans selection:bg-trinex-gold selection:text-trinex-dark">
      <ScrollToTop />

      {/* Global Navbar */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Main Content View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/services" element={<Services onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/spares" element={<Spares onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home onOpenQuoteModal={handleOpenQuoteModal} />} />
        </Routes>
      </main>

      {/* Floating Action Buttons */}
      <FloatingActions />

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={handleCloseQuoteModal}
        productContext={productContext}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
