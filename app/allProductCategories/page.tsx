import { AllProductCategories } from "@/components/allProductCategories"

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function AllProductCategoriesPage({ searchParams }: Props) {
  const { category } = await searchParams
  return (
    <div>
      <AllProductCategories initialCategory={category} />
    </div>
  )
}
