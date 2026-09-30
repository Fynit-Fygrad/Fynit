import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { WorkspaceProvider } from '@/components/dashboard/WorkspaceProvider';
import { DemoNotice } from '@/components/dashboard/WorkspaceUI';
import '@/styles/dashboard/workspace.css';
import { requireUser } from '@/lib/auth-access';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  return (
    <WorkspaceProvider userName={user.name}><div className="fynit-workspace flex h-dvh w-full overflow-hidden bg-white dark:bg-[#0B1120]">
      <DashboardSidebar userName={user.name} isAdmin={user.role === 'ADMIN'} />
      <div className="min-w-0 flex-1 flex flex-col overflow-hidden bg-white dark:bg-[#0B1120]">
        <DemoNotice />
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div></WorkspaceProvider>
  );
}
