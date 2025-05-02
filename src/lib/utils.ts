import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, differenceInDays, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeDate(date: Date) {
  const daysDifference = differenceInDays(new Date(), date);

  if (daysDifference > 30) {
    return format(date, "MMM d, yyyy");
  }

  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatDate(date: Date) {
  return format(date, "MMM d, yyyy");
}
