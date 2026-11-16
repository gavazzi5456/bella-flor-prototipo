import { site } from "../data/siteData";
import { Arrow } from "./Arrow";
export function Hero() {
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">{site.hero.kicker}</p>
        <h1 id="hero-title">{site.hero.title}</h1>
        <p className="hero-description">{site.hero.description}</p>
        <a className="button" href="#categorias">
          {site.hero.primary}
          <Arrow />
        </a>
        <a className="text-link hero-secondary" href="#consulta">
          {site.hero.secondary}
          <Arrow diagonal />
        </a>
        <div className="hero-footnote">
          <span className="little-line" aria-hidden="true" />
          <p>{site.hero.caption}</p>
        </div>
      </div>
      <figure className="hero-visual">
        <div className="hero-image">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-1200.webp`}
            srcSet={`${import.meta.env.BASE_URL}images/hero-640.webp 640w, ${import.meta.env.BASE_URL}images/hero-1200.webp 1200w`}
            sizes="(min-width: 900px) 50vw, 100vw"
            width="1200"
            height="1800"
            fetchPriority="high"
            alt="Rosas rosadas e folhagens sobre uma superfície clara, em fotografia ilustrativa"
          />
          <span className="image-label">{site.imageNotice}</span>
        </div>
        <figcaption>
          <span>{site.descriptor}</span>
          <span>{site.city}</span>
        </figcaption>
      </figure>
    </section>
  );
}
