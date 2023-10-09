import { createContext, useContext, useCallback, useRef } from "react";
import type { ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";
// import { useRouter } from "next/router";

const StepNavigatorContext = createContext({
  currentStep: "",
  currentStepPos: 0,
  isFirstStep: true,
  isLastStep: false,
  movePrev: () => {},
  moveNext: () => {},
});

interface Props {
  steps: string[];
  children: (currentStep: string, currentStepPos: number) => ReactNode;
}

function StepNavigatorProvider({ steps, children }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStep = searchParams.get("step") ?? steps[0];
  const currentStepPos = steps.indexOf(currentStep);

  const stepInfoRef = useRef({
    isFirstStep: true,
    isLastPage: false,
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

    // router.push({
    //   pathname: "/register",
    //   query: {
    //     step: currentStepPos + 1,
    //   },
    // });

    stepInfoRef.current.isFirstStep = false;
    stepInfoRef.current.isLastPage = steps[currentStepPos + 1] === lastStep;
  }, [currentStep, router, steps]);

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

const StepNavigator = {
  Provider: StepNavigatorProvider,
  onlyHook: useStepNavigator,
};

export default StepNavigator;
