import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, MessageCircle } from "lucide-react";
import { Selection } from "@/types/configurator";
import { STEPS } from "@/types/configurator";
import jsPDF from 'jspdf';

interface SummaryProps {
  selections: Selection[];
  basePrice: number;
  totalPrice: number;
}

export const Summary = ({ selections, basePrice, totalPrice }: SummaryProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getSelectionsByStep = (stepId: string) => {
    const step = STEPS.find(s => s.id === stepId);
    if (!step) return [];
    
    return step.groups.map(group => {
      const selection = selections.find(s => s.groupId === group.id);
      return {
        groupTitle: group.title,
        selection: selection?.option
      };
    }).filter(item => item.selection);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(40, 44, 52);
    doc.text('MODULARIZA', 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(18);
    doc.setTextColor(100, 116, 139);
    doc.text('Módulo Premium - Configuração Personalizada', 20, yPosition);
    yPosition += 20;
    
    // Line separator
    doc.setDrawColor(229, 231, 235);
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 15;
    
    // Configuration details
    doc.setFontSize(16);
    doc.setTextColor(40, 44, 52);
    doc.text('Resumo da Configuração:', 20, yPosition);
    yPosition += 15;
    
    STEPS.forEach((step) => {
      const stepSelections = getSelectionsByStep(step.id);
      if (stepSelections.length === 0) return;
      
      // Step title
      doc.setFontSize(14);
      doc.setTextColor(59, 130, 246);
      doc.text(step.title, 20, yPosition);
      yPosition += 10;
      
      stepSelections.forEach((item) => {
        if (!item.selection) return;
        
        // Check if we need a new page
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(11);
        doc.setTextColor(75, 85, 99);
        doc.text(`• ${item.groupTitle}:`, 25, yPosition);
        yPosition += 6;
        
        doc.setTextColor(40, 44, 52);
        doc.text(`  ${item.selection.name}`, 30, yPosition);
        yPosition += 6;
        
        doc.setTextColor(34, 197, 94);
        doc.text(`  ${formatPrice(item.selection.price)}`, 30, yPosition);
        yPosition += 8;
      });
      
      yPosition += 5;
    });
    
    // Price summary
    yPosition += 10;
    doc.setDrawColor(229, 231, 235);
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 15;
    
    doc.setFontSize(16);
    doc.setTextColor(40, 44, 52);
    doc.text('Resumo Financeiro:', 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(12);
    doc.text(`Valor Base do Módulo: ${formatPrice(basePrice)}`, 20, yPosition);
    
    const additionalCost = totalPrice - basePrice;
    if (additionalCost > 0) {
      yPosition += 10;
      doc.text(`Custo Adicional: ${formatPrice(additionalCost)}`, 20, yPosition);
    }
    yPosition += 10;
    
    doc.setFontSize(16);
    doc.setTextColor(220, 38, 127);
    doc.text(`Total Geral: ${formatPrice(totalPrice)}`, 20, yPosition);
    
    // Footer
    yPosition = 280;
    doc.setFontSize(10);
    doc.setTextColor(156, 163, 175);
    doc.text('Documento gerado automaticamente pelo sistema Modulariza', 20, yPosition);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, yPosition + 5);
    
    // Save the PDF
    doc.save('modulariza-configuracao.pdf');
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Preciso de ajuda com minha configuração do módulo.");
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header with Company Info */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Modulariza</h1>
        <h2 className="text-2xl font-semibold text-muted-foreground">Módulo Premium</h2>
        <p className="text-lg text-muted-foreground">Configuração personalizada</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">        
        <Button 
          onClick={generatePDF}
          className="flex items-center gap-2 px-8 py-3"
          size="lg"
          variant="outline"
        >
          <FileDown className="w-5 h-5" />
          Gerar PDF
        </Button>
        
        <Button 
          variant="outline"
          onClick={openWhatsApp}
          className="flex items-center gap-2 px-8 py-3"
          size="lg"
        >
          <MessageCircle className="w-5 h-5" />
          Houve algum problema? Fale conosco pelo WhatsApp
        </Button>
      </div>

      {/* Configuration Summary */}
      <Card className="p-8">
        <h3 className="text-2xl font-bold text-primary mb-6">Resumo da Configuração</h3>
        
        {/* Base Price Display */}
        <div className="bg-muted/30 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-foreground">Valor Base do Módulo:</span>
            <span className="font-bold text-primary">{formatPrice(basePrice)}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STEPS.map((step) => {
            const stepSelections = getSelectionsByStep(step.id);
            if (stepSelections.length === 0) return null;
            
            return (
              <div key={step.id} className="space-y-4">
                <h4 className="text-lg font-semibold text-primary border-b border-border pb-2">
                  {step.title}
                </h4>
                <div className="space-y-3">
                  {stepSelections.map((item, index) => (
                    <div key={index} className="bg-muted/50 p-3 rounded-lg">
                      <div className="font-medium text-foreground">{item.groupTitle}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {item.selection?.name}
                        {item.selection?.description && (
                          <span className="ml-2 text-xs">({item.selection.description})</span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-primary mt-1">
                        {formatPrice(item.selection?.price || 0)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Price Summary */}
      <Card className="p-8 bg-gradient-primary text-primary-foreground">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Resumo Financeiro</h3>
          
          <div className="flex justify-between items-center text-2xl font-bold">
            <span>Total Geral:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};