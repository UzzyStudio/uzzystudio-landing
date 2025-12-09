import React from 'react';
import Header from './components/headerSection';
import Hero from './components/heroSection';
import SmoothAlternatingSlider from './components/imagesSlider';
import CreativeTextSection from './components/textSection';
import ManifestoSection from './components/manifestoSection';
import FooterSection from './components/FooterSection';
// import ServicesStackSection from './components/servicesStackSection';
import CursorFollower from './components/CursorFollower';
import AnimatedMembers from './components/AnimatedMembers';
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
function App() {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,     // smoother feeling
      easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cubic
      smoothWheel: true,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return (
    <>
      <CursorFollower />
      <Header />
      <Hero />
      <SmoothAlternatingSlider />
      <CreativeTextSection />
      <ManifestoSection />
      <AnimatedMembers />
      <Header />
      <Hero />
      {/* <FooterSection /> */}
    </>
  );
}

export default App;
