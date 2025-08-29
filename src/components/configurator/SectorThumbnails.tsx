import { useState } from "react";
import { cn } from "@/lib/utils";

interface SectorThumbnailsProps {
  selectedSector: string | null;
  onThumbnailClick: (imageUrl: string) => void;
}

export const SectorThumbnails = ({ selectedSector, onThumbnailClick }: SectorThumbnailsProps) => {
  // Imagens dos setores para thumbnails
  const thumbnails = [
    {
      id: "overview",
      name: "Visão Geral",
      imageUrl: "/lovable-uploads/261e4cc0-c526-4aa9-ab02-727fde9ab1c7.png",
    },
    {
      id: "setor01", 
      name: "Setor 01",
      imageUrl: "/lovable-uploads/4f9d9c54-5177-414a-a2e4-be8fe857ea9e.png",
    },
    {
      id: "setor02",
      name: "Setor 02", 
      imageUrl: "/lovable-uploads/15eefb53-d465-4521-9812-8db0b97db46c.png",
    },
    {
      id: "setor03",
      name: "Setor 03",
      imageUrl: "/lovable-uploads/c3bbebb3-9318-464c-b3f1-f3bac29f8f47.png", 
    },
    {
      id: "setor04",
      name: "Setor 04",
      imageUrl: "/lovable-uploads/4a3ebdd4-7852-4175-8039-ef3cdfb01f21.png",
    },
    {
      id: "setor05", 
      name: "Setor 05",
      imageUrl: "/lovable-uploads/03132c08-f44f-43af-a1bb-75f010233da1.png",
    }
  ];

  const handleThumbnailClick = (imageUrl: string) => {
    // Create modal for image zoom
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4';
    modal.onclick = () => modal.remove();
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.className = 'max-w-full max-h-full object-contain rounded-lg cursor-pointer';
    img.onclick = (e) => e.stopPropagation();
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'absolute top-4 right-4 text-white hover:text-gray-300 text-2xl';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => modal.remove();
    
    modal.appendChild(img);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
    
    // Call the callback to update main image if needed
    onThumbnailClick(imageUrl);
  };

  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-muted-foreground mb-3">
        Visualizar Setores:
      </h4>
      <div className="grid grid-cols-6 gap-1">
        {thumbnails.map((thumbnail) => (
          <div
            key={thumbnail.id}
            className={cn(
              "relative aspect-square rounded-md overflow-hidden cursor-pointer transition-all duration-200",
              "border-2 hover:border-primary/50",
              selectedSector === thumbnail.id 
                ? "border-black shadow-lg ring-2 ring-black/20" 
                : "border-border"
            )}
            onClick={() => handleThumbnailClick(thumbnail.imageUrl)}
          >
            <img
              src={thumbnail.imageUrl}
              alt={thumbnail.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-0.5 text-center">
              <span className="text-xs font-medium">{thumbnail.name}</span>
            </div>
            
            {/* Highlight indicator for selected sector */}
            {selectedSector === thumbnail.id && (
              <div className="absolute inset-0 bg-black/10 border-2 border-black rounded-md pointer-events-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};