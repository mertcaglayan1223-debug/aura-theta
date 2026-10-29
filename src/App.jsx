import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import TransformationMap from './components/TransformationMap';
import Services from './components/Services';
import AiQuiz from './components/AiQuiz';
import BookingSection from './components/BookingSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import AiOracleModal from './components/AiOracleModal';
import ThetaScrollBackground from './components/ThetaScrollBackground';
import ThetaStateHud from './components/ThetaStateHud';

export default function App() {
  const [isOracleOpen, setIsOracleOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpenQuiz = () => {
    const quizElement = document.getElementById('ai-quiz');
    if (quizElement) {
      quizElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectBookingFromQuiz = (data) => {
    setBookingPrefill(data);
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
    setBookingPrefill({
      topic: service.name,
      notes: `Seçilen Program: ${service.name} (${service.price} - ${service.duration})`
    });
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-sanctuary-950 font-sans selection:bg-champagne-200 selection:text-sanctuary-950 relative overflow-x-hidden">
      {/* Global 3D Theta Scrollytelling WebGL Background */}
      <ThetaScrollBackground />

      {/* Ambient Audio Player (432Hz Binaural Web Audio) */}
      <AudioPlayer />

      {/* Real-Time Theta Consciousness Telemetry HUD */}
      <ThetaStateHud />

      {/* Floating Header */}
      <Navbar onOpenOracle={() => setIsOracleOpen(true)} />

      {/* Main Sanctuary Experience */}
      <main className="relative z-10">
        {/* Hero with 3D Quantum Brain / Sacred Geometry WebGL Canvas */}
        <Hero onOpenQuiz={handleOpenQuiz} />

        {/* Philosophy & The Science of Theta Waves */}
        <Philosophy />

        {/* 4-Stage Interactive Transformation Journey Map */}
        <TransformationMap />

        {/* Programs & Offerings */}
        <Services onSelectService={handleSelectService} />

        {/* Interactive AI Subconscious Blockage Finder */}
        <AiQuiz onSelectBooking={handleSelectBookingFromQuiz} />

        {/* Social Proof & Transformation Stories */}
        <Testimonials />

        {/* Frictionless Calendar Reservation System */}
        <BookingSection prefilledData={bookingPrefill} selectedService={selectedService} />
      </main>

      {/* Grounded Sophisticated Footer */}
      <Footer />

      {/* AI Subconscious Oracle Modal */}
      <AiOracleModal
        isOpen={isOracleOpen}
        onClose={() => setIsOracleOpen(false)}
        onSelectBooking={handleSelectBookingFromQuiz}
      />
    </div>
  );
}
