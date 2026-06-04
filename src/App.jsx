import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/shared/Layout';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import PracticeAreas from './components/PracticeAreas';
import Team from './components/Team';
import Contact from './components/Contact';
import TeamProfile from './components/TeamProfile';

function HomeContent() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
    setTimeout(() => window.scrollTo({ top, behavior: 'smooth' }), 100);
  }, [hash]);

  return (
    <>
      <Hero />
      <Stats />
      <About />
      <PracticeAreas />
      <Team />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/team/:slug" element={<TeamProfile />} />
      </Routes>
    </Layout>
  );
}
