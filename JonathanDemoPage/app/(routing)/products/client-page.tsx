'use client'

import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue} from "@nextui-org/react";
import useSWR from "swr";
import productservice from '@/services/productservice';

const fetcher = (url: any) =>  axios.get(url).then(res => res.data)

export default function ProductsClientPage() {
    return(
        <>
            product page
        </>
    )
}