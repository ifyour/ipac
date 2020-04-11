const path = require('path');
const { writeFileSync, readFileSync } = require('fs');
const YAML = require('yamljs');
const { format, utcToZonedTime } = require('date-fns-tz');

/**
 * index.js
 * template.js + white_domains.yml  = dist.js (pac file)
 */
const DOMAINS_YML = './white_domains.yml';
const TEMPLATE = './template.js';
const DIST_FILE = './dist.js';

const TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
const ZONE_DATE = utcToZonedTime(new Date(), 'Asia/Shanghai');
const SAVE_CONTENT_ENCODE = 'utf-8';
const NOW_TIME = format(ZONE_DATE, TIME_FORMAT);
const resolveFile = file => path.join(__dirname, file);
const saveFile = (target, content) => writeFileSync(resolveFile(target), content, SAVE_CONTENT_ENCODE);

const buffer = readFileSync(resolveFile(TEMPLATE));
const templateString = buffer.toString('utf8');

const domains = YAML.load(resolveFile(DOMAINS_YML));
const distContent = templateString
  .replace(/#TEMPLATE_TIME#/g, NOW_TIME)
  .replace(/'#TEMPLATE_CONTENT#'/g, JSON.stringify(domains, null, 2));

saveFile(DIST_FILE, distContent);
console.log(`[${NOW_TIME}] 🗻 iPac Build Success! `);
