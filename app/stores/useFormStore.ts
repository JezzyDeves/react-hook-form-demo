import { z } from "zod";
import { create } from "zustand";
import { DateTime } from "luxon";
import { immer } from "zustand/middleware/immer";

export const formValueSchema = z.object({
  primary: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email(),
    dateOfBirth: z
      .custom<DateTime>()
      .nullable()
      .refine((date) => date?.isValid, "Invalid date")
      .refine((date) => {
        if (!!date && date > DateTime.now()) {
          return false;
        }

        return true;
      }, `DOB must be ${DateTime.now().toFormat("MM/dd/yyyy")} or earlier`),
  }),
  dependents: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      dateOfBirth: z
        .custom<DateTime>()
        .nullable()
        .refine((date) => date?.isValid, "Invalid date")
        .refine((date) => {
          if (!!date && date > DateTime.now()) {
            return false;
          }

          return true;
        }, `DOB must be ${DateTime.now().toFormat("MM/dd/yyyy")} or earlier`),
    })
  ),
});

export type FormStoreValues = z.infer<typeof formValueSchema>;

interface FormStore {
  values: FormStoreValues;
  setValues: (v: FormStoreValues) => void;
}

export const useFormStore = create<FormStore>()(
  immer((set) => ({
    values: {
      primary: {
        dateOfBirth: null,
        email: "",
        name: "",
      },
      dependents: [],
    },
    setValues: (v) =>
      set((state) => {
        state.values = v;
      }),
  }))
);
