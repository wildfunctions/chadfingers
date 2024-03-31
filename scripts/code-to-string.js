const fs = require('node:fs');

function escapeNewlinesAndTabs(str) {
    // Replace newlines with \\n and tabs with \\t
    return str.replace(/\n/g, '\\n').replace(/\t/g, '\\t');
}

try {
  const data = fs.readFileSync('./code/reverse-string.ts', 'utf8');
  console.log(escapeNewlinesAndTabs(data).replaceAll('    ', '\\t'));
} catch (err) {
  console.error(err);
}
