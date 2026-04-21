import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAssetPath(path: string) {
  if (path.startsWith('/')) {
    return `${import.meta.env.BASE_URL}${path.slice(1)}`;
  }
  return path;
}
