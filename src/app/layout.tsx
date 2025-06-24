import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BUSINESS_CONFIG } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: `${BUSINESS_CONFIG.BUSINESS_NAME} - Online Appointment Scheduler`,
  description: `Schedule your appointment online with ${BUSINESS_CONFIG.BUSINESS_NAME}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="appointment-scheduler-root">
          {children}
        </div>
      </body>
    </html>
  );
}
