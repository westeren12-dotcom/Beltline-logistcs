import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import NeuralBackground from './components/NeuralBackground.jsx';
import CursorGlow from './components/CursorGlow.jsx';
import Loader from './components/Loader.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

import Navbar from './layouts/Navbar.jsx';
import Footer from './layouts/Footer.jsx';

import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import TrackingPage from './pages/TrackingPage.jsx';
import RoutesPage from './pages/RoutesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="relative min-h-screen text-navy-900 dark:text-white transition-colors duration-700">
      <Loader />
      <NeuralBackground />
      <CursorGlow />
      <Navbar />
      <ScrollManager />

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}