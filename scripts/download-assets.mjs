import { mkdir, writeFile } from "node:fs/promises";

const photos = [
  ["hero", "fwKffp5QHiA", "Annie Spratt"],
  ["arrangements", "mjtc0khBqls", "Annie Spratt"],
  ["orchids", "updPeeVTIcw", "Natalia Bennett"],
  ["plants", "IZz3sboy1g8", "Brina Blum"],
  ["dried", "Ixl9zMwdmEs", "Martin Baron"],
  ["blossom", "YGBaA4UdoLY", "Annie Spratt"],
];
await mkdir("public/images", { recursive: true });
const credits = [];
for (const [name, id, author] of photos) {
  const page = await fetch(`https://unsplash.com/photos/${id}`);
  if (!page.ok) throw new Error(`Photo page ${id}: ${page.status}`);
  const html = await page.text();
  const candidates = html.match(
    /https:\/\/images\.unsplash\.com\/photo-[^"?\s<>\\]+/g,
  );
  if (!candidates?.length) throw new Error(`No image for ${id}`);
  const base = candidates[0].replace(/&amp;/g, "&");
  const variants = name === "hero" ? [640, 1200] : [640];
  for (const width of variants) {
    const response = await fetch(
      `${base}?auto=format&fit=crop&w=${width}&q=82&fm=webp`,
    );
    if (!response.ok) throw new Error(`Download ${name}: ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(`public/images/${name}-${width}.webp`, buffer);
    console.log(`${name}-${width}.webp: ${buffer.length} bytes`);
  }
  credits.push({
    name,
    author,
    source: `https://unsplash.com/photos/${id}`,
    image: base,
    license: "https://unsplash.com/license",
    verified: "2026-11-16",
  });
}
await writeFile("public/image-credits.json", JSON.stringify(credits, null, 2));
