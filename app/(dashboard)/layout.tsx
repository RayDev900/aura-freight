import Slidebar from "@/shared/components/Slidebar"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>
    <Slidebar />
    {children}
    </>
  }