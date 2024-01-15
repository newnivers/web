import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";

const initWorkForm = {
  category: "SHOW",
  title: "",
  place: 0,
  genre: "",
  age_limit: 0,
  running_time: 0,
  inter_mission: 0,
  ticket_open_at: "",
  ticket_close_at: "",
  schedules: [],

  image: "",
  description: "",
  caution_description: "",

  is_free: true,
  purchase_limit_count: 1,
  price: 0,

  reserved_seat: false,
};

const WorkFormContext = createContext<{
  workForm: UseFormReturn<FieldValues> | null;
}>({
  workForm: null,
});

interface Props {
  children: ReactNode;
}

function WorkFormProvider({ children }: Props) {
  const workForm = useForm<FieldValues>({
    defaultValues: initWorkForm,
  });

  return (
    <WorkFormContext.Provider value={{ workForm }}>
      {children}
    </WorkFormContext.Provider>
  );
}

const useWorkForm = () => {
  const { workForm } = useContext(WorkFormContext);

  if (!workForm) {
    throw new Error("useWorkForm must be used within a WorkFormProvider");
  }

  return workForm;
};

export const WorkForm = {
  Provider: WorkFormProvider,
  onlyHook: useWorkForm,
};
