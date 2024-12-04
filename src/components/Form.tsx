import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Box, Button, TextField, Select } from "@cruk/cruk-react-components";
import { Dispatch, SetStateAction } from "react";
import { NasaSearchParams } from "../types";

// Define the validation schema using Zod
export const formSchema = z.object({
	// Keywords field validation (required, min/max length)
	keywords: z
		.string()
		.min(2, { message: "Keywords must have at least 2 characters." })
		.max(50, { message: "Keywords must have at most 50 characters." }),

	// Media type field validation (required)
	mediaType: z.enum(["audio", "video", "image"], {
		errorMap: () => ({ message: "Please select a media type." }),
	}),

	// Year start field validation (optional, number, min/max year)
	yearStart: z
		.string()
		.optional()
		.refine(
			val => {
				if (!val) return true; // If no value, it's valid (since it's optional)
				if (isNaN(Number(val))) return false; // Ensure it's a valid number
				const year = Number(val);
				return year >= 1900 && year <= new Date().getFullYear(); // Check range
			},
			{
				message: `Year start must be between 1900 and ${new Date().getFullYear()}.`,
			}
		),
});

export type FormValues = z.infer<typeof formSchema>;

// Initial form values
export const initialData = {
	keywords: "",
	mediaType: "",
	yearStart: "",
} as unknown as FormValues;

export function Form({ setValues }: { setValues: Dispatch<SetStateAction<NasaSearchParams | undefined>> }) {
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

	const onSubmit: SubmitHandler<FormValues> = async (data, e): Promise<void> => {
		e?.preventDefault();

		// TODO do something on sumbit
		const formattedData: NasaSearchParams = {
			...data,
			yearStart: data.yearStart ? parseInt(data.yearStart) : undefined,
			page: 1,
			pageSize: 10,
		};
		setValues(formattedData);
	};

	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)}>
			<Box marginBottom="m">
				<TextField {...register("keywords")} errorMessage={errors.keywords?.message} label="Keywords" required />
			</Box>

			<Box marginBottom="m">
				<Select {...register("mediaType")} errorMessage={errors.mediaType?.message} label="Media Type" required>
					<option value="">Select Media Type</option>
					<option value="audio">Audio</option>
					<option value="video">Video</option>
					<option value="image">Image</option>
				</Select>
			</Box>

			<Box marginBottom="m">
				<TextField {...register("yearStart")} errorMessage={errors.yearStart?.message} label="Year Start" />
			</Box>

			<Box marginBottom="m">
				<Button type="submit">Submit</Button>
			</Box>
		</form>
	);
}
