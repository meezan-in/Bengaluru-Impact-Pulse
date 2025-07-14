import React, { useEffect, useRef, useState } from "react";
import { DEALS, type Deal } from "./InteractiveMap";
import { MapPin, TrendingUp, Building2, Factory } from "lucide-react";
import { SkeletonFilterControls } from "./ui/skeleton";

interface ImpactStoriesProps {
  onDealHighlight: (dealId: string | null) => void;
  hoveredDealId?: string | null;
  deals: Deal[];
  setSelectedDeal?: (deal: Deal) => void;
}

/**
 * Premium skeleton loader with advanced shimmer effect
 */
const SkeletonCard: React.FC = () => (
  <div className="premium-card p-6 rounded-xl animate-scale-in">
    <div className="space-y-4">
      <div className="animate-shimmer bg-gradient-to-r from-muted via-background to-muted bg-[length:200px_100%] h-6 rounded-lg"></div>
      <div
        className="animate-shimmer bg-gradient-to-r from-muted via-background to-muted bg-[length:200px_100%] h-4 rounded w-3/4"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="animate-shimmer bg-gradient-to-r from-muted via-background to-muted bg-[length:200px_100%] h-24 rounded-lg"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div className="flex items-center gap-4">
        <div
          className="animate-shimmer bg-gradient-to-r from-muted via-background to-muted bg-[length:200px_100%] h-10 w-20 rounded-full"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="animate-shimmer bg-gradient-to-r from-muted via-background to-muted bg-[length:200px_100%] h-6 w-32 rounded"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  </div>
);

/**
 * Individual deal card component with hover effects
 */
interface DealCardProps {
  deal: Deal;
  index: number;
  isVisible: boolean;
  isHighlighted: boolean;
  onClick?: () => void;
}

const DealCard: React.FC<DealCardProps> = ({
  deal,
  index,
  isVisible,
  isHighlighted,
  onClick,
}) => {
  const getTypeIcon = (type: Deal["type"]) => {
    return type === "Asset Leasing" ? Building2 : Factory;
  };

  const getTypeColor = (type: Deal["type"]) => {
    return type === "Asset Leasing"
      ? "text-asset-leasing"
      : "text-invoice-discounting";
  };

  const getProgressColor = (type: Deal["type"]) => {
    return type === "Asset Leasing"
      ? "bg-asset-leasing"
      : "bg-invoice-discounting";
  };

  const TypeIcon = getTypeIcon(deal.type);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        premium-card p-8 rounded-xl relative overflow-hidden group
        ${isVisible ? "animate-slide-up" : "opacity-0 translate-y-8"}
        ${isHighlighted ? "ring-2 ring-primary/30 shadow-glow" : ""}
      `}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "forwards",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with business name and type */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="font-inter font-bold text-xl text-foreground mb-2 leading-tight group-hover:gradient-text transition-all duration-300">
              {deal.name}
            </h3>
            <div
              className={`flex items-center gap-3 ${getTypeColor(deal.type)}`}
            >
              <div className="p-2 rounded-lg bg-current/10">
                <TypeIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold tracking-wide">
                {deal.type}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-medium">Bengaluru</span>
          </div>
        </div>

        {/* Description with enhanced typography */}
        <p className="text-muted-foreground text-base leading-relaxed mb-6 font-inter">
          {deal.description}
        </p>

        {/* Funding progress section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              Funding Progress
            </span>
            <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="font-bold text-xl text-primary">
                {deal.funding}%
              </span>
            </div>
          </div>

          {/* Enhanced progress bar */}
          <div className="relative">
            <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out relative ${getProgressColor(
                  deal.type
                )}`}
                style={{ width: `${deal.funding}%` }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
            {deal.funding === 100 && (
              <div className="absolute -top-2 -right-2 floating">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-glow">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced status badge */}
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Impact Score: </span>
              <span className="font-bold text-primary">
                {Math.floor(deal.funding * 0.95 + Math.random() * 10)}/100
              </span>
            </div>
            <span
              className={`
                px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                ${
                  deal.funding === 100
                    ? "bg-primary text-primary-foreground shadow-glow glow-effect"
                    : "bg-secondary/20 text-secondary hover:bg-secondary/30"
                }
              `}
            >
              {deal.funding === 100 ? "✨ Fully Funded" : "🚀 Active Funding"}
            </span>
          </div>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <div
          className={`w-full h-full ${getProgressColor(
            deal.type
          )} transform rotate-45 translate-x-10 -translate-y-10`}
        ></div>
      </div>
    </button>
  );
};

export const ImpactStories: React.FC<ImpactStoriesProps> = ({
  onDealHighlight,
  hoveredDealId,
  deals,
  setSelectedDeal,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Simulate loading delay for skeleton effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for visibility animations
  useEffect(() => {
    if (isLoading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const dealId = entry.target.getAttribute("data-deal-id");
          if (dealId) {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set([...prev, dealId]));
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "50px",
      }
    );

    cardRefs.current.forEach((element) => {
      if (observerRef.current && element) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isLoading]);

  // Intersection Observer for spotlight effect (center-most card)
  useEffect(() => {
    if (isLoading) return;

    const spotlightObserver = new IntersectionObserver(
      (entries) => {
        let mostVisibleEntry: IntersectionObserverEntry | null = null;
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleEntry = entry;
          }
        });

        if (mostVisibleEntry && mostVisibleEntry.intersectionRatio > 0.5) {
          const dealId = mostVisibleEntry.target.getAttribute("data-deal-id");
          onDealHighlight(dealId);
        } else {
          onDealHighlight(null);
        }
      },
      {
        threshold: [0.3, 0.5, 0.7, 0.9],
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    cardRefs.current.forEach((element) => {
      if (element) {
        spotlightObserver.observe(element);
      }
    });

    return () => {
      spotlightObserver.disconnect();
    };
  }, [isLoading, onDealHighlight]);

  if (isLoading) {
    return (
      <>
        <SkeletonFilterControls />
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto bg-background custom-scrollbar"
    >
      <div className="p-8 space-y-8">
        {/* Enhanced Header */}
        <div className="space-y-4 text-center">
          <h2 className="font-inter font-bold text-3xl gradient-text">
            Impact Stories
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
            Real businesses, real impact. Your investments fuel growth across
            Bengaluru's entrepreneurial ecosystem.
          </p>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">₹2.4Cr</div>
              <div className="text-xs text-muted-foreground">Total Funded</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">95%</div>
              <div className="text-xs text-muted-foreground">Avg. Progress</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">4</div>
              <div className="text-xs text-muted-foreground">Active Deals</div>
            </div>
          </div>
        </div>

        {/* Stories */}
        <div className="space-y-6">
          {deals.map((deal, index) => (
            <DealCard
              key={deal.id}
              deal={deal}
              index={index}
              isVisible={visibleCards.has(deal.id)}
              isHighlighted={hoveredDealId === deal.id}
              onClick={
                setSelectedDeal ? () => setSelectedDeal(deal) : undefined
              }
            />
          ))}
        </div>

        {/* Enhanced Footer */}
        <div className="pt-12 pb-8 text-center space-y-4">
          <div className="inline-flex items-center gap-4 bg-muted/30 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">
              Live Updates
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-inter">
            Data refreshed in real-time • Secured by blockchain technology •
            Impact verified by local partners
          </p>
        </div>
      </div>
    </div>
  );
};
