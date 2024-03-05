import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const personInfoSchema = z.object({
  name: z.string().min(1, "Please enter your first name"),
  address: z.object({
    addressLine1: z.string().min(1, "Please enter your street address"),
  }),
});

export type PersonInfo = z.infer<typeof personInfoSchema>;

interface PersonInfoStore {
  personInfo: PersonInfo;
  setPersonInfo: (info: PersonInfo) => void;
}

export const usePersonInfoStore = create<PersonInfoStore>()(
  immer(
    persist(
      (set) => ({
        personInfo: { address: { addressLine1: "" }, name: "" },
        setPersonInfo: (info) =>
          set((state) => {
            state.personInfo = info;
          }),
      }),
      {
        name: "person-info",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
