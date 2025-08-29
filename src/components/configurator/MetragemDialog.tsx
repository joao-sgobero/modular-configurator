import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import modularBaseImage from "@/assets/modular-base.jpg";
import mdfCarvalhoImage from "@/assets/mdf-carvalho.jpg";
import mdfCinzaImage from "@/assets/mdf-cinza.jpg";

interface MetragemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MetragemDialog = ({ open, onOpenChange }: MetragemDialogProps) => {
  const images = [
    {
      src: modularBaseImage,
      alt: "Módulo Base - Vista Geral",
      title: "Vista Geral do Módulo"
    },
    {
      src: mdfCarvalhoImage,
      alt: "Detalhes da Marcenaria",
      title: "Detalhes da Marcenaria"
    },
    {
      src: mdfCinzaImage,
      alt: "Dimensões Específicas",
      title: "Dimensões Específicas"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Informações de metragem
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Carousel className="w-full max-w-3xl mx-auto">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="space-y-4">
                    <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-center text-primary">
                      {image.title}
                    </h3>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          
          <div className="text-muted-foreground space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};