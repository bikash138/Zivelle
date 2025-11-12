import { useSearchParams, useRouter } from "next/navigation"

export function useQueryParams() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const setParams = (newParams: Record<string, string | null | undefined>) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))

    Object.entries(newParams).forEach(([key, value]) => {
      if (!value || value === "") params.delete(key)
      else params.set(key, value)
    })

    router.push(`/catalog?${params.toString()}`, { scroll: false })
  }

  return {
    params: searchParams,
    setParams,
  }
}
