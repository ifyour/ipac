const path = require('path');
const { writeFileSync, readFileSync } = require('fs');

// Usage:

// contentExtedns({
//   source: './tmp.js',
//   target: './dist.js',
//   contentFrom: `Content to be replaced`,
//   contentTo: `New Content`
// });

module.exports = function contentExtedns({ source, target, contentFrom, contentTo }) {
  const resolve = file => path.join(__dirname, file);
  const buffer = readFileSync(resolve(source));
  const reg = new RegExp(contentFrom, 'g');
  const distString = buffer.toString('utf8').replace(reg, contentTo);
  writeFileSync(resolve(target), distString, 'utf-8');
};
