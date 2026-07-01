import { AllProductCategories } from "@/components/allProductCategories"

export default async function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const resolvedParams = await params;
  return (
    <div>
      <AllProductCategories initialCategory={resolvedParams.categoryId} />
    </div>
  )
}
