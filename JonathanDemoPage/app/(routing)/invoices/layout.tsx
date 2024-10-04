import '@/app/styles/global.css';
import { Metadata } from 'next';
import SideNav from '@/app/component/sidenav';
import ReduxProvider from "@/app/ReduxProvider";
import { Permission } from '@/app/lib/definitions';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: {
    template: 'Invoices | %s',
    default: 'Invoices',
  }
};

// interface HasPermissionProps {
//   requiredPermission: string;
//   permission: Permission;
//   routePath: string;
// }

// const createPermission = 'create';

// function hasPermission({ requiredPermission, permission, routePath }: HasPermissionProps): boolean {
//   const routePathPermissions = permission[routePath] || '';
//   return routePathPermissions.includes(requiredPermission) || routePathPermissions.includes('full-access');
// }

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <ReduxProvider>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">

          {React.cloneElement(children as React.ReactElement, { session })}
        </div>
      </div>
    </ReduxProvider>
  );
}
