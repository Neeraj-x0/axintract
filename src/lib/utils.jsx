import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names using clsx and tailwind-merge
 * @param inputs - Array of ClassValue (string | number | boolean | undefined | null | Record<string, boolean | undefined | null>)
 * @returns Merged and optimized className string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}