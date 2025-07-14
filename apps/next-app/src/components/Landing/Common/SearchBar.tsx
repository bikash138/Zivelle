'use client'
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface AnimatedSearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function AnimatedSearchBar({ 
  onSearch, 
  placeholder = "Search...", 
  className 
}: AnimatedSearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setSearchQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCollapse();
    }
  };

  return (
    <div className={cn("relative", className)}>
      <motion.div
        initial={{ width: 48 }}
        animate={{ width: isExpanded ? 320 : 48 }}
        transition={{ 
          duration: 0.3, 
          ease: [0.25, 0.25, 0, 1]
        }}
        className="relative"
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="sm"
                variant="outline"
                onClick={handleExpand}
                className="h-12 w-12 rounded-full p-0 shadow-lg hover:shadow-xl transition-shadow duration-200 border-2 hover:border-primary/50"
              >
                <Search className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="relative"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={placeholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-12 pl-10 pr-10 rounded-full border-2 shadow-lg focus:shadow-xl transition-shadow duration-200"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={handleCollapse}
                  className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full p-0 hover:bg-muted/50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Backdrop blur effect when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/5 backdrop-blur-sm z-[-1]"
            onClick={handleCollapse}
          />
        )}
      </AnimatePresence>
    </div>
  );
}