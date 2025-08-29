
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { OptionGroup as OptionGroupType, Option, Selection } from "@/types/configurator";
import { useEffect } from "react";

interface OptionGroupProps {
  group: OptionGroupType;
  selections: Selection[];
  onSelectionChange: (groupId: string, optionId: string, option: Option) => void;
  disabled?: boolean;
  selectedSector?: string | null;
  onSectorSelect?: (sectorId: string) => void;
}

export const OptionGroup = ({ 
  group, 
  selections, 
  onSelectionChange, 
  disabled = false,
  selectedSector,
  onSectorSelect
}: OptionGroupProps) => {
  const selectedOption = selections.find(s => s.groupId === group.id);
  
  // Handle selection change with immediate sector highlight
  const handleOptionChange = (value: string) => {
    const option = [...group.options, ...(group.extras || [])].find(o => o.id === value);
    if (option) {
      onSelectionChange(group.id, value, option);
      
      // Immediately highlight sector when option is selected
      if (group.id.startsWith('setor') && onSectorSelect) {
        onSectorSelect(group.id);
      }
    }
  };

  // Handle extra selection change with immediate sector highlight
  const handleExtraChange = (value: string) => {
    const option = group.extras?.find(o => o.id === value);
    if (option) {
      onSelectionChange(`${group.id}-extra`, value, option);
      
      // Immediately highlight sector when extra is selected
      if (group.id.startsWith('setor') && onSectorSelect) {
        onSectorSelect(group.id);
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <Card className={cn(
      "p-6 transition-smooth",
      disabled && "opacity-30 pointer-events-none"
    )}>
      <div className="space-y-4">
        <div>
          <div 
            className={cn(
              "flex items-center gap-2 transition-fast",
              selectedSector === group.id ? "text-primary" : "hover:text-primary",
              // Make it clickable only for sector groups
              group.id.startsWith('setor') && "cursor-pointer"
            )}
            onClick={() => {
              if (onSectorSelect && group.id.startsWith('setor')) {
                onSectorSelect(group.id);
              }
            }}
          >
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {group.title}
              {group.required && <span className="text-destructive text-sm">*</span>}
            </h3>
          </div>
          
          {group.description && (
            <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
          )}
          
          {/* Sector indicator message - appears when sector has selection */}
          {selectedOption && selectedSector === group.id && onSectorSelect && group.id.startsWith('setor') && (
            <div className="mt-2 p-2 bg-primary/5 border border-primary/10 rounded-md">
              <p className="text-xs text-muted-foreground">
                💡 Visualize o local deste setor na foto em destaque abaixo da foto principal do lado esquerdo.
              </p>
            </div>
          )}
        </div>

        <RadioGroup 
          value={selectedOption?.optionId || ""} 
          onValueChange={handleOptionChange}
          className="space-y-3"
        >
          {group.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-3 group">
              <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
              <Label 
                htmlFor={option.id} 
                className="flex-1 cursor-pointer group-hover:text-primary transition-fast"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium">{option.name}</div>
                    {option.description && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <span className={cn(
                      "font-semibold text-sm px-3 py-1 rounded-full",
                      option.price > 0 
                        ? "bg-success-light text-success" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      {formatPrice(option.price)}
                    </span>
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>

        {/* Extras Section */}
        {group.extras && group.extras.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              EXTRA:
              <span className="text-destructive text-sm">*</span>
            </h4>
            <RadioGroup 
              value={selections.find(s => s.groupId === `${group.id}-extra`)?.optionId || ""} 
              onValueChange={handleExtraChange}
              className="space-y-3"
            >
              {group.extras.map((option) => (
                <div key={option.id} className="flex items-center space-x-3 group">
                  <RadioGroupItem value={option.id} id={`extra-${option.id}`} className="mt-1" />
                  <Label 
                    htmlFor={`extra-${option.id}`} 
                    className="flex-1 cursor-pointer group-hover:text-primary transition-fast"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{option.name}</div>
                        {option.description && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {option.description}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <span className={cn(
                          "font-semibold text-sm px-3 py-1 rounded-full",
                          option.price > 0 
                            ? "bg-success-light text-success" 
                            : "bg-muted text-muted-foreground"
                        )}>
                          {formatPrice(option.price)}
                        </span>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
      </div>
    </Card>
  );
};
