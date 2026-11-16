import { site } from "../data/siteData";
import { Arrow } from "./Arrow";
export function Location() {
  return (
    <section
      id="localizacao"
      className="section shell location-layout"
      aria-labelledby="location-title"
    >
      <div>
        <p className="eyebrow">{site.location.kicker}</p>
        <h2 id="location-title">{site.location.title}</h2>
        <address>
          <strong>{site.address}</strong>
          <br />
          {site.area}
          <br />
          {site.postal}
        </address>
        <div className="contact-details">
          <div>
            <h3>{site.location.contact}</h3>
            <p>{site.phone}</p>
            <small>{site.location.contactNote}</small>
          </div>
          <div>
            <h3>{site.location.hours}</h3>
            <p>{site.location.weekdays}</p>
            <small>{site.location.weekends}</small>
          </div>
        </div>
        <p className="source-note">{site.location.publicInfo}</p>
        <a
          className="text-link"
          href={site.maps}
          target="_blank"
          rel="noopener noreferrer"
        >
          {site.location.map}
          <Arrow diagonal />
        </a>
      </div>
      <figure className="map-figure">
        <div
          className="map-art"
          role="img"
          aria-label={`${site.location.mapTitle}: ${site.address}, ${site.area}. ${site.location.mapCaption}`}
        >
          <div className="map-block block-one" />
          <div className="map-block block-two" />
          <div className="map-block block-three" />
          <div className="map-block block-four" />
          <span className="map-street">{site.location.street}</span>
          <span className="map-district">{site.location.district}</span>
          <div className="map-marker">
            <svg
              width="34"
              height="40"
              viewBox="0 0 34 40"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M17 39S1 23 1 17a16 16 0 1 1 32 0c0 6-16 22-16 22Z"
                fill="currentColor"
              />
              <circle cx="17" cy="16" r="5" fill="#F8F5EF" />
            </svg>
            <span>{site.location.mapPin}</span>
          </div>
        </div>
        <figcaption>{site.location.mapCaption}</figcaption>
      </figure>
    </section>
  );
}
