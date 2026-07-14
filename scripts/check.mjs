import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve("site");
const requiredFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "CNAME",
  "robots.txt",
  "sitemap.xml",
  "favicon.ico",
  "assets/omar-fendri-linkedin.jpg",
  "assets/omar-fendri-cv-2026.pdf",
  "assets/logos/eurocontrol.jpg",
  "assets/logos/racemus-consulting.jpg",
  "assets/logos/societe-generale-cib.jpg",
  "assets/logos/bnp-paribas-securities-services.jpg",
  "assets/logos/advanced-derivative-solutions.jpg",
  "assets/logos/icpc.png",
  "assets/logos/university-tunis-el-manar.png",
];

await Promise.all(requiredFiles.map((file) => access(resolve(root, file))));

const html = await readFile(resolve(root, "index.html"), "utf8");
const css = await readFile(resolve(root, "styles.css"), "utf8");

const checks = [
  [html.includes('<html lang="en"'), "Document language is set"],
  [html.includes("<main"), "Main landmark exists"],
  [html.includes("<h1"), "Primary heading exists"],
  [html.includes('href="#main-content"'), "Skip link exists"],
  [html.includes('name="description"'), "Meta description exists"],
  [html.includes('application/ld+json'), "Structured data exists"],
  [!html.includes('target="_blank"') || html.includes('rel="noreferrer"'), "External links are protected"],
  [css.includes("prefers-reduced-motion"), "Reduced-motion styles exist"],
  [css.includes(":focus-visible"), "Keyboard focus styles exist"],
];

const failures = checks.filter(([passed]) => !passed);

for (const [passed, label] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"}  ${label}`);
}

if (failures.length > 0) {
  process.exitCode = 1;
} else {
  console.log(`\n${checks.length} checks passed.`);
}
