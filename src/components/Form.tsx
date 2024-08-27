import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Box, Button, TextField } from "@cruk/cruk-react-components";
import { Dispatch, SetStateAction } from "react";
import { NasaSearchParams } from "../types";

export const formSchema = z.object({
  // TODO: update validation schema here
  demoField: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;

export const initialData = {
  demoField: "",
} as unknown as FormValues;

export function Form({
  setValues,
}: {
  setValues: Dispatch<SetStateAction<NasaSearchParams | undefined>>;
}) {
  const formProps = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "firstError",
    shouldFocusError: true,
    defaultValues: initialData,
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = formProps;

  const onSubmit: SubmitHandler<FormValues> = async (
    data,
    e,
  ): Promise<void> => {
    console.log({ data });
    // TODO do something on sumbit
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        {/* TODO update form elements */}
        <Box marginBottom="m">
          <TextField
            {...register("demoField")}
            errorMessage={errors.demoField?.message}
            label="Demo Field"
            required
          />
        </Box>
        <Box marginBottom="m">
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </>
  );
}
