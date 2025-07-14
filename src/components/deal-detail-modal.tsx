import React from "react";
import { X, TrendingUp, Calendar, DollarSign, Percent } from "lucide-react";
import type { Deal } from "./InteractiveMap";

interface DealDetailModalProps {
  deal: Deal;
  onClose: () => void;
}

export const DealDetailModal: React.FC<DealDetailModalProps> = ({
  deal,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-background rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-modal-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-muted-foreground" />
        </button>
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-lg bg-primary/10">
            {deal.type === "Asset Leasing" ? (
              <DollarSign className="w-6 h-6 text-primary" />
            ) : (
              <Percent className="w-6 h-6 text-secondary" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold gradient-text mb-1">
              {deal.name}
            </h2>
            <div className="text-sm font-semibold text-muted-foreground">
              {deal.type}
            </div>
          </div>
        </div>
        {/* Description */}
        <p className="text-base text-muted-foreground mb-6">
          {deal.description}
        </p>
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground mb-1">Funding</span>
            <span className="font-bold text-lg flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-primary" />
              {deal.funding}%
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground mb-1">Tenure</span>
            <span className="font-bold text-lg flex items-center gap-1">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              {deal.tenure || "N/A"}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground mb-1">
              Min. Investment
            </span>
            <span className="font-bold text-lg flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              {deal.minInvestment || "N/A"}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground mb-1">
              Expected IRR
            </span>
            <span className="font-bold text-lg flex items-center gap-1">
              <Percent className="w-4 h-4 text-muted-foreground" />
              {deal.expectedIRR || "N/A"}
            </span>
          </div>
        </div>
        {/* Funding Progress Bar */}
        <div className="mb-2">
          <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out bg-primary`}
              style={{ width: `${deal.funding}%` }}
            ></div>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.2s ease;
        }
        .animate-modal-in {
          animation: modalIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes modalIn {
          from {
            transform: translateY(40px) scale(0.98);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
