
import { Metadata } from 'next';
import { lusitana } from '@/app/component/fonts';
import { Suspense } from 'react';
import { CustomersTableSkeleton } from '@/app/component/skeletons';
import Table from '@/app/component/customers/table';
import Pagination from '@/app/component/pagination';
import { fetchCustomersPages } from '@/app/lib/data';

export const metadata: Metadata = {
    title: 'Report',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchCustomersPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>Report</h1>
            </div>
            <Suspense fallback={<CustomersTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}