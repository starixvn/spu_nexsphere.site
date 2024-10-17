'use client'

import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue} from "@nextui-org/react";
import useSWR from "swr";
import productservice from '@/services/productservice';
import { Product } from "@/app/models/product";

const fetcher = (page: any) =>  productservice.getProducts(page).then((res) => res)

export default function ProductsClientPage() {
    const [page, setPage] = React.useState(1);

    const {data, isLoading} = useSWR(`${page}`, fetcher, {
      keepPreviousData: true,
    });
  
    const rowsPerPage = 10;
  
    const pages = React.useMemo(() => {
      return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
    }, [data?.count, rowsPerPage]);
  
    const loadingState = isLoading || data?.results.length === 0 ? "loading" : "idle";
  
    return (
      <div className="w-full">
      <div className="flex w-full items-center justify-between">
          <h1 className={`text-2xl`}>Products</h1>
      </div>
 
      <Table
        aria-label="Example table with client async pagination"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn key="id">ID</TableColumn>
          <TableColumn key="title">Title</TableColumn>
          <TableColumn key="category">Category</TableColumn>
          <TableColumn key="price">Price</TableColumn>
        </TableHeader>
        <TableBody
          items={data?.results ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item: Product) => (
            <TableRow key={item?.id}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>
    );
  }