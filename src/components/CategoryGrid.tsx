import { categories, site } from "../data/siteData";
import { CategoryCard } from "./CategoryCard";
export function CategoryGrid({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <section
      id="categorias"
      className="section shell"
      aria-labelledby="categories-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{site.categories.kicker}</p>
          <h2 id="categories-title">{site.categories.title}</h2>
        </div>
        <p>{site.categories.description}</p>
      </div>
      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            selected={selected === category.title}
            onSelect={onSelect}
          />
        ))}
      </div>
      <p className="section-caption">{site.imageDetail}</p>
    </section>
  );
}
