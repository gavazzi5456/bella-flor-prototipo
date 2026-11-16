import { site } from "../data/siteData";
import type { Category } from "../data/siteData";
import { Arrow } from "./Arrow";
export function CategoryCard({
  category,
  selected,
  onSelect,
}: {
  category: Category;
  selected: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <article className={`category-card ${selected ? "selected" : ""}`}>
      <div className={`category-image image-${category.image}`}>
        <img
          src={`${import.meta.env.BASE_URL}images/${category.image}-640.webp`}
          width="640"
          height="800"
          loading="lazy"
          alt={category.alt}
        />
        <span className="image-label">{site.imageNotice}</span>
      </div>
      <div className="category-heading">
        <h3>{category.title}</h3>
        <a
          href="#consulta"
          className="category-action"
          aria-label={`${site.categories.action}: ${category.title}`}
          onClick={() => onSelect(category.title)}
        >
          <Arrow diagonal />
        </a>
      </div>
      <p>{category.description}</p>
      <small>{site.categories.label}</small>
      {selected && (
        <span className="selected-label">{site.categories.selected}</span>
      )}
    </article>
  );
}
