import { Header } from '@/components/layout';
import { HeroSection, CategorySection, ExploreSection } from '@/components/sections';

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      fontFamily: 'var(--font-dm-sans)',
    }}>
      {/* Header with Navigation */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Category Selection Section */}
        <CategorySection />
        
        {/* Explore UMKM Section */}
        <ExploreSection />
        
        {/* Placeholder for additional sections */}
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#FFF8F3',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-clash-display)',
            fontSize: '2rem',
            fontWeight: 700,
            color: '#2E2E2E',
            margin: 0,
          }}>
            More sections will be added here...
            <br />
            (Maps, Cerita, Review, Tentang Kami, etc.)
          </p>
        </div>
      </main>
    </div>
  );
}
