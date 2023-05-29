import clsx from "clsx";
import { IconType } from "react-icons";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  label: string;
  icon?: IconType;
}

const Button = ({
  type = "button",
  fullWidth,
  onClick,
  secondary,
  danger,
  disabled,
  label,
  icon: Icon,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
        flex 
        justify-center 
        items-center
        gap-2
        rounded-md 
        px-3 
        py-2 
        text-sm 
        font-semibold 
        focus-visible:outline 
        focus-visible:outline-2 
        focus-visible:outline-offset-2 
        `,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary
          ? "text-gray-900 ring-[1px] ring-lime-500  hover:shadow-md "
          : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-lime-500 hover:bg-lime-400 focus-visible:bg-lime-400 hover:shadow-md"
      )}
    >
      {label}
      {Icon && <Icon size={24} />}
    </button>
  );
};

export default Button;
