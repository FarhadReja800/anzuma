

import ShopDetails from '@/components/ShopDetails'


interface ShopPageProps {
  searchParams: Promise<{ id?: string; col?: string }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = await searchParams
  const productId = Number(resolvedParams.id || 102)
  const col = resolvedParams.col || ""

  return (
    <div>
      <ShopDetails productId={productId} col={col} />
    </div>
  )
}
