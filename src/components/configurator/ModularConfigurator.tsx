import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Timeline } from "./Timeline";
import { OptionGroup } from "./OptionGroup";
import { PriceDisplay } from "./PriceDisplay";
import { Summary } from "./Summary";
import { SectorThumbnails } from "./SectorThumbnails";
import { QuoteDialog } from "./QuoteDialog";
import { useConfigurator } from "@/hooks/useConfigurator";
import { STEPS } from "@/types/configurator";
import modularBaseImage from "@/assets/modular-base.jpg";

export const ModularConfigurator = () => {
  const {
    state,
    currentStepData,
    isLastStep,
    basePrice,
    totalPrice,
    isGroupEnabled,
    isStepValid,
    completedSteps,
    handleSelectionChange,
    nextStep,
    prevStep
  } = useConfigurator();

  // State for sector selection (only for seletor04 - accessories step)
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  
  // State for quote dialog
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const stepTitles = [...STEPS.map(step => step.title), "Resumo"];
  
  // Check if we're on the accessories step (seletor04)
  const isAccessoriesStep = currentStepData?.id === "seletor04";
  
  // Handle sector selection - always set the new sector
  const handleSectorSelect = (sectorId: string) => {
    setSelectedSector(sectorId);
  };

  // Handle thumbnail click
  const handleThumbnailClick = (imageUrl: string) => {
    // Could be used to update main image if needed
  };
  
  // Get current image based on selections
  const getCurrentImage = () => {
    // Create a comprehensive mapping for all possible selections
    const imageMap: { [key: string]: string } = {
      // Módulo Base - usando as imagens reais
      "modulo-base:com-tampa": "/lovable-uploads/7c93c178-35c4-4357-bd73-2b3c6501865b.png",
      "modulo-base:sem-tampa": "/lovable-uploads/72028924-1cad-40a0-8b26-5a03d1edacbe.png",
      
      // Higienização Premium
      "higienizacao:com-mangueira": "/lovable-uploads/2dd7b8df-a231-4367-8ab8-cddd803fc8f8.png",
      "higienizacao:sem-mangueira": "/lovable-uploads/6b7e9c77-7799-4747-b233-0c36edafd53d.png",
      
      // Revestimento
      "revestimento:freijo-natural": "/lovable-uploads/ef56d30d-cac1-4195-8d6d-2e7bf4933ec6.png",
      "revestimento:preto-absoluto": "/lovable-uploads/b6018385-299c-4c05-b8c3-80657b929913.png",
      "revestimento:lystra-freijo": "/lovable-uploads/ec812f5c-dd6d-45cc-a5f2-77cdd1eb6471.png",
      "revestimento:lystra-preto": "/lovable-uploads/ecc52f02-c0d6-4b9e-bba2-d479902337df.png",
      
      // Forro
      "forro:vinilic-amadeirado": "/lovable-uploads/79603991-9b3f-4620-af8d-cec697cd7510.png",
      "forro:vinilic-preto": "/lovable-uploads/b49be888-aae6-4cf0-a686-2b90f66e410e.png",
      
      // Marcenaria
      "marcenaria:mdf-cinza": "/lovable-uploads/693548ae-3ef2-4bab-8155-1d58230924b4.png",
      "marcenaria:mdf-cromato": "/lovable-uploads/84fd62a7-80b1-4359-a456-1238cb96a92d.png",
      "marcenaria:mdf-carvalho": "/lovable-uploads/dcaa6347-1a2d-43d9-969b-61576695085e.png",
      
      // Bancada - corrigindo as referências das imagens
      "bancada:verde-ubatuba": "/lovable-uploads/29ef14ea-f8fb-4372-9dae-ee451802d86c.png",
      "bancada:verde-ubatuba-escovado": "/lovable-uploads/9eebb0df-c827-4a3f-8bcf-3488d3018d9f.png",
      "bancada:preto-sao-gabriel": "/lovable-uploads/f5eeac7f-d1ae-4ae9-a2eb-efc571f6ab9a.png",
      "bancada:preto-sao-gabriel-escovado": "/lovable-uploads/ea4a1819-2be5-4e5b-a684-4e1f88d81b44.png",
      "bancada:sienna": "/lovable-uploads/5365f180-90c6-49e3-8f99-44c54d6d97cf.png",
      "bancada:sienna-escovado": "/lovable-uploads/801ad797-4968-442b-81b8-3c5059ee122c.png",
      "bancada:alaska": "/lovable-uploads/65b0a07a-44fc-4d40-92a1-b16ac02f258c.png",
      "bancada:alaska-escovado": "/lovable-uploads/9833ddd4-c8f7-4f01-8427-388a2997cf12.png",
      "bancada:donatello": "/lovable-uploads/1e7031bb-5295-4074-832d-b7ba269e20a0.png",
      "bancada:donatello-escovado": "/lovable-uploads/3d51e927-f7a0-461b-9ce5-4b855204292a.png",
      "bancada:monte-cristo": "/lovable-uploads/94ccfc29-d7a2-4705-aa49-4892bf1b5b01.png",
      "bancada:monte-cristo-escovado": "/lovable-uploads/0d254e76-9cd3-42d9-91c4-b1f4ad456c82.png",
      "bancada:michelangelo": "/lovable-uploads/b3c99b00-795f-426b-a838-51a1baf3682c.png",
      "bancada:vitoria-regia": "/lovable-uploads/b77d7a3a-3f27-4ac4-a228-fd21d3fccc24.png",
      
      // Setor 01
      "setor01:parrileira-corse": "/lovable-uploads/parrila-setor01.png",
      "setor01:churrasqueira-future": "/lovable-uploads/churrasqueira-eletrica.png",
      "setor01:churrasqueira-lift": "/lovable-uploads/churrasqueira-eletrica.png",
      "setor01:churrasqueira-pro": "/lovable-uploads/churrasqueira-bafo.png",
      
      // Setor 02
      "setor02:parrileira-corse-s2": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=600&fit=crop&crop=center",
      "setor02:churrasqueira-pro-s2": "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&h=600&fit=crop&crop=center",
      "setor02:cooktop-inducao": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center",
      "setor02:cooktop-forno": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center",
      "setor02:vazio-s2": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center",
      
      // Extra01
      "extra01:coifa-simples": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center",
      "extra01:coifa-dupla": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop&crop=center",
      
      // Setor 03
      "setor03:calha-p": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop&crop=center",
      "setor03:calha-m": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop&crop=center",
      "setor03:calha-g": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop&crop=center",
      "setor03:sem-calha": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center",
      
      // Extra02
      "extra02:tv-42": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=600&fit=crop&crop=center",
      "extra02:tv-42-som": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=600&fit=crop&crop=center",
      "extra02:sem-tv": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center",
      
      // Setor 04
      "setor04:chopeira": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&crop=center",
      "setor04:maquina-gelo": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center",
      "setor04:lava-loucas": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center",
      "setor04:adega-frigobar": "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop&crop=center",
      "setor04:vazio-s4": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center",
      
      // Setor 05
      "setor05:adega-midea": "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop&crop=center",
      "setor05:dois-frigobares": "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop&crop=center",
      "setor05:cervejeira-vertical": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&crop=center",
      "setor05:adega-bac51": "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop&crop=center",
      "setor05:vazio-s5": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center",
      
      // Extra03
      "extra03:armario-aereo": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center",
      "extra03:sem-armario": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center"
    };

    // Get the most recent selection to determine current image - optimized
    const lastSelection = state.selections[state.selections.length - 1];
    if (lastSelection) {
      const key = `${lastSelection.groupId}:${lastSelection.optionId}`;
      console.log('Looking for image with key:', key);
      console.log('Available keys:', Object.keys(imageMap));
      // Prefer option.image when provided
      if (lastSelection.option?.image) {
        console.log('Using option.image:', lastSelection.option.image);
        return lastSelection.option.image;
      }
      console.log('Found image:', imageMap[key]);
      return imageMap[key] || "/lovable-uploads/7c93c178-35c4-4357-bd73-2b3c6501865b.png";
    }
    
    // Default image
    return "/lovable-uploads/7c93c178-35c4-4357-bd73-2b3c6501865b.png";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Timeline */}
      <Timeline 
        steps={stepTitles}
        currentStep={state.currentStep}
        completedSteps={completedSteps}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {!isLastStep && (
            <>
              {/* Image Section - Fixed */}
              <div className="lg:col-span-5">
                <div className="sticky top-8">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-elegant hover:shadow-glow transition-smooth cursor-pointer group bg-white">`
                    <img 
                      src={getCurrentImage()}
                      alt="Pré-visualização da configuração do módulo"
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-105 transition-smooth"
                      onError={(e) => {
                        console.error('Erro ao carregar imagem:', getCurrentImage());
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                      onClick={() => {
                        // Create modal for image zoom
                        const modal = document.createElement('div');
                        modal.className = 'fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4';
                        modal.onclick = () => modal.remove();
                        
                        const img = document.createElement('img');
                        img.src = getCurrentImage();
                        img.className = 'max-w-full max-h-full object-contain rounded-lg';
                        
                        modal.appendChild(img);
                        document.body.appendChild(modal);
                      }}
                    />
                    
                    {/* Zoom indicator */}
                    <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-smooth">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Sector Thumbnails - Only show on accessories step */}
                  {isAccessoriesStep && (
                    <SectorThumbnails 
                      selectedSector={selectedSector}
                      onThumbnailClick={handleThumbnailClick}
                    />
                  )}
                  
                  {/* Price Display */}
                  <div className="mt-6">
                    <PriceDisplay basePrice={basePrice} totalPrice={totalPrice} />
                  </div>
                </div>
              </div>

              {/* Form Section - Scrollable */}
              <div className="lg:col-span-7">
                <div className="space-y-6">
                  {currentStepData && (
                    <>
                      <div>
                        <h1 className="text-3xl font-bold text-primary mb-2">
                          {currentStepData.title}
                        </h1>
                        <p className="text-muted-foreground">
                          Selecione as opções desejadas para continuar
                        </p>
                      </div>

                      <div className="space-y-6">
                        {currentStepData.groups.map((group) => (
                          <OptionGroup
                            key={group.id}
                            group={group}
                            selections={state.selections}
                            onSelectionChange={handleSelectionChange}
                            disabled={!isGroupEnabled(group.id)}
                            selectedSector={isAccessoriesStep ? selectedSector : undefined}
                            onSectorSelect={isAccessoriesStep ? handleSectorSelect : undefined}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-8 border-t">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={state.currentStep === 0}
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Anterior
                    </Button>

                    <Button
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className="flex items-center gap-2"
                    >
                      Próximo
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {isLastStep && (
            <div className="lg:col-span-12">
              <div className="space-y-6">
                <Summary 
                  selections={state.selections}
                  basePrice={basePrice}
                  totalPrice={totalPrice}
                />

                {/* Navigation */}
                <div className="flex justify-between items-center pt-8 border-t">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </Button>

                  <Button
                    onClick={() => setShowQuoteDialog(true)}
                    className="flex items-center gap-2 px-8 py-3 text-lg font-bold bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant"
                    size="lg"
                  >
                    💰 Solicitar Orçamento
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Quote Dialog */}
      <QuoteDialog 
        open={showQuoteDialog} 
        onOpenChange={setShowQuoteDialog} 
      />
    </div>
  );
};
