import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';
import { Permission } from '@/app/lib/definitions';
import { useCallback } from 'react';

interface ButtonProps {
  requiredPermission: string;
  resource: string;
}

interface CreateButtonProps extends ButtonProps {
  href: string;
  label: string;
  permission: Permission;
}

function hasPermission(permission: Permission, resource: string, requiredPermission: string): boolean {
  const resourcePermissions = permission[resource] || '';
  return resourcePermissions.includes(requiredPermission) || resourcePermissions.includes('full-access');
}

export function CreateButton({ href, label, permission, requiredPermission = 'create', resource }: CreateButtonProps) {
  if (!permission) {
    return null;
  }

  if (!hasPermission(permission, resource, requiredPermission)) return null;

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

interface UpdateButtonProps extends ButtonProps {
  href: string;
}

export function UpdateButton({ href, requiredPermission, resource }: UpdateButtonProps) {
  return (
    <Link
      href={href}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

interface DeleteButtonProps extends ButtonProps {
  onDelete: () => void;
}

export function DeleteButton({ onDelete, requiredPermission, resource }: DeleteButtonProps) {
  return (
    <form action={onDelete}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

// Cập nhật các hàm sử dụng

export function UpdateInvoice({ id, permission }: { id: string, permission: Permission }) {
  return <UpdateButton href={`/invoices/${id}/edit`} requiredPermission="edit" resource="invoices" />;
}

export function DeleteInvoice({ id, permission }: { id: string, permission: Permission }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return <DeleteButton onDelete={deleteInvoiceWithId} requiredPermission="full-access" resource="invoices" />;
}
