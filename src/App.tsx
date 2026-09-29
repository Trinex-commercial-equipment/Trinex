import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { FloatingActions } from './components/FloatingActions';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Services } from './pages/Services';
import { Spares } from './pages/Spares';
import { SpareDetail } from './pages/SpareDetail';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';

// Scroll to top on route change
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
  const location = useLocation();

  const handleOpenQuoteModal = (context?: string) => {
    setProductContext(context);
    setQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setQuoteModalOpen(false);
    setProductContext(undefined);
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-white text-trinex-black font-sans selection:bg-trinex-red selection:text-white">
      <ScrollToTop />

      {/* Global Sticky Navbar (hidden on /admin to provide full screen dashboard) */}
      {!isAdminRoute && <Navbar onOpenQuoteModal={handleOpenQuoteModal} />}

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/products/:slug" element={<ProductDetail onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/services" element={<Services onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/spares" element={<Spares onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/spares/:slug" element={<SpareDetail onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home onOpenQuoteModal={handleOpenQuoteModal} />} />
        </Routes>
      </main>

      {/* Floating Action Buttons on mobile (hidden on admin) */}
      {!isAdminRoute && <FloatingActions />}

      {/* Global Quote Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={handleCloseQuoteModal}
        productContext={productContext}
      />

      {/* Global Footer (hidden on /admin) */}
      {!isAdminRoute && <Footer />}
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
