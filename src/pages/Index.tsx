import React, { useState, useMemo } from "react";
import { InteractiveMap } from "@/components/InteractiveMap";
import { ImpactStories } from "@/components/ImpactStories";
import { MapPin, TrendingUp } from "lucide-react";
import { FilterControls } from "@/components/ui/filter-controls";
import { DealDetailModal } from "@/components/deal-detail-modal";

/**
 * Bengaluru Impact Visualizer - Main Application
 *
 * A premium fintech application that bridges the emotional gap between
 * online investments and their real-world impact in Bengaluru.
 */
const Index = () => {
  const [highlightedDealId, setHighlightedDealId] = useState<string | null>(
    null
  );
  const [hoveredDealId, setHoveredDealId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<DealType | "All">("All");
  const [activeSort, setActiveSort] = useState<string>("funding-desc");
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // Add DealType and Deal type definitions (temporary, to be replaced with actual types if available)
  type DealType = "Asset Leasing" | "Invoice Discounting";
  type Deal = {
    id: string;
    name: string;
    type: DealType;
    funding: number;
    // ...other fields as needed
  };

  // Placeholder dealsData array (replace with actual data source)
  const dealsData: Deal[] = [];

  const filteredAndSortedDeals = useMemo(() => {
    let filtered = dealsData;
    if (activeFilter !== "All") {
      filtered = filtered.filter((deal) => deal.type === activeFilter);
    }
    let sorted = [...filtered];
    switch (activeSort) {
      case "funding-desc":
        sorted.sort((a, b) => b.funding - a.funding);
        break;
      case "funding-asc":
        sorted.sort((a, b) => a.funding - b.funding);
        break;
      case "name-az":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [dealsData, activeFilter, activeSort]);

  return (
    <div className="min-h-screen bg-background font-inter relative overflow-hidden">
      {/* Enhanced dynamic animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-70" />
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="absolute top-1/4 left-1/3 w-1/2 h-1/2 bg-gradient-radial from-pink-400/40 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-blue-400/30 via-transparent to-transparent rounded-full blur-2xl animate-pulse-slow" />
        <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-gradient-radial from-purple-400/30 via-transparent to-transparent rounded-full blur-2xl animate-pulse-slow" />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full floating blur-sm"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/10 rounded-lg floating-delayed blur-sm"></div>
      <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-primary/20 rounded-full floating blur-sm"></div>

      {/* Premium Header */}
      <header className="relative z-20 glass-card border-0 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl shadow-glow floating">
                  <TrendingUp className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  Bengaluru Impact Visualizer
                </h1>
                <p className="text-sm text-muted-foreground">
                  Real investments, real impact
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-muted-foreground bg-muted/20 px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Bengaluru, Karnataka
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-primary">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">From Abstract to Asset:</span>
              <br />
              <span className="text-foreground">See Your Bengaluru</span>
              <br />
              <span className="gradient-text">Investments Come to Life</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Bridge the gap between digital investments and tangible impact.
              Discover how your capital fuels real businesses and drives
              economic growth across India's Silicon Valley.
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button className="btn-primary px-8 py-4 rounded-xl text-lg font-semibold magnetic-btn">
              Start Exploring Impact
            </button>
            <button className="btn-secondary px-8 py-4 rounded-xl text-lg font-semibold magnetic-btn">
              Watch Demo
            </button>
          </div>

          {/* Impact metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text floating">
                ₹2.4Cr+
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Total Impact
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text floating-delayed">
                150+
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Businesses Funded
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text floating">
                98%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Success Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text floating-delayed">
                24/7
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Real-time Updates
              </div>
            </div>
          </div>
        </div>

        {/* Main Visualization Section */}
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold gradient-text">
              Live Investment Dashboard
            </h2>
            <p className="text-muted-foreground">
              Watch your investments create real-world impact across Bengaluru
            </p>
          </div>

          {/* Desktop Layout: Side-by-side with premium cards */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-8 h-[calc(100vh-400px)]">
            {/* Map Section */}
            <div className="lg:col-span-3">
              <div className="premium-card h-full p-2 rounded-2xl">
                <InteractiveMap
                  highlightedDealId={highlightedDealId}
                  onMarkerHover={setHoveredDealId}
                  centerOnDeal={selectedDeal}
                />
              </div>
            </div>

            {/* Stories Section */}
            <div className="lg:col-span-2">
              <div className="premium-card h-full rounded-2xl overflow-hidden">
                <FilterControls
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  activeSort={activeSort}
                  onSortChange={setActiveSort}
                />
                <ImpactStories
                  onDealHighlight={setHighlightedDealId}
                  hoveredDealId={hoveredDealId}
                  deals={filteredAndSortedDeals}
                  setSelectedDeal={setSelectedDeal}
                />
              </div>
            </div>
          </div>

          {/* Mobile Layout: Stacked with enhanced spacing */}
          <div className="lg:hidden space-y-8">
            {/* Map Section */}
            <div className="h-96">
              <div className="premium-card h-full p-2 rounded-2xl">
                <InteractiveMap
                  highlightedDealId={highlightedDealId}
                  onMarkerHover={setHoveredDealId}
                  centerOnDeal={selectedDeal}
                />
              </div>
            </div>

            {/* Stories Section */}
            <div className="h-96">
              <div className="premium-card h-full rounded-2xl overflow-hidden">
                <FilterControls
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  activeSort={activeSort}
                  onSortChange={setActiveSort}
                />
                <ImpactStories
                  onDealHighlight={setHighlightedDealId}
                  hoveredDealId={hoveredDealId}
                  deals={filteredAndSortedDeals}
                  setSelectedDeal={setSelectedDeal}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Premium Footer */}
      <footer className="relative z-10 glass-card border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="font-medium">Real-time data</span>
              </div>
              <span>•</span>
              <span className="font-medium">Blockchain secured</span>
              <span>•</span>
              <span className="font-medium">Bengaluru focused</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Bengaluru Impact Visualizer. All
                rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                Designed & developed by{" "}
                <span className="font-bold text-primary">Mohammad Meezan</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
      {/* Render DealDetailModal when selectedDeal is set */}
      {selectedDeal && (
        <DealDetailModal
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
        />
      )}
    </div>
  );
};

export default Index;

// Add global styles for new background animations
<style jsx global>{`
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 8s ease-in-out infinite;
  }
  .bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-stops));
  }
  .animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  @keyframes pulse {
    0%,
    100% {
      opacity: 0.7;
    }
    50% {
      opacity: 1;
    }
  }
`}</style>;
