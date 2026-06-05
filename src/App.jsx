import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from './components/shared/Layout';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import PracticeAreas from './components/PracticeAreas';
import Team from './components/Team';
import Contact from './components/Contact';
import Publications from './components/Publications';

const TeamProfile       = lazy(() => import('./components/TeamProfile'));
const PublicationsList  = lazy(() => import('./components/Publications/PublicationsList'));
const PublicationDetail = lazy(() => import('./components/PublicationDetail'));
const NotFound          = lazy(() => import('./components/NotFound'));

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
      <Helmet>
        <title>The Michaels Attorneys (TMA) — Ark of God Chambers | Law Firm in Abuja, Nigeria</title>
        <meta name="description" content="The Michaels Attorneys (TMA) — a technology-driven law firm in Abuja, Nigeria. Specialising in litigation, cybersecurity law, data protection, ICT law, corporate advisory, and regulatory compliance since 2018." />
      </Helmet>
      <Hero />
      <Stats />
      <About />
      <PracticeAreas />
      <Team />
      <Publications />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/team/:slug" element={<TeamProfile />} />
          <Route path="/publications" element={<PublicationsList />} />
          <Route path="/publications/:slug" element={<PublicationDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
