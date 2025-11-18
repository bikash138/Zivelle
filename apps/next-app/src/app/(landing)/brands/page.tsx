import { Brands } from '@/components/Landing/Pages/Brands'

export const revalidate = 60

export default async function BrandsRoute() {
  return <Brands />
}
