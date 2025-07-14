import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";

// Deal data with authentic Bengaluru locations
export interface Deal {
  id: string;
  name: string;
  type: "Asset Leasing" | "Invoice Discounting";
  coordinates: [number, number];
  funding: number; // percentage 0-100
  description: string;
}

export const DEALS: Deal[] = [
  {
    id: "1",
    name: "Toit Beer Co. - Indiranagar Expansion",
    type: "Asset Leasing",
    coordinates: [12.9784, 77.6408],
    funding: 85,
    description:
      "Expanding brewing capacity to meet growing demand across Bengaluru",
  },
  {
    id: "2",
    name: "Asha Textiles - Peenya Factory",
    type: "Invoice Discounting",
    coordinates: [13.0339, 77.5018],
    funding: 100,
    description: "Working capital for increased textile production orders",
  },
  {
    id: "3",
    name: "Third Wave Coffee - Koramangala Roastery",
    type: "Asset Leasing",
    coordinates: [12.9352, 77.6245],
    funding: 70,
    description: "New roasting equipment for premium coffee production",
  },
  {
    id: "4",
    name: "Vidyashilp Academy - Jakkur Campus Tech Upgrade",
    type: "Asset Leasing",
    coordinates: [13.078, 77.6068],
    funding: 95,
    description:
      "State-of-the-art technology infrastructure for student excellence",
  },
];

interface InteractiveMapProps {
  highlightedDealId?: string;
  onMarkerHover?: (dealId: string | null) => void;
  centerOnDeal?: Deal | null;
}

/**
 * Custom Canvas Marker Class
 * This creates sophisticated markers with progress arcs using HTML5 Canvas API
 */
class CanvasMarker {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private deal: Deal;
  private isHovered: boolean = false;
  private animationId?: number;
  private pulseCount: number = 0;
  private isAnimating: boolean = false;

  constructor(deal: Deal) {
    this.deal = deal;
    this.canvas = document.createElement("canvas");
    this.canvas.width = 40;
    this.canvas.height = 40;
    this.canvas.style.cursor = "pointer";

    this.ctx = this.canvas.getContext("2d")!;
    this.draw();
  }

  /**
   * Main drawing function using Canvas API
   * Creates a circle with a progress arc showing funding percentage
   */
  private draw(): void {
    const { ctx, canvas } = this;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = this.isHovered ? 16 : 14;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Determine color based on deal type
    const color =
      this.deal.type === "Invoice Discounting"
        ? "#198754" // Deep Green
        : "#0D6EFD"; // Calm Blue

    // Draw outer progress ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = `${color}20`; // 20% opacity
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw progress arc based on funding percentage
    const progressAngle = (this.deal.funding / 100) * 2 * Math.PI - Math.PI / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, progressAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw inner filled circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 6, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    // Draw funding percentage text
    ctx.fillStyle = "white";
    ctx.font = `600 ${this.isHovered ? "10px" : "9px"} Inter, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${this.deal.funding}%`, centerX, centerY);
  }

  /**
   * Handles hover state with smooth scaling transition
   */
  public setHovered(hovered: boolean): void {
    this.isHovered = hovered;
    this.draw();
  }

  /**
   * Triggers a double pulse animation when deal is highlighted from scroll
   */
  public pulse(): void {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.pulseCount = 0;

    const animate = () => {
      const scale = 1 + 0.3 * Math.sin(this.pulseCount * 0.3);
      this.canvas.style.transform = `scale(${scale})`;

      this.pulseCount++;

      if (this.pulseCount < 40) {
        // Two complete pulses
        this.animationId = requestAnimationFrame(animate);
      } else {
        this.canvas.style.transform = "scale(1)";
        this.isAnimating = false;
        this.pulseCount = 0;
      }
    };

    animate();
  }

  public getElement(): HTMLCanvasElement {
    return this.canvas;
  }

  public cleanup(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  highlightedDealId,
  onMarkerHover,
  centerOnDeal,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<
    Map<string, { marker: L.Marker; canvasMarker: CanvasMarker }>
  >(new Map());

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize Leaflet map with CartoDB Positron tiles for clean aesthetic
    mapRef.current = L.map(mapContainer.current, {
      center: [12.9757, 77.5929], // Cubbon Park, Bengaluru
      zoom: 12,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
    });

    // Add CartoDB Positron tile layer for minimal, clean look
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "© OpenStreetMap contributors, © CartoDB",
        maxZoom: 19,
      }
    ).addTo(mapRef.current);

    // Create custom canvas markers for each deal
    DEALS.forEach((deal) => {
      const canvasMarker = new CanvasMarker(deal);
      const canvas = canvasMarker.getElement();

      // Create Leaflet marker with custom canvas icon
      const marker = L.marker(deal.coordinates, {
        icon: L.divIcon({
          html: canvas.outerHTML,
          className: "custom-canvas-marker",
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        }),
      });

      // Handle marker interactions
      marker.on("mouseover", () => {
        canvasMarker.setHovered(true);
        // Update the marker icon with hovered state
        marker.setIcon(
          L.divIcon({
            html: canvasMarker.getElement().outerHTML,
            className: "custom-canvas-marker",
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          })
        );
        onMarkerHover?.(deal.id);
      });

      marker.on("mouseout", () => {
        canvasMarker.setHovered(false);
        marker.setIcon(
          L.divIcon({
            html: canvasMarker.getElement().outerHTML,
            className: "custom-canvas-marker",
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          })
        );
        onMarkerHover?.(null);
      });

      marker.addTo(mapRef.current!);
      markersRef.current.set(deal.id, { marker, canvasMarker });
    });

    return () => {
      // Cleanup canvas animations
      markersRef.current.forEach(({ canvasMarker }) => {
        canvasMarker.cleanup();
      });
      mapRef.current?.remove();
    };
  }, [onMarkerHover]);

  // Handle deal highlighting from intersection observer
  useEffect(() => {
    if (highlightedDealId) {
      const markerData = markersRef.current.get(highlightedDealId);
      if (markerData) {
        // Trigger pulse animation
        markerData.canvasMarker.pulse();

        // Update marker icon to show pulse effect
        setTimeout(() => {
          markerData.marker.setIcon(
            L.divIcon({
              html: markerData.canvasMarker.getElement().outerHTML,
              className: "custom-canvas-marker",
              iconSize: [40, 40],
              iconAnchor: [20, 20],
            })
          );
        }, 100);
      }
    }
  }, [highlightedDealId]);

  useEffect(() => {
    if (centerOnDeal && mapRef.current) {
      mapRef.current.flyTo(centerOnDeal.coordinates, 15, { duration: 1.2 });
    }
  }, [centerOnDeal]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainer}
        className="w-full h-full rounded-lg shadow-soft"
        style={{ minHeight: "400px" }}
      />
    </div>
  );
};
