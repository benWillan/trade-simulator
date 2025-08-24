import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "react-bootstrap";

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
  size?: "sm" | "lg";
  loading?: boolean;
  icon?: ReactNode;
};

export const AppButton: React.FC<AppButtonProps> = ({
  children,
  variant = "primary",
  size,
  loading = false,
  icon,
  disabled,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <span className="spinner-border spinner-border-sm me-2" role="status" />}
      {icon && <span className="me-2">{icon}</span>}
      {children}
    </Button>
  );
};