import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

// Product Card Skeleton Component
const ProductCardSkeleton = () => (
  <Card className="overflow-hidden">
    <CardContent className="p-0">
      {/* Product Image */}
      <Skeleton className="w-full h-64 rounded-none" />

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        <Skeleton className="h-4 w-16 bg-orange-100" />

        {/* Product Title */}
        <Skeleton className="h-5 w-3/4" />

        {/* Price Section */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Add to Cart Button */}
        <Skeleton className="h-10 w-10 rounded-md ml-auto" />
      </div>
    </CardContent>
  </Card>
)

// Desktop Sidebar Skeleton
const SidebarSkeleton = () => (
  <div className="w-80 p-6 space-y-8">
    {/* Filters Header */}
    <div className="flex items-center gap-2">
      <Skeleton className="h-5 w-5" />
      <Skeleton className="h-6 w-16" />
    </div>

    {/* Search */}
    <div className="space-y-2">
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>

    {/* Categories */}
    <div className="space-y-4">
      <Skeleton className="h-6 w-24" />
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-6 ml-auto" />
          </div>
        ))}
      </div>
    </div>

    {/* Price Range */}
    <div className="space-y-4">
      <Skeleton className="h-6 w-24" />
      <div className="space-y-4">
        <Skeleton className="h-2 w-full rounded-full" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>

    {/* Size */}
    <div className="space-y-4">
      <Skeleton className="h-6 w-12" />
      <div className="flex gap-2">
        {['XS', 'S', 'M', 'L'].map((_, i) => (
          <Skeleton key={i} className="h-10 w-12 rounded-md" />
        ))}
      </div>
    </div>
  </div>
)

// Desktop Skeleton Loader
const DesktopSkeletonLoader = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block border-r bg-white">
          <SidebarSkeleton />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Products Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </main>
      </div>
    </div>
  </div>
)

// Mobile Skeleton Loader
const MobileSkeletonLoader = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4">
      <main className="py-6">
        {/* Products Grid - Mobile */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  </div>
)

// Combined Responsive Skeleton Loader
export const ResponsiveSkeletonLoader = () => (
  <>
    {/* Desktop Version */}
    <div className="hidden lg:block">
      <DesktopSkeletonLoader />
    </div>

    {/* Mobile Version */}
    <div className="lg:hidden">
      <MobileSkeletonLoader />
    </div>
  </>
)
