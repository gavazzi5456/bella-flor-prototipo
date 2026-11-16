import { faqs, site } from "../data/siteData";
export function Faq() {
  return (
    <section
      id="duvidas"
      className="section shell faq-layout"
      aria-labelledby="faq-title"
    >
      <div>
        <p className="eyebrow">{site.faqKicker}</p>
        <h2 id="faq-title">{site.faqTitle}</h2>
      </div>
      <div>
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>
              {faq.question}
              <span aria-hidden="true" className="faq-plus">
                +
              </span>
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
