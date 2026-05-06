const fs = require("fs");
const path = require("path");

const changelogPath = path.join(__dirname, "../CHANGELOG.md");
const content = fs.readFileSync(changelogPath, "utf-8").replace(/\r\n/g, "\n");

// Versión
const versionMatch = content.match(/^## \[([^\]]+)\] - (\d{4}-\d{2}-\d{2})/m);
if (!versionMatch) {
  console.error("❌ No se encontró una versión válida en CHANGELOG.md");
  process.exit(1);
}

const version = versionMatch[1];
const date = versionMatch[2];

// Notas — buscar todo el texto después del primer ## [...] hasta el siguiente ## [ o fin
const sections = content.split(/\n(?=## \[)/);
const firstBlock = sections[1] || sections[0]; // el bloque de la versión más reciente
const notesMatch = firstBlock.match(/^## \[[^\]]+\][^\n]*\n([\s\S]+)/);
const notes = notesMatch ? notesMatch[1].trim() : "Sin descripción";

const outputFile = process.env.GITHUB_OUTPUT;
if (outputFile) {
  fs.appendFileSync(outputFile, `VERSION=${version}\n`);
  fs.appendFileSync(outputFile, `RELEASE_DATE=${date}\n`);
  const escapedNotes = notes.replace(/\n/g, "%0A").replace(/\r/g, "%0D");
  fs.appendFileSync(outputFile, `RELEASE_NOTES=${escapedNotes}\n`);
} else {
  console.log(`VERSION: ${version}`);
  console.log(`DATE: ${date}`);
  console.log(`NOTES:\n${notes}`);
}