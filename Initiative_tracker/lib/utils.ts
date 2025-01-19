import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Char {
  id: number;
  name: string;
  roll: number;
  conditions: string[][];
  damage: number;
}