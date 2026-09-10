import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white dark:bg-[#0B1120]">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-[#0B1120]">
        {children}
      </div>
    </div>
  );
}
