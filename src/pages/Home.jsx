import React from 'react';
import Showcase from '../components/Showcase';
import HowToUse from '../components/HowToUse';
import Features from '../components/Features';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Showcase />
      <HowToUse />
      <Features />
      <Footer />
    </>
  );
}
