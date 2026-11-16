import { site } from "../data/siteData";
export function HowItWorks() {
  return (
    <section className="how-section" aria-labelledby="how-title">
      <div className="shell">
        <div className="how-heading">
          <h2 id="how-title">{site.how.title}</h2>
          <p>{site.how.description}</p>
        </div>
        <ol className="steps">
          {site.how.steps.map((step, i) => (
            <li key={step.title}>
              <span className="step-number">0{i + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
