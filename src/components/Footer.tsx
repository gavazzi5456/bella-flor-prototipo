import { site } from "../data/siteData";
import { Arrow } from "./Arrow";
export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <a className="wordmark" href="#inicio">
            <span>{site.name}</span>
            <small>{site.concept}</small>
          </a>
          <p>{site.footer}</p>
          <a href="#inicio" className="text-link">
            {site.back}
            <Arrow diagonal />
          </a>
        </div>
        <div className="footer-bottom">
          <span>{site.notice}</span>
          <p>{site.imageDetail}</p>
          <a
            href="/image-credits.json"
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.credits}
          </a>
        </div>
      </div>
    </footer>
  );
}
