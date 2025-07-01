import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Stay in Style
        </h2>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about new collections, exclusive offers, and fashion insights.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-white transition-colors duration-300"
          />
          <Button className="bg-white text-black hover:bg-gray-200 font-semibold px-8 transition-all duration-300 transform hover:scale-105">
            Subscribe
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          No spam, unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;