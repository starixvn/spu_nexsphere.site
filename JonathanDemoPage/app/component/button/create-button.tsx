'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Permission } from '@/app/lib/definitions';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/redux/features/user/sessionSlice';

interface CreateButtonProps {
  href: string;
  label: string;
  requiredPermission?: string;
  routePath: string;
}

const requiredPermission = 'create';

function hasPermission(permission: Permission, routePath: string): boolean {
  const routePathPermissions = permission[routePath] || '';
  return routePathPermissions.includes(requiredPermission) || routePathPermissions.includes('full-access');
}

export function CreateButton({ href, label, routePath }: CreateButtonProps) {
  
  const sessionState = useSelector(selectUser);
  const permission = sessionState?.session?.permission;

  if (!permission) {
    return null;
  }

  if (!hasPermission(permission, routePath)) return null;

  return (
    <Link
      href={href}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{label}</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
