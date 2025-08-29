import { useState, useCallback, useMemo } from "react";
import { ConfiguratorState, Selection, Option, STEPS } from "@/types/configurator";

export const useConfigurator = () => {
  const [state, setState] = useState<ConfiguratorState>({
    currentStep: 0,
    selections: [],
    totalPrice: 0
  });

  const currentStepData = STEPS[state.currentStep];
  const isLastStep = state.currentStep === STEPS.length;

  // Calculate base price - fixed base value
  const basePrice = useMemo(() => {
    return 22901.02; // Fixed base price
  }, []);

  // Calculate total price
  const totalPrice = useMemo(() => {
    return basePrice + state.selections.reduce((total, selection) => total + selection.option.price, 0);
  }, [state.selections, basePrice]);

  // Check if a group is enabled (dependencies satisfied)
  const isGroupEnabled = useCallback((groupId: string) => {
    const group = currentStepData?.groups.find(g => g.id === groupId);
    if (!group?.dependsOn || group.dependsOn.length === 0) return true;

    return group.dependsOn.every(depGroupId => 
      state.selections.some(selection => selection.groupId === depGroupId)
    );
  }, [currentStepData, state.selections]);

  // Check if current step is valid (all required groups have selections)
  const isStepValid = useCallback(() => {
    if (!currentStepData) return false;
    
    const requiredGroups = currentStepData.groups.filter(group => 
      group.required && isGroupEnabled(group.id)
    );

    const hasAllRequiredSelections = requiredGroups.every(group =>
      state.selections.some(selection => selection.groupId === group.id)
    );

    // Check if all extras are selected when they exist
    const hasAllExtrasSelected = currentStepData.groups.every(group => {
      if (!group.extras || group.extras.length === 0) return true;
      return state.selections.some(selection => selection.groupId === `${group.id}-extra`);
    });

    return hasAllRequiredSelections && hasAllExtrasSelected;
  }, [currentStepData, state.selections, isGroupEnabled]);

  // Handle selection change
  const handleSelectionChange = useCallback((groupId: string, optionId: string, option: Option) => {
    setState(prevState => {
      const newSelections = prevState.selections.filter(s => s.groupId !== groupId);
      newSelections.push({ groupId, optionId, option });
      
      return {
        ...prevState,
        selections: newSelections
      };
    });
  }, []);

  // Navigate to next step
  const nextStep = useCallback(() => {
    if (isStepValid() && !isLastStep) {
      setState(prevState => ({
        ...prevState,
        currentStep: prevState.currentStep + 1
      }));
    }
  }, [isStepValid, isLastStep]);

  // Navigate to previous step
  const prevStep = useCallback(() => {
    if (state.currentStep > 0) {
      setState(prevState => ({
        ...prevState,
        currentStep: prevState.currentStep - 1
      }));
    }
  }, [state.currentStep]);

  // Get completed steps
  const completedSteps = useMemo(() => {
    const completed: number[] = [];
    
    for (let i = 0; i < state.currentStep; i++) {
      const step = STEPS[i];
      const requiredGroups = step.groups.filter(group => group.required);
      const isCompleted = requiredGroups.every(group =>
        state.selections.some(selection => selection.groupId === group.id)
      );
      
      if (isCompleted) {
        completed.push(i);
      }
    }
    
    return completed;
  }, [state.currentStep, state.selections]);

  return {
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
  };
};