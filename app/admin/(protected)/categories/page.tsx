import { CategoryManager } from "@/components/admin/category-manager";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Catégories" };
export const dynamic = "force-dynamic";

export default async function CategoriesPage(): Promise<JSX.Element> {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { projects: true } } },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="label-mono">référentiel</p>
        <h1 className="mt-1 font-mono text-2xl font-semibold tracking-tight">
          Catégories
        </h1>
      </div>

      <CategoryManager
        categories={categories.map((category) => ({
          id: category.id,
          name: category.name,
          slug: category.slug,
          projectCount: category._count.projects,
        }))}
      />
    </div>
  );
}
