"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export function StartApplicationButton({ className = "" }) {
  const router = useRouter();
  return (
    <Button className={className} onClick={() => router.push("/application")}>Start Application Now</Button>
  );
} 