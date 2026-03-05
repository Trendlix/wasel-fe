import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary";
}

export const Button = ({ className, variant, ...props }: ButtonProps) => {
    const variantClasses = {
        primary: "bg-white text-black border border-white rounded-full px-7 py-5 hover:bg-main-flatBlack hover:text-white transition-all duration-300",
        secondary: "bg-main-flatBlack text-white border border-white rounded-full px-7 py-5 hover:bg-white hover:text-main-flatBlack transition-all duration-300",
    };
    const baseClasses = variantClasses[variant ?? "primary"];
    return (
        <button
            className={cn(baseClasses, className)}
            {...props}
        >
            {props.children}
        </button>
    );
};