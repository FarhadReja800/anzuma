import ProductMainDetails from "./ProductMainDetails"
import ProductInfoTabs from "./ProductInfoTabs"
import RelatedProducts from "./RelatedProducts"

interface ShopDetailsProps {
  productId?: number
}

export function ShopDetails({ productId = 102 }: ShopDetailsProps) {
  return (
    <div className="bg-white text-zinc-950 dark:bg-black dark:text-zinc-50 min-h-screen">
      
      {/* 1. Main product details section */}
      <ProductMainDetails key={productId} productId={productId} />
      
      {/* 2. Description, Additional Info, Reviews tabs section */}
      <ProductInfoTabs productId={productId} />
      
      {/* 3. Related Products section */}
      <RelatedProducts productId={productId} />
      
    </div>
  )
}

export default ShopDetails
