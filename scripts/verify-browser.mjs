import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

await mkdir("output/playwright", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({
  permissions: ["clipboard-read", "clipboard-write"],
});
const page = await context.newPage();
const errors = [],
  failedRequests = [],
  externalRequests = [],
  checks = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("response", (response) => {
  if (response.status() >= 400)
    failedRequests.push(`${response.status()} ${response.url()}`);
});
page.on("request", (request) => {
  if (
    !request.url().startsWith("http://127.0.0.1:5173") &&
    !request.url().startsWith("data:")
  )
    externalRequests.push(request.url());
});
const check = (name, condition) => {
  assert.ok(condition, name);
  checks.push(name);
};
try {
  for (const width of [1440, 375]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("http://127.0.0.1:5173/");
    await page.evaluate(() => document.fonts.ready);
    await page.getByRole("heading", { level: 1 }).waitFor();
    check(
      `${width}: no horizontal overflow`,
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    check(
      `${width}: visible prototype notice`,
      await page
        .getByText("Protótipo demonstrativo não oficial", { exact: true })
        .first()
        .isVisible(),
    );
    check(
      `${width}: single main heading`,
      (await page.getByRole("heading", { level: 1 }).count()) === 1,
    );
    if (width === 375) {
      const toggle = page.locator(".menu-toggle");
      await toggle.click();
      check(
        "mobile: menu expanded",
        (await toggle.getAttribute("aria-expanded")) === "true",
      );
      await page
        .getByRole("navigation")
        .getByRole("link", { name: "Possibilidades" })
        .click();
      check(
        "mobile: anchor navigation closes menu",
        (await toggle.getAttribute("aria-expanded")) === "false" &&
          page.url().endsWith("#categorias"),
      );
      await toggle.click();
      await page.getByRole("navigation").getByRole("link").first().focus();
      await page.keyboard.press("Escape");
      check(
        "mobile: Escape closes menu and restores focus",
        (await toggle.getAttribute("aria-expanded")) === "false" &&
          (await toggle.evaluate((el) => el === document.activeElement)),
      );
    } else {
      await page
        .getByRole("navigation")
        .getByRole("link", { name: "Possibilidades" })
        .click();
      check("desktop: category anchor", page.url().endsWith("#categorias"));
    }
    for (const card of await page.locator(".category-card").all()) {
      const title = await card.getByRole("heading").innerText();
      await card.getByRole("link").click();
      check(
        `${width}: category ${title} reaches form`,
        (await page.getByLabel("Categoria de interesse").inputValue()) ===
          title && page.url().endsWith("#consulta"),
      );
    }
    await page
      .getByLabel("Ocasião", { exact: true })
      .selectOption("Aniversário");
    await page
      .getByLabel("Preferência de cores", { exact: true })
      .selectOption("Tons rosados");
    await page.getByLabel("Estilo", { exact: true }).selectOption("Natural");
    await page
      .getByLabel("Investimento pretendido", { exact: true })
      .selectOption("Até R$ 150");
    await page
      .getByLabel("Data de interesse", { exact: true })
      .fill("2026-12-20");
    const message = await page.getByLabel("Prévia da mensagem").inputValue();
    check(
      `${width}: preview includes chosen preferences`,
      [
        "Aniversário",
        "Tons rosados",
        "Natural",
        "Até R$ 150",
        "20/12/2026",
      ].every((value) => message.includes(value)),
    );
    await page
      .getByRole("button", { name: "Copiar mensagem", exact: true })
      .click();
    await page
      .getByRole("status")
      .filter({ hasText: "Mensagem copiada" })
      .waitFor();
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    assert.equal(
      clipboard.replace(/\r\n/g, "\n"),
      message,
      "Clipboard content (Windows line endings normalized)",
    );
    check(`${width}: actual clipboard matches preview`, true);
    await page.screenshot({
      path: `output/playwright/consultation-${width}.png`,
    });
    await page
      .getByLabel("Preferência de cores", { exact: true })
      .selectOption("Cores vibrantes");
    check(
      `${width}: editing clears stale copy feedback`,
      (await page.getByRole("status").innerText()) === "",
    );
    await page.getByRole("button", { name: "Limpar preferências" }).click();
    check(
      `${width}: reset clears every field`,
      await page
        .locator(".preferences select, .preferences input")
        .evaluateAll((inputs) => inputs.every((input) => input.value === "")),
    );
    for (const detail of await page.locator("details").all()) {
      await detail.locator("summary").focus();
      await page.keyboard.press("Enter");
      check(
        `${width}: FAQ keyboard opens`,
        (await detail.getAttribute("open")) !== null,
      );
      await page.keyboard.press("Enter");
    }
    check(
      `${width}: internal anchors resolve`,
      await page
        .locator('a[href^="#"]')
        .evaluateAll((links) =>
          links.every((link) =>
            document.querySelector(link.getAttribute("href")),
          ),
        ),
    );
    check(
      `${width}: no WhatsApp/send links`,
      (await page
        .locator('a[href*="wa.me"], a[href^="tel:"], a[href^="mailto:"]')
        .count()) === 0,
    );
    check(
      `${width}: Google Maps link is explicit`,
      (
        await page.locator('a[href*="google.com/maps"]').getAttribute("href")
      ).includes("Rua+Pelotas+233"),
    );
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.evaluate(async () => {
      await Promise.all(Array.from(document.images).map((img) => img.decode()));
    });
    check(
      `${width}: all 8 images load with dimensions`,
      await page
        .locator("img")
        .evaluateAll(
          (images) =>
            images.length === 8 &&
            images.every(
              (img) =>
                img.complete &&
                img.naturalWidth > 0 &&
                img.hasAttribute("width") &&
                img.hasAttribute("height"),
            ),
        ),
    );
    check(
      `${width}: no persistent data`,
      await page.evaluate(
        () =>
          localStorage.length === 0 &&
          sessionStorage.length === 0 &&
          document.cookie === "",
      ),
    );
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    await writeFile(
      `output/playwright/axe-${width}.json`,
      JSON.stringify(accessibility.violations, null, 2),
    );
    check(
      `${width}: axe WCAG A/AA zero violations`,
      accessibility.violations.length === 0,
    );
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({
      path: `output/playwright/full-${width}.png`,
      fullPage: true,
    });
    await page.screenshot({ path: `output/playwright/hero-${width}.png` });
  }
  await page.evaluate(() =>
    Object.defineProperty(navigator.clipboard, "writeText", {
      configurable: true,
      value: async () => {
        throw new Error("clipboard blocked");
      },
    }),
  );
  await page
    .getByRole("button", { name: "Copiar mensagem", exact: true })
    .click();
  check(
    "clipboard denied: manual copy instruction",
    (await page.getByRole("status").innerText()) ===
      "A cópia automática foi bloqueada. Selecione e copie o texto no campo acima.",
  );
  check(
    "clipboard denied: preview focused and selected",
    await page
      .getByLabel("Prévia da mensagem")
      .evaluate(
        (el) =>
          el === document.activeElement && el.selectionEnd === el.value.length,
      ),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  check(
    "reduced motion: transitions disabled",
    await page
      .getByRole("button", { name: "Copiar mensagem", exact: true })
      .evaluate((el) => getComputedStyle(el).transitionDuration === "0s"),
  );
  await page.reload();
  check(
    "reload clears preferences",
    (await page.getByLabel("Categoria de interesse").inputValue()) === "",
  );
  await page.keyboard.press("Tab");
  check(
    "keyboard: skip link is first",
    await page
      .getByRole("link", { name: "Pular para o conteúdo" })
      .evaluate((el) => el === document.activeElement),
  );
  check("no JavaScript or console errors", errors.length === 0);
  check("no broken resources", failedRequests.length === 0);
  check("no external requests during flow", externalRequests.length === 0);
  await writeFile(
    "output/playwright/results.json",
    JSON.stringify(
      { checks, errors, failedRequests, externalRequests },
      null,
      2,
    ),
  );
  console.log(
    `${checks.length} checks passed. Screenshots and axe reports: output/playwright/`,
  );
} catch (error) {
  console.error(error);
  await page.screenshot({
    path: "output/playwright/failure.png",
    fullPage: true,
  });
  await writeFile(
    "output/playwright/results.json",
    JSON.stringify(
      {
        checks,
        errors,
        failedRequests,
        externalRequests,
        failure: String(error),
      },
      null,
      2,
    ),
  );
  process.exitCode = 1;
} finally {
  await browser.close();
}
