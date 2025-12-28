import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/global/theme-provider"
import QueryProvider from "@/components/global/query-provider";
import { Toaster } from "@/components/ui/toaster"
import { draftMode } from "next/headers"
import { VisualEditing } from "next-sanity"
import AlertBanner from "@/components/blog/disable-draft-mode"
import Preloader from '@/components/global/preloader';
import { TransitionProvider } from '@/components/global/transition-context';
import TransitionOverlay from '@/components/global/transition-overlay';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ACM RVCE',
  description: 'ACM RVCE',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full`}>
      {isDraftMode && <AlertBanner />}

      <Preloader />

          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <TransitionProvider>
                <TransitionOverlay />
                {children}
              </TransitionProvider>
            </ThemeProvider>
          </QueryProvider>
        <Toaster />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  )
}
