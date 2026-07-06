import { AllProductCategories } from "@/components/allProductCategories"

interface Props {
  searchParams: Promise<{ category?: string; sub?: string; search?: string }>
}

export default async function AllProductCategoriesPage({ searchParams }: Props) {
  const { category, sub, search } = await searchParams
  return (
    <div>
      <AllProductCategories initialCategory={category} initialSubcategory={sub} initialSearch={search} />
    </div>
  )
}
