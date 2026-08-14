import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/shared/components/Slidebar'



export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  console.log('SESSION:', JSON.stringify(session, null, 2))  // 
  if (!session) redirect('/login')

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role={session.user.role} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}