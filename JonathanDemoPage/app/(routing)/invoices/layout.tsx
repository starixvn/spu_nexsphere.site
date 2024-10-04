import '@/app/styles/global.css';
import React from 'react';
import { Metadata } from 'next';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: {
    template: 'Invoices | %s',
    default: 'Invoices',
  }
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <>
      {React.cloneElement(children as React.ReactElement, { session })}
    </>
  );
}
