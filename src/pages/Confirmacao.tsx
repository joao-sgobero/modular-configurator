import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Copy, Check } from "lucide-react";

const Confirmacao = () => {
  const [orderCode, setOrderCode] = useState("");
  const [copied, setCopied] = useState(false);

  // Gerar código de 6 dígitos ao carregar a página
  useEffect(() => {
    const generateCode = () => {
      return Math.random().toString().slice(2, 8).padStart(6, '0');
    };
    setOrderCode(generateCode());
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(orderCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "5511999999999"; // Substitua pelo número real
    const message = `Olá! Tenho interesse no Módulo Gourmet e gostaria de agilizar o atendimento. Meu código do pedido é: ${orderCode}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 text-center space-y-8">
        {/* Ícone de sucesso */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>

        {/* Título principal */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-primary">
            Solicitação Enviada com Sucesso!
          </h1>
          <p className="text-lg text-muted-foreground">
            Obrigado pelo seu interesse no Módulo Gourmet
          </p>
        </div>

        {/* Código do pedido */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            Código do seu Pedido
          </h2>
          
          <div className="bg-muted/30 rounded-lg p-6 border-2 border-dashed border-primary/20">
            <div className="flex items-center justify-center gap-3">
              <div className="font-mono text-4xl font-bold text-primary tracking-wider">
                {orderCode}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCode}
                className="flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mensagem informativa */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
          <h3 className="font-semibold text-blue-900 mb-2">
            📋 Próximos Passos:
          </h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>✅ Em breve, um consultor especializado entrará em contato com você</li>
            <li>💾 <strong>Salve este código!</strong> Ele agilizará seu atendimento</li>
            <li>📱 Para atendimento mais rápido, entre em contato pelo WhatsApp</li>
          </ul>
        </div>

        {/* Botão WhatsApp */}
        <div className="space-y-4">
          <Button
            onClick={handleWhatsAppClick}
            className="w-full py-4 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-3"
            size="lg"
          >
            <MessageCircle className="w-6 h-6" />
            Conversar no WhatsApp
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Ao clicar no botão acima, uma mensagem com seu código será enviada automaticamente
          </p>
        </div>

        {/* Botão voltar */}
        <div className="pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Voltar ao Configurador
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Confirmacao;