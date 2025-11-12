import { Brands } from "@/components/Landing/Common/Brands";

export const revalidate = 60;

export default async function BrandsRoute() {
   return <Brands/>
}