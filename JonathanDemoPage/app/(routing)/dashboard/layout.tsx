import '@/app/styles/global.css';
import { Metadata } from 'next';
import SideNav from '@/app/component/sidenav';

export const metadata: Metadata = {
  title: {
    template: 'Dashboard | %s',
    default: 'Dashboard',
  }
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
