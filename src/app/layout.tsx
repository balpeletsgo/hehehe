import "@/styles/globals.css";

import { type Metadata } from "next";
import localFont from "next/font/local";

import { TRPCReactProvider } from "@/trpc/react";
import { HydrateClient } from "@/trpc/server";
import { Toaster } from "@/components/ui/sonner";
import {
  CheckCircleIcon,
  CircleAlertIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import SessionProvider from "@/providers/session-provider";
import { SessionChecker } from "@/components/session-checker";

export const metadata: Metadata = {
  title: "Acme Inc",
  description: "Acme Inc",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const plusJakartaSnas = localFont({
  src: "./fonts/PlusJakartaSansVF.ttf",
  variable: "--font-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.ttf",
  variable: "--font-mono",
});

const lora = localFont({
  src: "./fonts/LoraVF.ttf",
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSnas.variable} ${geistMono.variable} ${lora.variable}`}
    >
      <body>
        <TRPCReactProvider>
          <HydrateClient>
            <SessionProvider>
              <SessionChecker />
              {children}
            </SessionProvider>
            <Toaster
              closeButton
              position="top-center"
              icons={{
                success: (
                  <CheckCircleIcon className="!size-4 !text-green-800" />
                ),
                warning: (
                  <TriangleAlertIcon className="!size-4 !text-amber-800" />
                ),
                error: <CircleAlertIcon className="!size-4 !text-red-800" />,
                close: <XIcon className="size-4" />,
              }}
              toastOptions={{
                unstyled: false,
                classNames: {
                  closeButton:
                    "!self-baseline !shrink-0 !text-foreground !relative !order-[99] !border-none ![&>svg]:h-4 ![&>svg]:w-4 !h-6 !w-4 !transform-none !pr-0 !bg-transparent",
                  icon: "!shrink-0 !h-full !w-4 !m-0 !mt-1 !self-start !items-start",
                  toast:
                    "!rounded-md !bg-background !border !border-border !text-foreground",
                  default:
                    "!gap-x-2 !flex !items-center !justify-center !py-3 !px-4 !rounded-md !w-full",
                  success: "!bg-green-100 !text-green-800 !border-green-800",
                  error: "!bg-red-100 !text-red-800 !border-red-800",
                  warning: "!bg-amber-100 !text-amber-800 !border-amber-800",
                  content: "!shrink-1 !gap-y-1 !w-full",
                  description: "!text-foreground",
                },
              }}
            />
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
