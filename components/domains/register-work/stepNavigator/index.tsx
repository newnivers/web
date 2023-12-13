import { createContext, useContext, useCallback, useRef } from "react";
import type { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQueryParams } from "@/hooks/router";
import type { WorkFormSort } from "../shared/type";

const StepNavigatorContext = createContext<{
  currentStep: WorkFormSort;
  currentStepPos: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  movePrev: () => void;
  moveNext: () => void;
}>({
  currentStep: "default",
  currentStepPos: 0,
  isFirstStep: true,
  isLastStep: false,
  movePrev: () => {},
  moveNext: () => {},
});

interface Props {
  steps: WorkFormSort[];
  children: (currentStep: WorkFormSort, currentStepPos: number) => ReactNode;
}

function StepNavigatorProvider({ steps, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { queryParams, setQueryParams } = useQueryParams(router, pathname);

  const currentStep = (queryParams.get("step") as WorkFormSort) ?? steps[0];
  const currentStepPos = steps.indexOf(currentStep);

  const stepInfoRef = useRef({
    isFirstStep: currentStepPos === 0,
    isLastPage: currentStepPos === steps.length - 1,
  });

  const movePrev = useCallback(() => {
    const firstStep = steps[0];
    if (currentStep === firstStep) {
      return;
    }

    const currentStepPos = steps.indexOf(currentStep);

    router.back();

    stepInfoRef.current.isLastPage = false;
    stepInfoRef.current.isFirstStep = steps[currentStepPos - 1] === firstStep;
  }, [currentStep, router, steps]);

  const moveNext = useCallback(() => {
    const lastStep = steps[steps.length - 1];
    if (currentStep === lastStep) {
      return;
    }

    const currentStepPos = steps.indexOf(currentStep);

    setQueryParams({
      step: steps[currentStepPos + 1],
    });

    stepInfoRef.current.isFirstStep = false;
    stepInfoRef.current.isLastPage = steps[currentStepPos + 1] === lastStep;
  }, [currentStep, setQueryParams, steps]);

  return (
    <StepNavigatorContext.Provider
      value={{
        currentStep,
        currentStepPos,
        isFirstStep: stepInfoRef.current.isFirstStep,
        isLastStep: stepInfoRef.current.isLastPage,
        movePrev,
        moveNext,
      }}
    >
      {children(currentStep, currentStepPos)}
    </StepNavigatorContext.Provider>
  );
}

const useStepNavigator = () => useContext(StepNavigatorContext);

export const StepNavigator = {
  Provider: StepNavigatorProvider,
  onlyHook: useStepNavigator,
};
