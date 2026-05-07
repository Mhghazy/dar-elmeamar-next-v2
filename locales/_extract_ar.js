/**
 * Script to extract Arabic translations into a separate file.
 * Run once, then delete this script.
 */
const fs = require('fs');
const path = require('path');

// --- Step 1: Read translations.ts and extract the `ar` block (lines 455-918) ---
const transFile = path.join(__dirname, 'translations.ts');
const transContent = fs.readFileSync(transFile, 'utf8');
const lines = transContent.split(/\r?\n/);

// Arabic block is from line 455 (`  ar: {`) to line 918 (`  },`)
// We need the inner content (lines 456-917), indented by 4 spaces inside the object
const arLines = lines.slice(455, 917); // 0-indexed: lines 456-917 (content inside `ar: { ... }`)

// --- Step 2: Read pageCopy.ts and extract extraTranslationsAr ---
const pageCopyFile = path.join(__dirname, 'pageCopy.ts');
const pageCopyContent = fs.readFileSync(pageCopyFile, 'utf8');

// Find the extraTranslationsAr object content
const arExtraStart = pageCopyContent.indexOf('export const extraTranslationsAr = {');
const arExtraEnd = pageCopyContent.indexOf('};', arExtraStart);
// Get just the inner content (between { and })
const arExtraBlock = pageCopyContent.substring(
  pageCopyContent.indexOf('{', arExtraStart) + 1,
  arExtraEnd
);

// --- Step 3: Build ar.ts ---
// Remove the `...extraTranslationsAr,` spread from arLines and replace with actual content
let arContent = arLines.join('\n');
arContent = arContent.replace('    ...extraTranslationsAr,', arExtraBlock);

const arFile = `/** Arabic translations — imported by translations.ts */

export const ar = {
${arContent}
};
`;

fs.writeFileSync(path.join(__dirname, 'ar.ts'), arFile, 'utf8');
console.log('✅ Created ar.ts');

// --- Step 4: Update translations.ts — replace ar block with import ---
const newTransLines = [];
newTransLines.push("import { extraTranslationsEn } from './pageCopy';");
newTransLines.push("import { ar } from './ar';");
newTransLines.push('');

// Copy English block (lines 3-454, 0-indexed 2-453)
for (let i = 2; i <= 453; i++) {
  newTransLines.push(lines[i]);
}

// Add ar reference
newTransLines.push('  ar: ar as unknown as typeof translations.en,');
newTransLines.push('};');
newTransLines.push('');

// Copy type exports (lines 921-923, 0-indexed 920-922)
for (let i = 920; i < lines.length; i++) {
  if (lines[i] !== undefined) newTransLines.push(lines[i]);
}

fs.writeFileSync(transFile, newTransLines.join('\r\n'), 'utf8');
console.log('✅ Updated translations.ts');

// --- Step 5: Update pageCopy.ts — remove extraTranslationsAr export ---
const newPageCopy = pageCopyContent.substring(0, arExtraStart).trimEnd() + '\n';
fs.writeFileSync(pageCopyFile, newPageCopy, 'utf8');
console.log('✅ Updated pageCopy.ts (removed Arabic export)');

console.log('\nDone! You can delete this script now.');
