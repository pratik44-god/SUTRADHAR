import HeroSection from "~/components/landing/HeroSection";
import FeaturesSection from "~/components/landing/FeatureSection";
import StatsSection from "~/components/landing/StatsSection";
import TrendingSection from "~/components/landing/TrendingSection";
import TestimonialsSection from "~/components/landing/TestimonialsSection";
import CTASection from "~/components/landing/CTASection";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0F0D0A] text-[#F0E6D2]">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TrendingSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}