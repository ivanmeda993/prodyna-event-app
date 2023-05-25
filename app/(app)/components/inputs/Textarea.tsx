import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextareaProps {
  label: string;
  id: string;
  required?: boolean;
  rows?: number;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}
const Textarea = ({
  label,
  id,
  register,
  errors,
  disabled,
  required,
  rows = 5,
}: TextareaProps) => {
  return (
    <div>
      {/* Label for the textarea */}
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      {/* Textarea field */}
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        rows={rows}
        className={clsx(
          // Styles for the textarea field using Tailwind classes and dynamic values
          `form-textarea block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-[1px] focus:ring-lime-500 sm:text-sm sm:leading-6`,
          // Add error styles if the field has errors
          errors[id] &&
            `border-red-300 text-red-900 placeholder-red-300 focus:ring-rose-500`,
          // Add disabled styles if the field is disabled
          disabled && `opacity-50 cursor-default`
        )}
      ></textarea>
    </div>
  );
};
export default Textarea;
