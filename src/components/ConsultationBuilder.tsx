import { useRef, useState } from "react";
import { categories, site } from "../data/siteData";
import { buildMessage, emptyPreferences } from "../lib/message";
import type { Preferences } from "../lib/message";
import { Arrow } from "./Arrow";
export function ConsultationBuilder({
  value,
  onChange,
}: {
  value: Preferences;
  onChange: (next: Preferences) => void;
}) {
  const [feedback, setFeedback] = useState({ message: "", text: "" });
  const [copying, setCopying] = useState(false);
  const preview = useRef<HTMLTextAreaElement>(null);
  const message = buildMessage(value);
  function update(field: keyof Preferences, next: string) {
    onChange({ ...value, [field]: next });
    setFeedback({ message: "", text: "" });
  }
  async function copy() {
    setCopying(true);
    try {
      await navigator.clipboard.writeText(message);
      setFeedback({ message, text: site.builder.copied });
    } catch {
      preview.current?.focus();
      preview.current?.select();
      setFeedback({ message, text: site.builder.failed });
    } finally {
      setCopying(false);
    }
  }
  const select = (
    field: keyof Preferences,
    options: string[],
    help?: string,
  ) => (
    <div className="field">
      <label htmlFor={field}>{site.fields[field]}</label>
      <select
        id={field}
        name={field}
        autoComplete="off"
        value={value[field]}
        onChange={(event) => update(field, event.target.value)}
        aria-describedby={help ? `${field}-help` : undefined}
      >
        <option value="">{site.fields.empty}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      {help && <small id={`${field}-help`}>{help}</small>}
    </div>
  );
  return (
    <section
      id="consulta"
      className="section consultation shell"
      aria-labelledby="consultation-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{site.builder.kicker}</p>
          <h2 id="consultation-title">{site.builder.title}</h2>
        </div>
        <p>{site.builder.description}</p>
      </div>
      <div className="consultation-layout">
        <form
          className="preferences"
          onSubmit={(event) => event.preventDefault()}
          autoComplete="off"
        >
          <div className="form-grid">
            {select(
              "category",
              categories.map((category) => category.title),
            )}
            {select("occasion", site.options.occasions)}
            {select("colors", site.options.colors)}
            {select("style", site.options.styles)}
            {select("budget", site.options.budgets, site.builder.budgetHelp)}
            <div className="field">
              <label htmlFor="date">{site.fields.date}</label>
              <input
                id="date"
                name="date"
                type="date"
                value={value.date}
                onChange={(event) => update("date", event.target.value)}
                aria-describedby="date-help"
              />
              <small id="date-help">{site.builder.dateHelp}</small>
            </div>
          </div>
          <p className="privacy-note">{site.builder.privacy}</p>
          <button
            type="button"
            className="text-link reset-button"
            onClick={() => {
              onChange({ ...emptyPreferences });
              setFeedback({
                message: buildMessage(emptyPreferences),
                text: site.builder.resetDone,
              });
            }}
          >
            {site.builder.reset}
          </button>
        </form>
        <div className="message-card">
          <span className="mode-label">
            <span className="demo-dot" aria-hidden="true" />
            {site.builder.mode}
          </span>
          <h3>{site.builder.previewTitle}</h3>
          <label className="sr-only" htmlFor="message">
            {site.builder.previewLabel}
          </label>
          <textarea
            ref={preview}
            id="message"
            readOnly
            value={message}
            spellCheck={false}
          />
          <p className="preview-note">{site.builder.previewNote}</p>
          <button
            type="button"
            className="button copy-button"
            disabled={copying}
            onClick={copy}
          >
            {copying ? site.builder.copying : site.builder.copy}
            <Arrow />
          </button>
          <p role="status" className="copy-feedback">
            {feedback.message === message ? feedback.text : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
