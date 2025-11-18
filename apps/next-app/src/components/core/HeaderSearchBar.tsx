import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'

export const HeaderSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const search = searchParams.get('search') || ''
    setSearchQuery(search)
  }, [searchParams])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const trimmed = searchQuery.trim()
      router.push(trimmed ? `/catalog?search=${trimmed}&page=1` : '/catalog')
    },
    [router, searchQuery]
  )

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  return (
    <div className="space-y-4 w-full max-w-xs lg:max-w-sm">
      <div className="relative">
        <Search size={20} className="absolute left-3 top-2 text-gray-500 dark:text-gray-400" />
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2"
          />
        </form>
      </div>
    </div>
  )
}
