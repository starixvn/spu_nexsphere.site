import '@/app/styles/global.css';
import { Metadata } from 'next';
import SideNav from '@/app/component/sidenav';

export const metadata: Metadata = {
  title: {
    template: '%s | Report',
    default: 'Report',
  }
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
