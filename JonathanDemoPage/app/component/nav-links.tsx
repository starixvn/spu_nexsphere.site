'use client';

import {
  HomeIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  NewspaperIcon
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { ComponentType } from 'react';
import { AdapterUser } from 'next-auth/adapters';
import { Permission } from '@/app/lib/definitions';

const links = [
  {
    name: 'Home',
    href: '/',
    icon: HomeIcon,
    subLinks: []
  },
  {
    name: 'Invoices',
    href: '/invoices',
    icon: ShoppingBagIcon,
    subLinks: []
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: ChartBarIcon,
    subLinks: [
      { name: 'Overview', href: '/dashboard/overview' },
      { name: 'Statistics', href: '/dashboard/statistics' },
    ]
  },
  {
    name: 'Report',
    href: '/report',
    icon: NewspaperIcon,
    subLinks: [
      { name: 'Daily', href: '/report/daily' },
      { name: 'Monthly', href: '/report/monthly' },
    ]
  }
];
  
export default function NavLinks({ user }: { user: AdapterUser }) {
  const pathname = usePathname();
  const [openLink, setOpenLink] = useState<string | null>(null);
  console.log('user permission', user?.permission);

  // Hàm kiểm tra quyền truy cập
  const checkAccess = (linkName: string) => {
    if (linkName === 'Home') return true;
    if (user?.role === 'admin') return true;

    const permission: Permission = user?.permission || {};
    const requiredPermission = linkName.toLowerCase();
    return permission[requiredPermission] && permission[requiredPermission].includes('view');
  };

  useEffect(() => {
    const activeLink = links.find(link =>
      link.subLinks.some(subLink => pathname === subLink.href)
    );
    if (activeLink) {
      setOpenLink(activeLink.name);
    }
  }, [pathname]);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        const isOpen = openLink === link.name;
        const hasAccess = checkAccess(link.name);
        
        if (!hasAccess) return null; // Không hiển thị link nếu không có quyền
        
        return (
          <div key={link.name} className="w-full">
            <Link
              href={link.href}
              className={clsx(
                'w-full flex h-[48px] items-center justify-between gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:justify-start md:px-3',
                {
                  'bg-sky-100 text-blue-600': isActive,
                }
              )}
              onClick={(e) => {
                if (link.subLinks.length > 0) {
                  e.preventDefault();
                  setOpenLink(openLink === link.name ? null : link.name);
                }
              }}
            >
              <div className="flex items-center gap-2">
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{link.name}</p>
              </div>
              {link.subLinks.length > 0 && (
                <span className="ml-auto">
                  {isOpen ? (
                    <ChevronDownIcon className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                  )}
                </span>
              )}
            </Link>
            {/* Hiển thị sub-links nếu có */}
            {isOpen && link.subLinks.length > 0 && (
              <div className="ml-0 pl-8">
                {link.subLinks.map((subLink) => {
                  const isSubLinkActive = pathname === subLink.href; // Kiểm tra isActive riêng cho sublink
                  return (
                    <Link
                      key={subLink.name}
                      href={subLink.href}
                      className={clsx(
                        'block p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600',
                        {
                          'bg-sky-100 text-blue-600': isSubLinkActive, // Áp dụng isActive cho sublink
                        }
                      )}
                      style={{ width: '100%' }}
                    >
                      {subLink.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
