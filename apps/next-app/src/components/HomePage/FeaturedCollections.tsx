import { Button } from '@/components/ui/button';

const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      title: "Summer Essentials",
      description: "Light, breathable fabrics perfect for warm weather",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      price: "From $89"
    },
    {
      id: 2,
      title: "Business Casual",
      description: "Professional wear that doesn't compromise on style",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
      price: "From $149"
    },
    {
      id: 3,
      title: "Evening Elegance",
      description: "Sophisticated pieces for special occasions",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      price: "From $299"
    }
  ];

  return (
    <section id="catalog" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Featured Collections
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selections that embody the essence of contemporary fashion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div 
              key={collection.id} 
              className="group relative overflow-hidden rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all duration-500 transform hover:scale-105"
            >
              <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{collection.title}</h3>
                <p className="text-gray-300 mb-3">{collection.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-100">{collection.price}</span>
                  <Button 
                    size="sm" 
                    className="bg-white text-black hover:bg-gray-200 transition-all duration-300"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;