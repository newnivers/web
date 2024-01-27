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
  ticket_open_date: "",
  ticket_open_time: "",
  ticket_close_date: "",
  ticket_close_time: "",
  schedules: [],

  image: null,
  description: defaultDescription,
  caution_description: defaultCautionDescription,
  is_free: null,
  purchase_limit_count: 1,
  price: 0,

  reserved_seat: null,
  seat_max_count: 0,
};

const WorkFormContext = createContext<{
  workForm: UseFormReturn<FieldValues> | null;
  editorManager: {
    cachedEditorImages: MutableRefObject<EditorImage[]>;
    updateEditorImages: (
      file: File,
      source: string | ArrayBuffer | null
    ) => void;
    processCachedImagesFromHtml: (
      originHtml: string
    ) => Promise<string | undefined>;
  };
}>({
  workForm: null,
  editorManager: {
    cachedEditorImages: { current: [] },
    updateEditorImages: () => {},
    processCachedImagesFromHtml: async () => undefined,
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
