import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { MetragemDialog } from "./MetragemDialog";
import { useState } from "react";

interface PriceDisplayProps {
  basePrice: number;
  totalPrice: number;
}

export const PriceDisplay = ({ basePrice, totalPrice }: PriceDisplayProps) => {
  const [showMetragem, setShowMetragem] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <Card className="p-6 bg-gradient-primary text-primary-foreground sticky top-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Resumo de Preços</h3>
        </div>
        
        <div className="space-y-3 border-t border-primary-foreground/20 pt-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Geral:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-4">
          <Button
            variant="secondary"
            onClick={() => setShowMetragem(true)}
            className="w-full flex items-center gap-2"
          >
            <Info className="w-4 h-4" />
            Confira as metragens do módulo
          </Button>
        </div>
      </div>
      
      <MetragemDialog 
        open={showMetragem} 
        onOpenChange={setShowMetragem} 
      />
    </Card>
  );
};