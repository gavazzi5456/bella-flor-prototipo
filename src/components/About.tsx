import { site } from "../data/siteData";
import { Arrow } from "./Arrow";
export function About() {
  return (
    <section id="sobre" className="about-section" aria-labelledby="about-title">
      <div className="shell about-layout">
        <figure>
          <img
            src={`${import.meta.env.BASE_URL}images/arrangements-640.webp`}
            width="640"
            height="800"
            loading="lazy"
            alt="Rosas rosadas em vaso, referência fotográfica para o estudo de conceito"
          />
          <figcaption>{site.imageNotice}</figcaption>
        </figure>
        <div className="about-copy">
          <p className="eyebrow">{site.about.kicker}</p>
          <h2 id="about-title">{site.about.title}</h2>
          <p>{site.about.text}</p>
          <p className="about-disclaimer">{site.about.second}</p>
          <a href="#localizacao" className="text-link">
            {site.about.link}
            <Arrow diagonal />
          </a>
        </div>
      </div>
    </section>
  );
}
