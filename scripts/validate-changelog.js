const fs = require("fs");

const changelog = fs.readFileSync("CHANGELOG.md", "utf-8").replace(/\r\n/g, "\n");
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));

const versionMatch = changelog.match(/^## \[([^\]]+)\]/m);
if (!versionMatch) {
  console.error("❌ CHANGELOG.md no tiene ninguna versión documentada.");
  process.exit(1);
}

const changelogVersion = versionMatch[1];
const packageVersion = packageJson.version;

if (changelogVersion !== packageVersion) {
  console.error(
    `❌ Versión en CHANGELOG.md (${changelogVersion}) no coincide con package.json (${packageVersion})`
  );
  process.exit(1);
}

console.log(`✅ Versión ${changelogVersion} validada correctamente.`);