import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
}

export function removeEmpty(obj: { [x: string]: any }) {
      Object.keys(obj).forEach((key) => {
            if (obj[key] && typeof obj[key] === "object") removeEmpty(obj[key]);
            else if (obj[key] === null) delete obj[key];
      });
      return obj;
}

export function getNumberRange(from: number, to: number): number[] {
      return new Array(to - from + 1).fill("").map((_, i) => i + from);
}

export function reverseMap(enumObj: any, value: string) {
      return Object.keys(enumObj).find((key) => enumObj[key] === value);
}
