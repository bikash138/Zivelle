import { cn } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { useSearchParams } from "next/navigation"


interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function PaginationComponent({ totalPages, currentPage }: PaginationProps) {
  const searchParams = useSearchParams()

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.set("page", page.toString())
    return `/catalog?${params.toString()}`
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <Pagination className='mb-2'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={!isFirstPage ? createPageLink(currentPage - 1) : undefined}
            className={cn(
              'border-orange-200 text-gray-700',
              'hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300',
              'transition-colors',
              isFirstPage && 'pointer-events-none opacity-50 cursor-not-allowed'
            )}
            onClick={(e) => {
              if (isFirstPage) e.preventDefault();
            }}
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href={createPageLink(pageNum)}
                isActive={isActive}
                className={cn(
                  isActive
                    ? 'bg-orange-500 text-white border-orange-500 hover:bg-orange-600 hover:text-white cursor-default'
                    : 'border-orange-200 text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300',
                  'transition-colors'
                )}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={!isLastPage ? createPageLink(currentPage + 1) : undefined}
            className={cn(
              'border-orange-200 text-gray-700',
              'hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300',
              'transition-colors',
              isLastPage && 'pointer-events-none opacity-50 cursor-not-allowed'
            )}
            onClick={(e) => {
              if (isLastPage) e.preventDefault();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
