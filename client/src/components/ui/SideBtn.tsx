import { ReactNode } from "react";

interface SideBtnProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}
export default function SideBtn({
  children,
  onClick,
  className,
}: SideBtnProps) {
  return (
    <button
      className={`  text-3xl max-lg:text-lg ${className} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
