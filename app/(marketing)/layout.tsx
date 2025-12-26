import { Metadata } from "next"
import { Header } from "@/components/global/header"
import Footer from "@/components/global/footer"
import { footerConfig } from "@/lib/config/footer"

export const metadata: Metadata = {
  title: "ACM RVCE",
  description: "ACM RVCE",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <main >
            <Header />
            <div className="min-h-screen w-full">
            {children}
            </div>
            <Footer config={footerConfig} />
        </main>
  )
} 