"use client";
import Link from 'next/link';

interface PrimaryButtonProps {
  to: string;
  label: string;
  ariaLabel?: string;
  className?: string;
}

const PrimaryButton = ({ to, label, ariaLabel, className }: PrimaryButtonProps) => (
  <Link href={to}>
    <button
      aria-label={ariaLabel || label}
      className={`bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium dark:bg-teal-500 dark:text-gray-900 dark:hover:bg-teal-400${className ? ` ${className}` : ''}`}
    >
      {label}
    </button>
  </Link>
);

export default PrimaryButton;
