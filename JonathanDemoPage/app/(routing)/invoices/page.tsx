import Pagination from '@/app/component/pagination';
import Search from '@/app/component/search';
import Table from '@/app/component/invoices/table';
import { CreateButton } from '@/app/component/button/create-button';
import { lusitana } from '@/app/component/fonts';
import { InvoicesTableSkeleton } from '@/app/component/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { auth } from '@/auth';
import { Permission } from '@/app/lib/definitions';

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const pageName = 'invoices';
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchInvoicesPages(query);

    const session = await auth();
    const permission = session?.user?.permission as Permission;

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateButton href={`/${pageName}/create`} label={`Create ${pageName}`} permission={permission} routePath={pageName} />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}