import { messageCopy } from "../data/siteData.ts";
export type Preferences = {
  category: string;
  occasion: string;
  colors: string;
  style: string;
  budget: string;
  date: string;
};
export const emptyPreferences: Preferences = {
  category: "",
  occasion: "",
  colors: "",
  style: "",
  budget: "",
  date: "",
};
export function buildMessage(p: Preferences): string {
  const lines = [messageCopy.title, "", messageCopy.greeting];
  const fields: [string, string][] = [
    [messageCopy.labels.category, p.category],
    [messageCopy.labels.occasion, p.occasion],
    [messageCopy.labels.colors, p.colors],
    [messageCopy.labels.style, p.style],
    [messageCopy.labels.budget, p.budget],
  ];
  for (const [label, value] of fields)
    if (value.trim()) lines.push(`${label}: ${value.trim()}`);
  if (p.date) {
    const date = new Date(`${p.date}T12:00:00`);
    if (!Number.isNaN(date.getTime()))
      lines.push(
        `${messageCopy.labels.date}: ${new Intl.DateTimeFormat("pt-BR").format(date)}`,
      );
  }
  lines.push("", messageCopy.request, "", messageCopy.disclaimer);
  return lines.join("\n");
}
