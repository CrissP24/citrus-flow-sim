import HeroSection from '@/components/home/HeroSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import GallerySection from '@/components/home/GallerySection';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <BenefitsSection />
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;