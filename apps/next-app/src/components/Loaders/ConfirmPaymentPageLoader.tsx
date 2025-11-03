function ConfirmPaymentPageLoader() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-2">
          <div className="h-8 w-48 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="mb-8">
          <div className="h-4 w-64 bg-gray-300 rounded animate-pulse"></div>
        </div>

        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-orange-300 rounded-full animate-pulse"></div>
              <div>
                <div className="h-5 w-32 bg-gray-300 rounded mb-2 animate-pulse"></div>
                <div className="h-3 w-48 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-8 w-20 bg-orange-300 rounded animate-pulse"></div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-orange-500 rounded w-1/3 animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-orange-300 rounded-full animate-pulse"></div>
                <div className="h-6 w-36 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-28 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="h-6 w-32 bg-gray-300 rounded mb-6 animate-pulse"></div>

              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-24 h-24 bg-gray-300 rounded animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-5 w-40 bg-gray-300 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-300 rounded mb-3 animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="h-5 w-24 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-6">
              <div className="h-6 w-36 bg-gray-300 rounded mb-6 animate-pulse"></div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 mb-6">
                <div className="flex justify-between items-center">
                  <div className="h-5 w-16 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-5 w-28 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="w-full h-12 bg-gray-800 rounded-lg animate-pulse mb-4"></div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-3 w-32 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-3 w-36 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPaymentPageLoader;
