import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-lg text-sm px-4 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-60 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-accent hover:bg-accent-hover text-white shadow-sm",
    secondary: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700",
    outline: "border border-accent text-accent hover:bg-accent-light bg-transparent",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-500",
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      className={`${baseStyle} ${selectedVariant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
