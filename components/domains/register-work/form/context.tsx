import type { ReactNode, MutableRefObject } from "react";
import { createContext, useContext, useRef } from "react";
import type { WorkFormPerStep } from "../shared/type";

const initWorkForm: WorkFormPerStep = {
  default: {
    category: "SHOW",
    title: "",
    place: 0,
    genre: "",
    age_limit: 0,
    running_time: 0,
    inter_mission: 0,
    schedules: [],
  },
  detail: {
    image: "",
    description: "",
    caution_description: "",
  },
  price: {
    is_free: true,
    purchase_limit_count: 1,
    price: 0,
  },
  seat: {
    reserved_seat: false,
    ticket_open_at: "",
    ticket_close_at: "",
  },
};

const WorkFormContext = createContext<{
  cachedWorkForm: WorkFormPerStep;
}>({
  cachedWorkForm: initWorkForm,
});

interface Props {
  children: ReactNode;
}

function WorkFormProvider({ children }: Props) {
  const cachedWorkForm = useRef<WorkFormPerStep>(initWorkForm);

  return (
    <WorkFormContext.Provider
      value={{ cachedWorkForm: cachedWorkForm.current }}
    >
      {children}
    </WorkFormContext.Provider>
  );
}

const useWorkForm = () => useContext(WorkFormContext);

export const WorkForm = {
  Provider: WorkFormProvider,
  onlyHook: useWorkForm,
};
