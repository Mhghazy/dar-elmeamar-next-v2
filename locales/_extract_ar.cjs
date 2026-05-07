const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname);

// Read source files
const trans = fs.readFileSync(path.join(dir, 'translations.ts'), 'utf8');
const pageCopy = fs.readFileSync(path.join(dir, 'pageCopy.ts'), 'utf8');

// Extract Arabic from pageCopy (lines between `export const extraTranslationsAr = {` and its closing `};`)
const arExStart = pageCopy.indexOf('export const extraTranslationsAr = {');
const arExContent = pageCopy.substring(
  pageCopy.indexOf('{', arExStart) + 1,
  pageCopy.lastIndexOf('};')
);

// Extract Arabic block from translations.ts (between `  ar: {` and the matching close)
const arBlockStart = trans.indexOf('  ar: {\r\n');
const arBlockContentStart = trans.indexOf('\n', arBlockStart) + 1;
// Find `    ...extraTranslationsAr,` and replace with actual content
const spreadLine = '    ...extraTranslationsAr,';
const arBlockEnd = trans.indexOf('\r\n  },\r\n};', trans.indexOf(spreadLine));
let arInner = trans.substring(arBlockContentStart, arBlockEnd);
arInner = arInner.replace(spreadLine, arExContent);

// Write ar.ts
const arFile = `/** Arabic translations \u2014 auto-extracted. Imported by translations.ts */\n\nexport const ar = {\n${arInner}\n};\n`;
fs.writeFileSync(path.join(dir, 'ar.ts'), arFile, 'utf8');
console.log('Created ar.ts (' + arFile.split('\n').length + ' lines)');

// Update translations.ts: keep EN, replace AR block with import
const beforeAr = trans.substring(0, arBlockStart);
const afterAll = trans.substring(trans.indexOf(';\r\n\r\nexport type'));
const newTrans = "import { extraTranslationsEn } from './pageCopy';\nimport { ar } from './ar';\n\nexport const translations = {\n  en: {\n" +
  beforeAr.split('  en: {\r\n')[1] +
  "  ar: ar as unknown as typeof translations.en,\n}" + afterAll;
fs.writeFileSync(path.join(dir, 'translations.ts'), newTrans, 'utf8');
console.log('Updated translations.ts');

// Update pageCopy.ts: remove Arabic export
const newPageCopy = pageCopy.substring(0, arExStart).trimEnd() + '\n';
fs.writeFileSync(path.join(dir, 'pageCopy.ts'), newPageCopy, 'utf8');
console.log('Updated pageCopy.ts');
console.log('Done!');
