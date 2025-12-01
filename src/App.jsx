import React from 'react';
import Header from './components/headerSection';
import Hero from './components/heroSection';
import SmoothAlternatingSlider from './components/imagesSlider';
import CreativeTextSection from './components/textSection';
function App() {
  return (
    <>
      <Header />
      <Hero />
      <SmoothAlternatingSlider />
      <CreativeTextSection />
    </>
  );
}

export default App;
