'use client'
import { PaginationComponent } from "@/components/core/Pagination";
import Catalog from "@/components/Dashboard/Landing/Catalog";
import { ResponsiveSkeletonLoader } from "@/components/Loaders/CatalogLoader";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import useSWR from "swr";
const fetcher = (url: string) => axios.get(url).then(res=>res.data)

export default function CatalogRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}

function PageContent() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || '1')
  const { data, error, isLoading } = useSWR(
    `/api/items?page=${page}`,
    fetcher,
    { keepPreviousData: true }
  ); 

  if (isLoading) return <ResponsiveSkeletonLoader/>;
  if (error) return <div>Failed to load</div>;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Catalog items={data.paginatedItems} />
        <PaginationComponent currentPage={data.currentPage} totalPages={data.totalPages}/>
    </Suspense>
    </>
  );
}
