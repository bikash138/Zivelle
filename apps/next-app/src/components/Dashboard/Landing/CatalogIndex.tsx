import { PaginationComponent } from "@/components/core/Pagination";
import Catalog from "@/components/Dashboard/Landing/Catalog";
import { ResponsiveSkeletonLoader } from "@/components/Loaders/CatalogLoader";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import useSWR from "swr";
const fetcher = (url: string) => axios.get(url).then(res=>res.data)

export default function PageContent() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || '1')
  const searchQuery = searchParams.get("search") || ''
  const { data, error, isLoading } = useSWR(
    `/api/items?search=${searchQuery}&page=${page}`,
    fetcher,
    { keepPreviousData: true }
  ); 

  if (isLoading) return <ResponsiveSkeletonLoader/>;
  if (error) return <div>Failed to load</div>;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Catalog items={data.items} />
        <PaginationComponent currentPage={data.pagination.currentPage} totalPages={data.pagination.totalPages}/>
      </Suspense>
    </>
  );
}