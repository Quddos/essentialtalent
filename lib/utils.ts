import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ErrorResponse {
  message: string;
  statusCode: number;
}

export function handleError(error: any): ErrorResponse {
  console.error('Error:', error);

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500
    };
  }

  if (typeof error === 'string') {
    return {
      message: error,
      statusCode: 500
    };
  }

  return {
    message: 'An unexpected error occurred',
    statusCode: 500
  };
}
