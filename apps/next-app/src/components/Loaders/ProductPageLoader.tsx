import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

// Product Image Gallery Skeleton
const ProductImageSkeleton = ({ isMobile = false }) => (
  <div className={`${isMobile ? 'w-full' : 'w-full lg:w-1/2'}`}>
    {/* Main Product Image */}
    <div className="relative">
      <Skeleton className={`w-full ${isMobile ? 'h-80' : 'h-96 lg:h-[600px]'} rounded-lg`} />
      
      {/* Wishlist Icon */}
      <div className="absolute top-4 right-4">
        <Skeleton className="h-8 w-8 rounded-full bg-white/20" />
      </div>
    </div>
    
    {/* Thumbnail Images */}
    {!isMobile && (
      <div className="flex gap-2 mt-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton 
            key={i} 
            className={`w-20 h-20 rounded-lg ${i === 0 ? 'ring-2 ring-blue-500' : ''}`} 
          />
        ))}
      </div>
    )}
    
    {/* Mobile Thumbnail */}
    {isMobile && (
      <div className="flex gap-2 mt-4 justify-center">
        <Skeleton className="w-16 h-16 rounded-lg ring-2 ring-blue-500" />
      </div>
    )}
  </div>
);

// Product Details Skeleton
const ProductDetailsSkeleton = ({ isMobile = false }) => (
  <div className={`${isMobile ? 'w-full mt-6' : 'w-full lg:w-1/2 lg:pl-8'}`}>
    {/* Brand Badge */}
    <Skeleton className="h-6 w-16 rounded-full bg-orange-100 mb-4" />
    
    {/* Product Title */}
    <Skeleton className={`h-8 ${isMobile ? 'w-full' : 'w-4/5'} mb-4`} />
    
    {/* Price Section */}
    <div className="flex items-center gap-3 mb-6">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-6 w-16 bg-gray-200" />
      <Skeleton className="h-6 w-16 rounded-full bg-red-100" />
    </div>
    
    {/* Product Description */}
    {!isMobile && (
      <div className="space-y-2 mb-8">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    )}
    
    {/* Size Selection */}
    <div className="mb-6">
      <Skeleton className="h-5 w-12 mb-3" />
      <div className="flex gap-2">
        {['S', 'M', 'L', 'XL'].map((_, i) => (
          <Skeleton 
            key={i} 
            className={`h-12 w-12 rounded-lg ${i === 1 ? 'bg-blue-100' : ''}`} 
          />
        ))}
      </div>
    </div>
    
    {/* Action Buttons */}
    <div className={`flex gap-3 mb-8 ${isMobile ? 'flex-col' : ''}`}>
      <Skeleton className={`h-12 ${isMobile ? 'w-full' : 'flex-1'} rounded-lg`} />
      <Skeleton className={`h-12 ${isMobile ? 'w-full' : 'flex-1'} rounded-lg bg-orange-100`} />
    </div>
    
    {/* Features/Benefits */}
    <div className="space-y-4">
      {[
        { icon: 'truck', text: 'Free Shipping' },
        { icon: 'refresh', text: '30-Day Returns' },
        { icon: 'shield', text: '2-Year Warranty' }
      ].map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  </div>
);

// Mobile Product Page Skeleton
export const MobileProductPageSkeleton = () => (
  <div className="min-h-screen bg-white">
    
    <div className="container mx-auto px-4 py-6">
      <ProductImageSkeleton isMobile />
      <ProductDetailsSkeleton isMobile />
      
      {/* Mobile Description */}
      <div className="mt-8 space-y-2">
        <Skeleton className="h-5 w-24 mb-3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      
      {/* Related Products Section */}
      <div className="mt-12">
        <Skeleton className="h-6 w-32 mb-6" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="w-full h-40" />
                <div className="p-3 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Desktop Product Page Skeleton
export const DesktopProductPageSkeleton = () => (
  <div className="min-h-screen bg-white">
    
    {/* Breadcrumb */}
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center gap-2 text-sm">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
    
    <div className="container mx-auto px-4 pb-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <ProductImageSkeleton />
        <ProductDetailsSkeleton />
      </div>
      
      {/* Product Tabs */}
      <div className="mt-16">
        <div className="flex border-b">
          {['Description', 'Size Guide', 'Reviews', 'Shipping'].map((_, i) => (
            <Skeleton 
              key={i} 
              className={`h-10 w-24 mr-6 ${i === 0 ? 'border-b-2 border-blue-500' : ''}`} 
            />
          ))}
        </div>
        
        <div className="py-8 space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
      
      {/* Related Products */}
      <div className="mt-16">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="w-full h-64" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-16 bg-orange-100" />
                  <Skeleton className="h-5 w-3/4" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Responsive Product Page Skeleton
export const ResponsiveProductPageSkeleton = () => (
  <>
    {/* Desktop Version */}
    <div className="hidden lg:block">
      <DesktopProductPageSkeleton />
    </div>
    
    {/* Mobile Version */}
    <div className="lg:hidden">
      <MobileProductPageSkeleton />
    </div>
  </>
);