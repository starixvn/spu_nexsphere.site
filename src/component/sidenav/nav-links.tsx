'use client';

import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import links from '@/src/initial-data/links';
  

export default function NavLinks() {
  const pathname = usePathname();
  const [openLink, setOpenLink] = useState<string | null>(null);

  useEffect(() => {
    const activeLink = links.find(link =>
      link.href === pathname ||
      (link.subLinks && link.subLinks.some(subLink => pathname === subLink.href))
    );
    if (activeLink) {
      setOpenLink(activeLink.name);
    }
  }, [pathname]);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href || (link.subLinks && link.subLinks.some(subLink => pathname === subLink.href));
        const isOpen = openLink === link.name;

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
                if (link.subLinks && link.subLinks.length > 0) {
                  e.preventDefault();
                  setOpenLink(openLink === link.name ? null : link.name);
                }
              }}
            >
              <div className="flex items-center gap-2">
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{link.name}</p>
              </div>
              {link.subLinks && link.subLinks.length > 0 && (
                <span className="ml-auto">
                  {isOpen ? (
                    <ChevronDownIcon className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                  )}
                </span>
              )}
            </Link>
            {/* Hiển thị sub-links nếu có và người dùng có quyền xem ít nhất một sub-link */}
            {isOpen && link.subLinks && link.subLinks.length > 0 && (
              <div className="ml-0 pl-8">
                {link.subLinks.map((subLink) => {
                  const isSubLinkActive = pathname === subLink.href;

                  return (
                    <Link
                      key={subLink.name}
                      href={subLink.href}
                      className={clsx(
                        'block p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600',
                        {
                          'bg-sky-100 text-blue-600': isSubLinkActive,
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
