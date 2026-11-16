import { useRef, useState } from "react";
import { site } from "../data/siteData";
import { DemoNotice } from "./DemoNotice";
import { Arrow } from "./Arrow";
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header className="site-header">
      <DemoNotice />
      <div className="header-inner shell">
        <a className="wordmark" href="#inicio">
          <span>{site.name}</span>
          <small>{site.concept}</small>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navigation"
          aria-label={open ? site.menuClose : site.menuOpen}
          onClick={() => setOpen(!open)}
        >
          <span>{open ? site.close : site.menu}</span>
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <nav
          id="navigation"
          className={open ? "navigation is-open" : "navigation"}
          aria-label="Navegação principal"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              toggle.current?.focus();
            }
          }}
        >
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            className="button button-small"
            href="#consulta"
            onClick={() => setOpen(false)}
          >
            {site.hero.secondary}
            <Arrow />
          </a>
        </nav>
      </div>
    </header>
  );
}
