

import ShopDetails from '@/components/ShopDetails'


interface ShopPageProps {
  searchParams: Promise<{ id?: string }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = await searchParams
  const productId = Number(resolvedParams.id || 102)

  return (
    <div>
      <ShopDetails productId={productId} />
    </div>
  )
}
