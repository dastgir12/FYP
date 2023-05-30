import React, { useEffect, useState } from 'react';
import Header from '../container/Header/Header';
import HeroSection from '../container/HeroSection/HeroSection';
import Footer from '../components/Footer';

const Home = () => {
  const [hasReloaded, setHasReloaded] = useState(false);

  useEffect(() => {
    if (!hasReloaded && !sessionStorage.getItem('hasReloaded')) {
      setHasReloaded(true);
      sessionStorage.setItem('hasReloaded', true);
      window.location.reload();
    }
  }, [hasReloaded]);

  return (
    <div>
      <Header />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Home;




