import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "../globals.css";
import { cn } from "@/utils";

const font = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login | Aurora",
  description: "Project managment tool"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(font.className, "bg-default")}>{children}</body>
    </html>
  );
}
