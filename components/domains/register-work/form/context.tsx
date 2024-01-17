import type { ReactNode, MutableRefObject } from "react";
import { createContext, useContext } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useEditorManager } from "./useEditorManager";
import { defaultDescription, defaultCautionDescription } from "../shared";
import type { EditorImage } from "../shared/type";

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
  description: defaultDescription,
  caution_description: defaultCautionDescription,
  is_free: true,
  purchase_limit_count: 1,
  price: 0,

  reserved_seat: false,
};

const WorkFormContext = createContext<{
  workForm: UseFormReturn<FieldValues> | null;
  editorManager: {
    cachedEditorImages: MutableRefObject<EditorImage[]>;
    updateEditorImages: (
      file: File,
      source: string | ArrayBuffer | null
    ) => void;
  };
}>({
  workForm: null,
  editorManager: {
    cachedEditorImages: { current: [] },
    updateEditorImages: () => {},
  },
});

interface Props {
  children: ReactNode;
}

function WorkFormProvider({ children }: Props) {
  const workForm = useForm<FieldValues>({
    defaultValues: initWorkForm,
  });
  const editorManager = useEditorManager();

  return (
    <WorkFormContext.Provider value={{ workForm, editorManager }}>
      {children}
    </WorkFormContext.Provider>
  );
}

const useWorkForm = () => {
  const { workForm, editorManager } = useContext(WorkFormContext);

  if (!workForm) {
    throw new Error("useWorkForm must be used within a WorkFormProvider");
  }

  return { workForm, editorManager };
};

export const WorkForm = {
  Provider: WorkFormProvider,
  onlyHook: useWorkForm,
};
