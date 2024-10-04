import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface UpdateButtonProps {
    href: string;
}

export function UpdateButton({ href }: UpdateButtonProps) {
    return (
        <Link
            href={href}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}