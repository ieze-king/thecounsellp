import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import PracticeAreas from './components/PracticeAreas';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <PracticeAreas />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
