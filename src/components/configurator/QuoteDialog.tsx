import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuoteDialog = ({ open, onOpenChange }: QuoteDialogProps) => {
  const [step, setStep] = useState<"form" | "loading" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setStep("loading");
    
    // Simular envio
    setTimeout(() => {
      setStep("success");
      
      // Após 2 segundos, fechar dialog e ir para página de confirmação
      setTimeout(() => {
        onOpenChange(false);
        setStep("form");
        setFormData({ name: "", phone: "" });
        navigate("/confirmacao");
      }, 2000);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.name.trim() && formData.phone.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {step === "form" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-primary">
                Solicitar Orçamento
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nome completo
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-3 text-lg font-semibold bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant"
                disabled={!isFormValid}
              >
                Enviar Solicitação
              </Button>
            </form>
          </>
        )}

        {step === "loading" && (
          <div className="py-8 text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-primary">
                Processando sua solicitação...
              </h3>
              <p className="text-muted-foreground mt-2">
                Por favor, aguarde enquanto enviamos seus dados.
              </p>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-600">
                Solicitação Enviada!
              </h3>
              <p className="text-muted-foreground mt-2">
                Redirecionando para confirmação...
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};