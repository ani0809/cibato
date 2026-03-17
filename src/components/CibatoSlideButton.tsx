import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface CibatoSlideButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: "default" | "small";
}

export default function CibatoSlideButton({
  label = "Explore Cibato",
  onClick,
  className = "",
  type = "button",
  disabled = false,
  size = "default",
}: CibatoSlideButtonProps) {
  const isSmall = size === "small";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`group flex items-center gap-3 ${isSmall ? 'pl-5 pr-1.5 py-1.5' : 'pl-8 pr-2 py-1.5'} bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <span className={isSmall ? "text-sm" : "text-base"}>{label}</span>
      <div className={`${isSmall ? 'w-8 h-8' : 'w-10 h-10'} bg-white rounded-full flex items-center justify-center`}>
        <ArrowUpRight className={`${isSmall ? 'w-4 h-4' : 'w-5 h-5'} text-cyan-500 group-hover:rotate-45 transition-transform duration-300`} />
      </div>
    </motion.button>
  );
}
