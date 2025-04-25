import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, Controller, FieldValues } from "react-hook-form";

import { Input } from "@/components/ui/input";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "file";
}
const FormField = ({
  control,
  label,
  name,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            <Input
              className="input"
              placeholder={placeholder}
              {...field}
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;
